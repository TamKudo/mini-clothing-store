# routes/order_routes.py
from flask import Blueprint, jsonify, request
from db import get_db_connection

order_bp = Blueprint('order_bp', __name__)

@order_bp.route('/api/checkout', methods=['POST'])
def checkout():
    try:
        data = request.json
        user_id = data.get('user_id')
        address = data.get('address') # Địa chỉ nhận hàng

        if not user_id or not address:
            return jsonify({"success": False, "message": "Thiếu thông tin người dùng hoặc địa chỉ!"})

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # 1. Lấy ID giỏ hàng của user
        cursor.execute("SELECT cart_id FROM cart WHERE user_id = %s", (user_id,))
        cart_row = cursor.fetchone()
        if not cart_row:
             return jsonify({"success": False, "message": "Không tìm thấy giỏ hàng!"})
        cart_id = cart_row['cart_id']

        # 2. Lấy tất cả sản phẩm trong giỏ hàng (Kèm giá tiền hiện tại)
        sql_get_items = """
            SELECT ci.product_id, ci.quantity, ci.color, ci.size, p.price 
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.product_id
            WHERE ci.cart_id = %s
        """
        cursor.execute(sql_get_items, (cart_id,))
        items = cursor.fetchall()

        if not items:
            return jsonify({"success": False, "message": "Giỏ hàng đang trống!"})

        # 3. Tính tổng tiền
        total_amount = sum(item['price'] * item['quantity'] for item in items)

        # 4. Tạo Đơn hàng (Insert vào bảng ORDERS)
        sql_order = """
            INSERT INTO orders (user_id, shipping_address, total_amount, status, order_date) 
            VALUES (%s, %s, %s, 'Pending', NOW())
        """
        cursor.execute(sql_order, (user_id, address, total_amount))
        order_id = cursor.lastrowid # Lấy ID của đơn hàng vừa tạo

        # 5. Lưu chi tiết đơn hàng (Insert vào bảng ORDER_DETAILS)
        sql_detail = """
            INSERT INTO order_details (order_id, product_id, color, size, quantity, price)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        for item in items:
            cursor.execute(sql_detail, (
                order_id, 
                item['product_id'], 
                item['color'], 
                item['size'], 
                item['quantity'], 
                item['price'] # Lưu giá tại thời điểm mua
            ))

        # 6. Xóa sạch giỏ hàng (Vì đã mua xong)
        cursor.execute("DELETE FROM cart_items WHERE cart_id = %s", (cart_id,))

        conn.commit() # Lưu tất cả thay đổi
        cursor.close()
        conn.close()

        return jsonify({"success": True, "message": "Đặt hàng thành công!"})

    except Exception as e:
        print(e)
        return jsonify({"success": False, "message": str(e)})