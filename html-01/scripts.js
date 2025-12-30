
// Script para hacer que la barra de navegación sea sticky
const nav = document.querySelector(".tabs-container");

const offset = nav.offsetTop;

window.addEventListener("scroll", function () {
    if (window.scrollY >= offset) {
        nav.classList.add("sticky");    
    } else {
        nav.classList.remove("sticky");
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const loginImage = document.getElementById('loginImage');
    const overlay = document.querySelector('.overlay');
    const loginForm = document.querySelector('.login-form');
    const isLoginFormVisible = false;

    // Función para mostrar el formulario y el fondo oscuro
    function showLoginForm() {
        overlay.style.display = 'block';
        loginForm.style.display = 'block';
    }

    // Función para ocultar el formulario y el fondo oscuro
    function hideLoginForm() {
        overlay.style.display = 'none';
        loginForm.style.display = 'none';
    }

    // Agrega un evento de clic a la imagen para mostrar u ocultar el formulario
    loginImage.addEventListener('click', function () {
        if (loginForm.style.display === 'none' || loginForm.style.display === '') {
            showLoginForm();
        } else {
            hideLoginForm();
        }
    });
});

// Selección de elementos
const hamburger = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');

// Abrir/cerrar menú
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
});

// Cerrar menú al hacer clic en un link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
    });
});

// Cerrar menú al hacer clic en el overlay
overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
});







