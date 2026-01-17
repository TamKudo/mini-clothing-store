from flask import Blueprint, jsonify, request
from db import get_db_connection

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.json
        full_name = data.get('username')
        email = data.get('email')
        password = data.get('password')

        conn = get_db_connection()
        cursor = conn.cursor()

        # Check email existence
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({"success": False, "message": "Email này đã được sử dụng!"})

        # Insert user
        sql = "INSERT INTO users (full_name, email, password, role) VALUES (%s, %s, %s, 'customer')"
        cursor.execute(sql, (full_name, email, password))
        conn.commit()

        cursor.close()
        conn.close()
        return jsonify({"success": True, "message": "Đăng ký thành công!"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

@auth_bp.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        email_login = data.get('email')
        password_login = data.get('password')

        # them dong nay debug
        print(f"DEBUG: Đang thử login với Email='{email_login}' và Pass='{password_login}'")

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        sql = "SELECT * FROM users WHERE email = %s AND password = %s"
        cursor.execute(sql, (email_login, password_login))
        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if user :
            return jsonify({
                "success": True, 
                "message": "Đăng nhập thành công!",
                "user": {
                    "id": user['user_id'],
                    "username": user['full_name'],
                    "email": user['email'],
                    "role": user['role']
                }
            })
        else:
            return jsonify({"success": False, "message": "Sai email hoặc mật khẩu!"})

    except Exception as e:
        return jsonify({"success": False, "message": str(e)})