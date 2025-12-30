// Hàm format tiền Việt Nam
const formatMoney = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

let allProducts = [];
let isEdit = false;

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadOrders();
});

// --- LOAD DATA ---
function loadProducts() {
    fetch("/admin/products")
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                allProducts = data.data;
                renderProductTable(data.data);
            }
        });
}

function loadOrders() {
    fetch("/admin/orders")
        .then(res => res.json())
        .then(data => {
            if (data.success) renderOrderTable(data.data);
        });
}

// --- RENDER GIAO DIỆN ---
function renderProductTable(products) {
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";

    products.forEach(p => {
        const row = `
            <tr>
                <td>#${p.product_id}</td>
                <td>
                    <img src="${p.image}" class="product-img-thumb" onerror="this.src='https://via.placeholder.com/80'">
                </td>
                <td style="font-weight: 500;">${p.product_name}</td>
                <td style="color: #d32f2f; font-weight: bold;">${formatMoney(p.price)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="openModal(${p.product_id})">
                            <i class="fas fa-edit"></i> Sửa
                        </button>
                        <button class="btn-delete" onclick="deleteProduct(${p.product_id})">
                            <i class="fas fa-trash"></i> Xóa
                        </button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function renderOrderTable(orders) {
    const tbody = document.querySelector("#orderTable tbody");
    tbody.innerHTML = "";
    orders.forEach(o => {
        const row = `
            <tr>
                <td>#${o.id}</td>
                <td>${o.customer_name}</td>
                <td>${formatMoney(o.total_price)}</td>
                <td>${new Date(o.created_at).toLocaleDateString('vi-VN')}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// --- XỬ LÝ MODAL (POPUP) ---

// Hàm xem trước ảnh khi nhập link
function previewImage() {
    const url = document.getElementById("image").value;
    const img = document.getElementById("preview-img");
    if (url) {
        img.src = url;
        img.style.display = "inline-block";
    } else {
        img.style.display = "none";
    }
}

// Mở Modal (Nếu có ID -> Chế độ Sửa, Không có -> Chế độ Thêm)
function openModal(id = null) {
    const modal = document.getElementById("productModal");
    const title = document.getElementById("modalTitle");

    modal.classList.add("active"); // Hiện modal

    if (id) {
        // CHẾ ĐỘ SỬA
        isEdit = true;
        const p = allProducts.find(prod => prod.product_id === id);
        title.innerText = "Chỉnh sửa sản phẩm";

        // Điền dữ liệu cũ vào form
        document.getElementById("productId").value = p.product_id;
        document.getElementById("name").value = p.product_name;
        document.getElementById("price").value = p.price;
        document.getElementById("image").value = p.image;
        document.getElementById("description").value = p.description;

        previewImage(); // Hiện ảnh cũ
    } else {
        // CHẾ ĐỘ THÊM MỚI
        isEdit = false;
        title.innerText = "Thêm sản phẩm mới";

        // Reset form trắng trơn
        document.getElementById("productId").value = "";
        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("image").value = "";
        document.getElementById("description").value = "";
        document.getElementById("preview-img").style.display = "none";
    }
}

// Đóng Modal
function closeModal() {
    document.getElementById("productModal").classList.remove("active");
}

// Lưu dữ liệu (Gọi API)
function saveProduct() {
    const id = document.getElementById("productId").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;

    if (!name || !price) {
        alert("Vui lòng nhập tên và giá sản phẩm!");
        return;
    }

    const data = { name, price, image, description };
    const url = isEdit ? `/admin/products/${id}` : "/admin/products";
    const method = isEdit ? "PUT" : "POST";

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                alert(isEdit ? "Đã cập nhật!" : "Đã thêm mới!");
                closeModal();
                loadProducts(); // Tải lại bảng
            } else {
                alert("Lỗi: " + response.error);
            }
        });
}

// Xóa sản phẩm
function deleteProduct(id) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
        fetch(`/admin/products/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    loadProducts();
                } else {
                    alert("Lỗi: " + response.error);
                }
            });
    }
}