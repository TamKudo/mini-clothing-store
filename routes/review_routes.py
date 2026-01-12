# routes/review_routes.py
from flask import Blueprint, jsonify, request
from db import get_db_connection

review_bp = Blueprint('review_bp', __name__)

# 1. API Lấy danh sách review (Kết hợp bảng users để lấy tên)
@review_bp.route('/api/reviews', methods=['GET'])
def get_reviews():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Query: Lấy comment và tên người dùng tương ứng
        sql = """
            SELECT r.review_id, r.rating, r.comments, r.created_at, u.full_name 
            FROM reviews r 
            JOIN users u ON r.user_id = u.user_id 
            ORDER BY r.created_at DESC
        """
        cursor.execute(sql)
        reviews = cursor.fetchall()
        
        cursor.close()
        conn.close()
        return jsonify(reviews)
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

# 2. API Gửi review mới
@review_bp.route('/api/reviews', methods=['POST'])
def add_review():
    try:
        data = request.json
        user_id = data.get('user_id')    # Lấy ID người dùng
        comments = data.get('comments')  # Lấy nội dung comment
        rating = data.get('rating', 5)
        if not user_id or not comments:
            return jsonify({"success": False, "message": "Thiếu thông tin!"})

        conn = get_db_connection()
        cursor = conn.cursor()
        
        sql = "INSERT INTO reviews (user_id, comments, rating, product_id) VALUES (%s, %s, %s, NULL)"
        cursor.execute(sql, (user_id, comments, rating))
        conn.commit()
        
        cursor.close()
        conn.close()
        return jsonify({"success": True, "message": "Gửi đánh giá thành công!"})
    except Exception as e:
        print(e)
        return jsonify({"success": False, "message": str(e)})