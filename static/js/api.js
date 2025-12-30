// static/js/api.js
const API_BASE = 'http://localhost:5000';

export async function fetchProductsApi(searchQuery = '') {
    const url = searchQuery
        ? `${API_BASE}/api/products?search=${searchQuery}`
        : `${API_BASE}/api/products`;
    const response = await fetch(url);
    return await response.json();
}

export async function loginApi(email, password) {
    const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return await response.json();
}

export async function registerApi(username, email, password) {
    const response = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });
    return await response.json();
}