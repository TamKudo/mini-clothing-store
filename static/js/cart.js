// static/js/cart.js
const API_BASE = 'http://localhost:5000';

// Biến lưu giỏ hàng
let cart = [];

// 1. Hàm tải giỏ hàng (Chỉ tải từ DB nếu đã đăng nhập)
export async function loadCart() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Nếu đã đăng nhập -> Gọi API lấy giỏ hàng
    if (currentUser && currentUser.id) {
        try {
            const res = await fetch(`${API_BASE}/api/cart?user_id=${currentUser.id}`);
            const data = await res.json();

            // Kiểm tra kỹ dữ liệu trả về để tránh lỗi .map
            if (Array.isArray(data)) {
                cart = data;
            } else {
                console.error("Lỗi dữ liệu từ Server:", data);
                cart = [];
            }
        } catch (e) {
            console.error("Lỗi kết nối:", e);
            cart = [];
        }
    } else {
        // Nếu chưa đăng nhập -> Giỏ hàng rỗng         
    }

    // Vẽ giỏ hàng ra màn hình
    renderCart();
}

// 2. Hàm thêm vào giỏ
export async function addToCart(product, quantity = 1) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // BẮT BUỘC ĐĂNG NHẬP MỚI ĐƯỢC MUA
    if (!currentUser || !currentUser.id) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ!");
        // Mở modal đăng nhập (nếu hàm openAuthModal có sẵn global)
        if (window.openAuthModal) window.openAuthModal(); // Hoặc document.getElementById('userIcon').click();
        return;
    }

    // GỌI API THÊM VÀO DB
    try {
        const res = await fetch(`${API_BASE}/api/cart/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: currentUser.id,
                product_id: product.id,
                quantity: quantity
            })
        });
        const data = await res.json();
        if (data.success) {
            alert(`Đã thêm ${product.name} vào giỏ!`);
            loadCart(); // Tải lại giỏ để cập nhật
        } else {
            alert('Lỗi: ' + data.message);
        }
    } catch (e) {
        console.error(e);
    }
}

// 3. Hàm Xóa (Remove)
window.removeFromCart = async function (itemId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.id) return;

    if (!confirm("Bạn có chắc muốn xóa sản phẩm này không?")) return;

    try {
        await fetch(`${API_BASE}/api/cart/remove`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item_id: itemId })
        });
        loadCart(); // Tải lại giỏ sau khi xóa
    } catch (e) {
        console.error(e);
    }
}

// 4. Hàm Cập nhật số lượng (+/-)
window.updateQty = async function (itemId, newQty) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.id) return;

    try {
        await fetch(`${API_BASE}/api/cart/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item_id: itemId, quantity: newQty })
        });
        loadCart(); // Tải lại giỏ sau khi cập nhật
    } catch (e) {
        console.error(e);
    }
}

// 5. Render HTML (Giữ nguyên)
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartSummary = document.getElementById('cartSummary');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
    } else {
        if (cartEmpty) cartEmpty.style.display = 'none';
        if (cartSummary) cartSummary.style.display = 'block';

        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateQty(${item.item_id}, ${item.qty - 1})">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.item_id}, ${item.qty + 1})">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.item_id})">×</button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        if (cartTotal) cartTotal.textContent = '$' + total.toFixed(2);
    }
}

// Expose functions & Init
window.addToCart = addToCart;
window.openCartModal = function () {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.add('active');
        document.getElementById('cartModalContent').classList.add('active');
        loadCart(); // Mở modal là tải lại dữ liệu mới nhất
    }
}
window.closeCartModal = function () {
    const modal = document.getElementById('cartModal');
    const content = document.getElementById('cartModalContent');
    if (modal) modal.classList.remove('active');
    if (content) content.classList.remove('active');
}

// Chạy khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

export async function checkout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.id) {
        alert("Vui lòng đăng nhập để thanh toán!");
        return;
    }

    // Kiểm tra giỏ hàng có đồ không (biến cart toàn cục)
    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }

    // Hỏi địa chỉ giao hàng
    const address = prompt("Vui lòng nhập địa chỉ giao hàng:", "Hà Nội");
    if (!address) return; // Nếu người dùng bấm Hủy

    try {
        const response = await fetch(`${API_BASE}/api/checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: currentUser.id,
                address: address
            })
        });

        const data = await response.json();

        if (data.success) {
            alert("🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
            loadCart(); // Tải lại giỏ (lúc này sẽ rỗng)
            closeCartModal();
        } else {
            alert("Lỗi: " + data.message);
        }

    } catch (error) {
        console.error("Lỗi thanh toán:", error);
    }
}

window.checkout = checkout;