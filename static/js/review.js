const API_BASE = 'http://localhost:5000';

// 1. Hàm tải review (Ai cũng được xem -> Không check đăng nhập ở đây)
export async function loadReviews() {
    try {
        const response = await fetch(`${API_BASE}/api/reviews`);
        const reviews = await response.json();

        if (Array.isArray(reviews)) {
            renderReviewList(reviews); // Chỉ vẽ danh sách ra
        } else {
            console.error("Lỗi tải Review:", reviews);
        }
    } catch (error) {
        console.error('Lỗi tải reviews:', error);
    }
}

// 2. Hàm vẽ danh sách review ra HTML
function renderReviewList(reviews) {
    const listContainer = document.getElementById('reviewList');
    if (!listContainer) return;

    if (reviews.length === 0) {
        listContainer.innerHTML = '<p style="text-align:center; color:#666;">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>';
        return;
    }

    // Map dữ liệu ra HTML
    listContainer.innerHTML = reviews.map(r => `
        <div class="review-item" style="border-bottom: 1px solid #eee; padding: 15px 0;">
            <div class="review-header" style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <strong style="color: #333;">${r.full_name}</strong>
                <span style="color: #f1c40f;">${generateStars(r.rating)}</span>
            </div>
            <p class="review-content" style="color: #555; line-height: 1.4;">${r.comments}</p>
            <small style="color: #999; font-size: 12px;">${new Date(r.created_at).toLocaleDateString()}</small>
        </div>
    `).join('');
}

// 3. Hàm gửi review (Bắt buộc đăng nhập mới gửi được)
export async function submitReview(event) {
    event.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Chặn ngay nếu chưa đăng nhập
    if (!currentUser || !currentUser.id) {
        alert("Vui lòng đăng nhập để gửi đánh giá!");
        return;
    }

    const comments = document.getElementById('reviewContent').value;
    const rating = document.getElementById('reviewRating').value;

    try {
        const response = await fetch(`${API_BASE}/api/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: currentUser.id,
                comments: comments,
                rating: rating
            })
        });

        const data = await response.json();
        if (data.success) {
            alert('Cảm ơn bạn đã đánh giá!');
            document.getElementById('reviewContent').value = ''; // Xóa ô nhập
            loadReviews(); // Tải lại danh sách để hiện review mới lên ngay
        } else {
            alert('Lỗi: ' + data.message);
        }
    } catch (error) {
        console.error('Lỗi gửi review:', error);
    }
}

// Hàm phụ: Tạo sao
function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) stars += '<i class="bx bxs-star"></i>';
    return stars;
}

function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const formBox = document.getElementById('reviewFormContainer');
    const warning = document.getElementById('loginWarning');

    if (currentUser && currentUser.id) {
        // Đã đăng nhập: Hiện form nhập, Ẩn cảnh báo
        if (formBox) formBox.style.display = 'block';
        if (warning) warning.style.display = 'none';
    } else {
        // Chưa đăng nhập: Ẩn form nhập, Hiện cảnh báo
        if (formBox) formBox.style.display = 'none';
        if (warning) warning.style.display = 'block';
    }
}
window.submitReview = submitReview;

document.addEventListener('DOMContentLoaded', () => {
    loadReviews();
    checkLoginStatus();
});

document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star-item");
    const ratingText = document.getElementById("ratingText");
    const hiddenInput = document.getElementById("reviewRating");
    const starsContainer = document.querySelector(".stars-input");

    const textMap = {
        1: "Rất tệ",
        2: "Tệ",
        3: "Bình thường",
        4: "Tốt",
        5: "Tuyệt vời"
    };

    function highlightStars(value) {
        stars.forEach(s => {
            const starVal = parseInt(s.getAttribute("data-value"));
            if (starVal <= value) {
                s.classList.remove("bx-star");
                s.classList.add("bxs-star");
                s.classList.add("active");
            } else {
                s.classList.remove("bxs-star");
                s.classList.remove("active");
                s.classList.add("bx-star");
            }
        });
        if (value > 0) {
            ratingText.textContent = textMap[value];
        }
    }

    stars.forEach(star => {
        star.addEventListener("mouseenter", () => {
            const value = parseInt(star.getAttribute("data-value"));
            highlightStars(value);
        });

        star.addEventListener("click", () => {
            const value = parseInt(star.getAttribute("data-value"));
            hiddenInput.value = value;
            highlightStars(value);
        });
    });

    starsContainer.addEventListener("mouseleave", () => {
        const currentValue = parseInt(hiddenInput.value);
        highlightStars(currentValue);
    });
});

window.addTag = function (element) {
    const textarea = document.getElementById("reviewContent");
    const textToAdd = element.innerText;
    if (element.classList.contains('selected')) {
        return;
    }

    // Hiệu ứng Visual: Đánh dấu thẻ đã chọn
    element.classList.add('selected');

    // Logic nối chuỗi thông minh
    let currentText = textarea.value.trim();

    if (currentText.length > 0) {
        const lastChar = currentText.slice(-1);
        if (!['.', ',', '!', ';'].includes(lastChar)) {
            textarea.value += ". " + textToAdd;
        } else {
            textarea.value += " " + textToAdd;
        }
    } else {
        textarea.value = textToAdd;
    }

    textarea.focus();
};