# app.py
from flask import Flask, send_from_directory
from flask_cors import CORS
from routes.product_routes import product_bp
from routes.auth_routes import auth_bp
from routes.review_routes import review_bp
from routes.cart_routes import cart_bp
from routes.order_routes import order_bp
from routes.news_routes import news_bp
from routes.admin_routes import admin_bp
from flask import render_template

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# Register Blueprints
app.register_blueprint(product_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(review_bp)
app.register_blueprint(cart_bp)
app.register_blueprint(order_bp)
app.register_blueprint(news_bp)
app.register_blueprint(admin_bp)
# Route để serve file HTML chính (nếu chạy cả FE lẫn BE trên Flask)
@app.route('/')
def home():
    return send_from_directory('templates', 'index.html')

# Route serve static files 
@app.route('/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@app.route('/admin')
def admin_page():
    return render_template('admin.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)