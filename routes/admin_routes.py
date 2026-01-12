from flask import Blueprint, request, jsonify, session, render_template, redirect
from db import get_db_connection

admin_bp = Blueprint("admin", __name__, url_prefix="/admin")

# --- LOGIN TEST ---
@admin_bp.route("/login-test")
def login_test():
    session['role'] = 'admin'
    session['user_id'] = 1
    return "<h1>Đã login Admin!</h1><a href='/admin/'>Về Dashboard</a>"

# --- TRANG DASHBOARD ---
@admin_bp.route("/")
def index():
    return render_template("admin.html")

# QUẢN LÝ SẢN PHẨM (PRODUCTS)

# 1. LẤY DANH SÁCH SẢN PHẨM
@admin_bp.route("/products", methods=["GET"])
def get_products():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM products ORDER BY product_id DESC")
        products = cursor.fetchall()
        return jsonify({"success": True, "data": products})
    except Exception as e:
        print("Lỗi Products:", str(e))
        return jsonify({"success": False, "error": str(e)}), 500
    finally:
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()

# 2. THÊM SẢN PHẨM
@admin_bp.route("/products", methods=["POST"])
def add_product():
    data = request.json
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO products (name, price, image, description)
            VALUES (%s, %s, %s, %s)
        """, (data["name"], data["price"], data["image"], data["description"]))
        conn.commit()
        return jsonify({"success": True, "message": "Product added"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# 3. SỬA SẢN PHẨM (Update)
@admin_bp.route("/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    data = request.json
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE products
            SET name=%s, price=%s, image=%s, description=%s
            WHERE product_id=%s
        """, (data["name"], data["price"], data["image"], data["description"], product_id))
        conn.commit()
        return jsonify({"success": True, "message": "Updated"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# 4. XÓA SẢN PHẨM
@admin_bp.route("/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM products WHERE product_id=%s", (product_id,))
        conn.commit()
        return jsonify({"success": True, "message": "Deleted"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# QUẢN LÝ ĐƠN HÀNG (ORDERS)
@admin_bp.route("/orders", methods=["GET"])
def get_orders():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
      
        cursor.execute("""
            SELECT 
                o.order_id AS id,             
                u.full_name AS customer_name, 
                o.total_amount AS total_price, 
                o.created_at
            FROM orders o
            JOIN users u ON o.user_id = u.user_id -- Mình đoán bảng users dùng user_id, nếu lỗi hãy đổi thành u.id
            ORDER BY o.created_at DESC
        """)
        
        orders = cursor.fetchall()
        return jsonify({"success": True, "data": orders})

    except Exception as e:
        print("Lỗi SQL Orders:", str(e)) 
        return jsonify({"success": False, "error": str(e)}), 500
        
    finally:
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()