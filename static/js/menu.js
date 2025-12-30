// static/js/menu.js

document.addEventListener('DOMContentLoaded', () => {
    // Search Toggle
    const searchIcon = document.getElementById('searchIcon');
    const searchInput = document.getElementById('searchInput');
    if (searchIcon && searchInput) {
        searchIcon.addEventListener('click', function (e) {
            e.preventDefault();
            if (searchInput.style.display === 'none' || searchInput.style.display === '') {
                searchInput.style.display = 'block';
                searchInput.focus();
            } else {
                searchInput.style.display = 'none';
            }
        });
        document.addEventListener('click', function (e) {
            if (!searchInput.contains(e.target) && !searchIcon.contains(e.target)) {
                searchInput.style.display = 'none';
            }
        });
    }

    // Sticky Header
    const header = document.querySelector("header");
    window.addEventListener("scroll", function () {
        header.classList.toggle("sticky", window.scrollY > 0);
    });

    // Mobile Menu
    let menu = document.querySelector('#menu-icon');
    let navmenu = document.querySelector('.navmenu');
    if (menu) {
        menu.onclick = () => {
            menu.classList.toggle('bx-x');
            navmenu.classList.toggle('open');
        };
    }

    // Mobile Dropdown
    if (window.innerWidth <= 750) {
        const dropdownBtn = document.querySelector('.dropdown .dropbtn');
        if (dropdownBtn) {
            dropdownBtn.addEventListener('click', function (e) {
                e.preventDefault();
                this.parentElement.classList.toggle('active');
            });
        }
    }
});