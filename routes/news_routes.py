from flask import Blueprint, jsonify
from db import get_db_connection

news_bp = Blueprint('news_bp', __name__)

@news_bp.route('/api/news', methods=['GET'])
def get_news():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Lấy 3 tin mới nhất
        sql = "SELECT * FROM news ORDER BY created_at DESC LIMIT 3"
        cursor.execute(sql)
        news_list = cursor.fetchall()
        
        # Format lại ngày tháng
        for item in news_list:
            # Chuyển object datetime thành chuỗi
            item['date_formatted'] = item['created_at'].strftime("%d %b %Y")

        cursor.close()
        conn.close()
        return jsonify(news_list)
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})