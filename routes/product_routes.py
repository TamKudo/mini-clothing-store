# routes/product_routes.py
from flask import Blueprint, jsonify, request
from db import get_db_connection

# Tạo Blueprint cho product
product_bp = Blueprint('product_bp', __name__)

@product_bp.route('/api/products', methods=['GET'])
def get_products():
    try:
        search_query = request.args.get('search') 
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        if search_query:
            sql = "SELECT * FROM products WHERE product_name LIKE %s"
            params = (f"%{search_query}%",) 
            cursor.execute(sql, params)
        else:
            cursor.execute("SELECT * FROM products")
            
        rows = cursor.fetchall()
        
        formatted_products = []
        for row in rows:
            item = {
                "id": row['product_id'],
                "name": row['product_name'],
                "price": f"${row['price']}",
                "image": row['image'],
                "tag": row['tag'],
                "rating": row['rating'],
                "category": row['category_slug'],
                "colors": 2, # Hardcode theo logic c
                "description": row['description'] if row['description'] else "Thông tin sản phẩm đang được cập nhật."
            }
            formatted_products.append(item)

        cursor.close()
        conn.close()
        return jsonify(formatted_products)
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})