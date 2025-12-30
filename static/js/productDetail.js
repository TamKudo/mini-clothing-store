// static/js/productDetail.js
import { addToCart } from './cart.js';

let currentProduct = null;

export function openProductDetail(product) {
    currentProduct = product;
    const detailModal = document.getElementById('productDetailModal');
    const detailContent = document.getElementById('productDetailContent');

    document.getElementById('detailImage').src = product.image;
    document.getElementById('detailName').textContent = product.name;
    document.getElementById('detailDescription').textContent = product.description;

    const tagEl = document.getElementById('detailTag');
    if (product.tag) {
        tagEl.textContent = product.tag;
        tagEl.style.display = 'inline-block';
    } else {
        tagEl.style.display = 'none';
    }

    // Stars logic (reused)
    const starsEl = document.getElementById('detailStars');
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) starsHTML += '<i class="bx bx-star"></i>';
    if (hasHalfStar) starsHTML += '<i class="bx bxs-star-half"></i>';
    starsEl.innerHTML = starsHTML;

    document.getElementById('detailRating').textContent = product.rating + '/5';
    document.getElementById('detailPrice').textContent = product.price;
    document.getElementById('detailColors').textContent = product.colors + ' colors';
    document.getElementById('detailQty').value = 1;

    detailModal.classList.add('active');
    detailContent.classList.add('active');
    document.body.style.overflow = 'hidden';
}

export function closeProductDetail() {
    const detailModal = document.getElementById('productDetailModal');
    const detailContent = document.getElementById('productDetailContent');
    detailModal.classList.remove('active');
    detailContent.classList.remove('active');
    document.body.style.overflow = '';
    currentProduct = null;
}

export function increaseQty() {
    const input = document.getElementById('detailQty');
    input.value = parseInt(input.value) + 1;
}

export function decreaseQty() {
    const input = document.getElementById('detailQty');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

export function addToCartDetail() {
    if (!currentProduct) return;
    const qty = parseInt(document.getElementById('detailQty').value);
    addToCart(currentProduct, qty);

    setTimeout(() => {
        closeProductDetail();
    }, 1500);
}

// Expose to window
window.closeProductDetail = closeProductDetail;
window.increaseQty = increaseQty;
window.decreaseQty = decreaseQty;
window.addToCartDetail = addToCartDetail;