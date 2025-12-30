// static/js/product.js
import { fetchProductsApi } from './api.js';
import { openProductDetail } from './productDetail.js';

// Expose openProductDetail globally because generated HTML string calls it
// Note: Since we pass objects in HTML string onclick, it's tricky. 
// We will assign it to window so the string `onclick="openProductDetail(...)"` works.
window.openProductDetail = openProductDetail;

let allProductsFromDB = [];

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '<i class="bx bx-star"></i>';
    if (hasHalfStar) stars += '<i class="bx bxs-star-half"></i>';
    return stars;
}
function renderProductHTML(product) {
    const safeName = product.name.replace(/'/g, "\\'");
    const objStr = `{id:${product.id}, name:'${safeName}', price:'${product.price}', image:'${product.image}', tag:'${product.tag}', rating:${product.rating}, colors:${product.colors}, description:'${product.description}'}`;
    return `
        <div class="row" onclick="window.openProductDetail(${objStr})">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300'">
            
            ${product.tag ? `<div class="product-text"><h5>${product.tag}</h5></div>` : ''}
            
            <div class="heart-icon"><i class='bx bx-heart'></i></div>
            <div class="rating">${generateStars(product.rating)}</div>
            
            <div class="price">
                <h4>${product.name}</h4>
                <p>${product.price}</p>
            </div>
        </div>
    `;
}

function renderProductHTMLSimple(product) {
    const safeName = product.name.replace(/'/g, "\\'");

    // SỬA: Xóa chữ 'static/' ở chỗ image
    const objStr = `{id:${product.id}, name:'${safeName}', price:'${product.price}', image:'${product.image}', tag:'${product.tag}', rating:${product.rating}, colors:${product.colors}, description:'${product.description}'}`;
    return `
        <div class="row" onclick="window.openProductDetail(${objStr})">
            <img src="${product.image}" alt="${product.name}">
            
            ${product.tag ? `<div class="product-text"><h5>${product.tag}</h5></div>` : ''}
            
            <div class="heart-icon"><i class='bx bx-heart'></i></div>
            <div class="rating">${generateStars(product.rating)}</div>
            
            <div class="price">
                <h4>${product.name}</h4>
                <p>${product.price}</p> 
            </div>
        </div>
    `;
}
export async function initProducts() {
    try {
        const data = await fetchProductsApi();
        if (data.error) {
            console.error(data.error);
            return;
        }
        allProductsFromDB = data;
        //displayTrendingProducts();
        showProducts('all');
    } catch (error) {
        console.error("Connection error", error);
        const container = document.querySelector('.trending-product .products');
        if (container) container.innerHTML = '<p style="text-align:center; width:100%">Không kết nối được Server!</p>';
    }
}

function displayTrendingProducts() {
    const container = document.querySelector('.trending-product .products');
    if (!container) return;
    const productsToShow = allProductsFromDB.slice(0, 8);
    container.innerHTML = productsToShow.map(renderProductHTML).join('');
}

export function showProducts(category) {
    const productListing = document.getElementById('productListing');
    const productGrid = document.getElementById('productGrid');
    const categoryTitle = document.getElementById('categoryTitle');
    const trendingSection = document.querySelector('.trending-product');

    if (trendingSection) trendingSection.style.display = 'none';
    if (productListing) productListing.style.display = 'block';

    let products = [];
    if (category === 'all') products = allProductsFromDB;
    else if (category === 'new') products = allProductsFromDB.filter(p => p.tag === 'New');
    else products = allProductsFromDB.filter(p => p.category === category);

    if (productGrid) {
        if (products.length === 0) {
            productGrid.innerHTML = '<p style="padding:20px;">Không tìm thấy sản phẩm.</p>';
        } else {
            productGrid.innerHTML = products.map(renderProductHTMLSimple).join('');
        }
    }

    // Smooth scroll
    productListing.scrollIntoView({ behavior: 'smooth' });
}

export async function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput.value.trim();
    if (!keyword) return;

    try {
        const data = await fetchProductsApi(keyword);

        // UI Logic for search results
        const productListing = document.getElementById('productListing');
        const productGrid = document.getElementById('productGrid');
        const trendingSection = document.querySelector('.trending-product');

        if (trendingSection) trendingSection.style.display = 'none';
        if (productListing) productListing.style.display = 'block';

        document.getElementById('categoryTitle').textContent = `Kết quả cho "${keyword}"`;

        if (data.length === 0) {
            productGrid.innerHTML = '<div style="padding:24px; width:100%; text-align:center">Không tìm thấy sản phẩm nào.</div>';
        } else {
            productGrid.innerHTML = data.map(renderProductHTMLSimple).join('');
        }
        productListing.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        console.error('Lỗi tìm kiếm:', error);
        alert('Lỗi kết nối tới Server!');
    }
}

// Expose to window
window.showProducts = showProducts;
window.searchProducts = searchProducts;

// Init on load
initProducts();