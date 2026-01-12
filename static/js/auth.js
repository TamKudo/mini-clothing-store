// static/js/auth.js
import { loginApi, registerApi } from './api.js';

// --- UI Helpers ---
function showMessage(elementId, message, type) {
    const container = document.getElementById(elementId);
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;
    container.innerHTML = '';
    container.appendChild(messageEl);

    if (type === 'success') {
        setTimeout(() => {
            if (messageEl.parentElement) {
                messageEl.style.animation = 'slideOutUp 0.4s ease-out forwards';
                setTimeout(() => messageEl.remove(), 400);
            }
        }, 4000);
    }
}

function clearMessages() {
    const el = document.getElementById('messageContainer');
    if (el) el.innerHTML = '';
}

function resetForms() {
    const loginUser = document.getElementById('loginUsername');
    const loginPass = document.getElementById('loginPassword');
    if (loginUser) loginUser.value = '';
    if (loginPass) loginPass.value = '';
    // ... reset others
}

// --- Modal Logic ---
export function closeModal() {
    const modal = document.getElementById('authModal');
    const modalContent = document.getElementById('modalContent');
    modal.classList.remove('active');
    modalContent.classList.remove('active');
    document.body.style.overflow = '';
    clearMessages();
    resetForms();
}

export function showLogin() {
    document.getElementById('modalTitle').textContent = 'Login';
    document.getElementById('welcomeTitle').textContent = 'Welcome back!';
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
    clearMessages();
}

export function showRegister() {
    document.getElementById('modalTitle').textContent = 'Sign up';
    document.getElementById('welcomeTitle').textContent = 'Create an account';
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('registerForm').classList.add('active');
    clearMessages();
}

// --- Handlers ---
export async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
        const data = await loginApi(email, password);
        if (data.success) {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            showMessage('messageContainer', 'Đăng nhập thành công! Xin chào ' + data.user.username, 'success');
            setTimeout(() => {
                closeModal();
                location.reload();
            }, 1000);
        } else {
            showMessage('messageContainer', data.message, 'error');
        }
    } catch (error) {
        console.error(error);
        showMessage('messageContainer', 'Lỗi kết nối server!', 'error');
    }
}

export async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (password !== confirmPassword) {
        showMessage('messageContainer', 'Mật khẩu xác nhận không khớp!', 'error');
        return;
    }

    try {
        const data = await registerApi(username, email, password);
        if (data.success) {
            showMessage('messageContainer', 'Đăng ký thành công!', 'success');
            setTimeout(() => {
                showLogin();
                document.getElementById('loginUsername').value = email;
            }, 1500);
        } else {
            showMessage('messageContainer', data.message || 'Lỗi đăng ký', 'error');
        }
    } catch (error) {
        console.error(error);
        showMessage('messageContainer', 'Không thể kết nối server!', 'error');
    }
}

export function confirmLogout() {
    localStorage.removeItem('currentUser');
    closeLogoutModal();
    alert('Đã đăng xuất thành công!');
    location.reload();
}

// Logout Modal Wrappers
export function openLogoutModal() {
    const m = document.getElementById('logoutModal');
    const c = document.getElementById('logoutModalContent');
    m.classList.add('active');
    c.classList.add('active');
}
export function closeLogoutModal() {
    const m = document.getElementById('logoutModal');
    const c = document.getElementById('logoutModalContent');
    m.classList.remove('active');
    c.classList.remove('active');
}

// Check Logic on Load
window.addEventListener('load', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        console.log('Logged in as:', currentUser.username);
    }
});

// User Icon Click
const userIcon = document.getElementById('userIcon');
if (userIcon) {
    userIcon.onclick = (e) => {
        e.preventDefault();
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            const modal = document.getElementById('authModal');
            const modalContent = document.getElementById('modalContent');
            modal.classList.add('active');
            modalContent.classList.add('active');
            showLogin();
        } else {
            document.getElementById('logoutUsername').textContent = 'Bạn đang đăng nhập với: ' + currentUser.username;
            openLogoutModal();
        }
    };
}

// Expose to window
window.closeModal = closeModal;
window.showLogin = showLogin;
window.showRegister = showRegister;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.confirmLogout = confirmLogout;
window.closeLogoutModal = closeLogoutModal;
window.checkLoginForm = function () { }; // Placeholder if needed
window.checkRegisterForm = function () { }; // Placeholder if needed

// --- Logic kiểm tra form để bật sáng nút Login ---
export function checkLoginForm() {
    const email = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const loginBtn = document.getElementById('loginBtn');

    // Nếu cả 2 ô đều không rỗng
    if (email.trim() !== "" && password.trim() !== "") {
        loginBtn.classList.add('active');
    } else {
        loginBtn.classList.remove('active');
    }
}

// --- Logic kiểm tra form để bật sáng nút Register ---
export function checkRegisterForm() {
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const registerBtn = document.getElementById('registerBtn');

    if (username && email && password && confirmPassword) {
        registerBtn.classList.add('active');
    } else {
        registerBtn.classList.remove('active');
    }
}

// Gán vào window để HTML có thể gọi được 
window.checkLoginForm = checkLoginForm;
window.checkRegisterForm = checkRegisterForm;