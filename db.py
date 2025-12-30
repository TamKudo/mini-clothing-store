# db.py
import mysql.connector

# Cấu hình kết nối MySQL
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'mini_clothing_store'
}

def get_db_connection():
    """Tạo và trả về kết nối database"""
    return mysql.connector.connect(**db_config)