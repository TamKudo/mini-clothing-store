# check_server.py
from db import get_db_connection

print("\n================ KIỂM TRA CHÉO SERVER ================")
try:
    conn = get_db_connection()
    cursor = conn.cursor()

    # 1. Kiểm tra xem Python đang nói chuyện với ai? (MariaDB hay MySQL?)
    # XAMPP mặc định là MariaDB. Nếu hiện MySQL Community -> BẠN ĐANG KẾT NỐI NHẦM!
    cursor.execute("SELECT VERSION()")
    version = cursor.fetchone()[0]
    print(f"► Server Version đang chạy: {version}")

    # 2. Kiểm tra lại tên Database
    cursor.execute("SELECT DATABASE()")
    db_name = cursor.fetchone()[0]
    print(f"► Đang đứng ở Database: {db_name}")

    # 3. Liệt kê tất cả các bảng (Xem có bảng users không?)
    cursor.execute("SHOW TABLES")
    tables = cursor.fetchall()
    print(f"► Danh sách bảng tìm thấy: {[t[0] for t in tables]}")

    # 4. Thử lôi toàn bộ user ra (Bất chấp email là gì)
    cursor.execute("SELECT user_id, email, password FROM users")
    users = cursor.fetchall()
    
    print(f"\n► TỔNG SỐ USER TÌM THẤY: {len(users)}")
    if len(users) > 0:
        print("Danh sách chi tiết:")
        for u in users:
            print(f"   - ID: {u[0]} | Email: '{u[1]}' | Pass: '{u[2]}'")
    else:
        print("⚠️ CẢNH BÁO: Bảng users TRỐNG RỖNG trong Server này!")

    conn.close()
except Exception as e:
    print("❌ LỖI KẾT NỐI:", e)
print("======================================================")