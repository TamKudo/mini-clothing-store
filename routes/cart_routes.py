from flask import Blueprint, jsonify, request
from db import get_db_connection

cart_bp = Blueprint('cart_bp', __name__)

# Hàm phụ: Lấy ID giỏ hàng của user (Nếu chưa có thì tạo mới)
def get_cart_id(user_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    # 1. Tìm xem user này đã có giỏ hàng nào chưa
    cursor.execute("SELECT cart_id FROM cart WHERE user_id = %s", (user_id,))
    result = cursor.fetchone()
    
    if result:
        cart_id = result['cart_id']
    else:
        # 2. Nếu chưa, tạo giỏ hàng mới
        cursor.execute("INSERT INTO cart (user_id, product_id) VALUES (%s, %s)", (user_id, None))
        conn.commit()
        cart_id = cursor.lastrowid
        
    cursor.close()
    conn.close()
    return cart_id

# 1. API: Lấy danh sách sản phẩm trong giỏ
@cart_bp.route('/api/cart', methods=['GET'])
def get_cart_items():
    try:
        user_id = request.args.get('user_id')
        if not user_id:
            return jsonify([])

        cart_id = get_cart_id(user_id)
        
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # JOIN bảng cart_items với products để lấy tên và ảnh
        sql = """
            SELECT ci.cart_item_id, ci.quantity, p.product_id, p.product_name,
            p.price, p.image 
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.product_id
            WHERE ci.cart_id = %s
        """
        cursor.execute(sql, (cart_id,))
        items = cursor.fetchall()
        
        # Format lại dữ liệu cho frontend
        formatted_items = []
        for item in items:
            formatted_items.append({
                "item_id": item['cart_item_id'], # ID dòng trong giỏ (để xóa/sửa)
                "id": item['product_id'],
                "name": item['product_name'],
                "price": float(item['price']),
                "image": item['image'], # Giữ nguyên đường dẫn ảnh từ DB
                "qty": item['quantity']
            })

        cursor.close()
        conn.close()
        return jsonify(formatted_items)
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

# 2. API: Thêm vào giỏ hàng
@cart_bp.route('/api/cart/add', methods=['POST'])
def add_to_cart_api():
    try:
        data = request.json
        user_id = data.get('user_id')
        product_id = data.get('product_id')
        quantity = data.get('quantity', 1)
        color = data.get('color', 'Default') 
        size = data.get('size', 'M')

        cart_id = get_cart_id(user_id)
        
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Kiểm tra xem sản phẩm này đã có trong giỏ chưa
        sql_check = "SELECT cart_item_id, quantity FROM cart_items WHERE cart_id = %s AND product_id = %s"
        cursor.execute(sql_check, (cart_id, product_id))
        existing = cursor.fetchone()

        if existing:
            # Nếu có rồi -> Cộng dồn số lượng
            new_qty = existing['quantity'] + quantity
            sql_update = "UPDATE cart_items SET quantity = %s WHERE cart_item_id = %s"
            cursor.execute(sql_update, (new_qty, existing['cart_item_id']))
        else:
            # Nếu chưa -> Thêm dòng mới
            sql_insert = """
                INSERT INTO cart_items (cart_id, product_id, quantity, color, size) 
                VALUES (%s, %s, %s, %s, %s)
            """
            cursor.execute(sql_insert, (cart_id, product_id, quantity, color, size))

        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({"success": True, "message": "Đã thêm vào giỏ!"})
    except Exception as e:
        print(e)
        return jsonify({"success": False, "message": str(e)})

# 3. API: Xóa khỏi giỏ
@cart_bp.route('/api/cart/remove', methods=['POST'])
def remove_cart_item():
    try:
        data = request.json
        cart_item_id = data.get('item_id') # Dùng cart_item_id để xóa chính xác
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM cart_items WHERE cart_item_id = %s", (cart_item_id,))
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

# 4. API: Cập nhật số lượng (+/-)
@cart_bp.route('/api/cart/update', methods=['POST'])
def update_cart_qty():
    try:
        data = request.json
        cart_item_id = data.get('item_id')
        new_qty = data.get('quantity')
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if new_qty <= 0:
            cursor.execute("DELETE FROM cart_items WHERE cart_item_id = %s", (cart_item_id,))
        else:
            cursor.execute("UPDATE cart_items SET quantity = %s WHERE cart_item_id = %s", (new_qty, cart_item_id))
            
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})