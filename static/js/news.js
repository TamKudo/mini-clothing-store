const API_BASE = 'http://localhost:5000';

// 1. Hàm tải tin tức
async function loadNews() {
    try {
        const response = await fetch(`${API_BASE}/api/news`);
        const newsList = await response.json();

        const container = document.getElementById('newsContainer');
        if (!container) return;

        if (newsList.length === 0) {
            container.innerHTML = '<p>Chưa có tin tức nào.</p>';
            return;
        }
        container.innerHTML = newsList.map((item, index) => `
            <div class="cart" id="news-item-${index}">
                <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/300'">
                <h5>${item.date_formatted}</h5>
                <h4>${item.title}</h4>
                <p>${item.content}</p>
                
                <div class="news-full-content" id="full-content-${index}">
                    ${item.full_content ? item.full_content : item.content}
                </div>

                <h6 onclick="toggleNews(${index}, this)">Continue Reading...</h6>
            </div>
        `).join('');

    } catch (error) {
        console.error("Lỗi tải tin tức:", error);
    }
}

// 2. Hàm xử lý Bấm nút (Mở ra / Thu vào)
function toggleNews(index, btnElement) {
    const contentDiv = document.getElementById(`full-content-${index}`);

    if (contentDiv.style.display === 'block') {
        // Nếu đang mở -> Đóng lại
        contentDiv.style.display = 'none';
        btnElement.textContent = 'Continue Reading...'; // Đổi lại tên nút
    } else {
        // Nếu đang đóng -> Mở ra
        contentDiv.style.display = 'block';
        btnElement.textContent = 'Show Less'; // Đổi tên nút thành "Thu gọn"
    }
}

// Expose function
window.toggleNews = toggleNews;

document.addEventListener('DOMContentLoaded', loadNews);