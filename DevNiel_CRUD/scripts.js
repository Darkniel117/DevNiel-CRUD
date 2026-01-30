
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

//-- ----------------------------------------------------------------------------
//-- ------------------------------ FORMULARIO LOGIN MODAL ------------------------------
//-- ------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const trigger  = document.getElementById('loginImage');       // icono de perfil
  const modal    = document.getElementById('loginForm');         // contenedor modal
  const overlay  = document.getElementById('overlay') || document.querySelector('.overlay'); // fondo oscuro
  const panel    = modal?.querySelector('.card');                // panel interno

  if (!trigger || !modal || !overlay || !panel) return; // elementos necesarios

  // Estado y funciones de apertura/cierre

  let lastFocus = null;
  let openedAt = 0; // guard temporal para evitar cerrar por el mismo clic de apertura

  function openLogin() {
    lastFocus = document.activeElement;
    overlay.hidden = false;
    modal.hidden   = false;
    document.body.classList.add('modal-open');
    trigger.setAttribute('aria-expanded', 'true');
    openedAt = performance.now();

    // foco inicial
    const first = modal.querySelector('input, button, a, select, textarea, [tabindex]:not([tabindex="-1"])');
    requestAnimationFrame(() => (first || panel).focus());

    // registrar fuera en el siguiente tick para no capturar el clic que abrió
    setTimeout(() => {
      document.addEventListener('pointerdown', onPointerDown, true); // captura
      document.addEventListener('keydown', onKeyDown); // para Escape y tabulación
    }, 0);
  }

  function closeLogin() {
    overlay.hidden = true;
    modal.hidden   = true;
    document.body.classList.remove('modal-open');
    trigger.setAttribute('aria-expanded', 'false');
    document.removeEventListener('pointerdown', onPointerDown, true);
    document.removeEventListener('keydown', onKeyDown);
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  function onPointerDown(e) {
    // ignora eventos ocurridos inmediatamente después de abrir (misma interacción)
    if (performance.now() - openedAt < 50) return;
    // clic en el overlay → cerrar
    if (e.target === overlay) return closeLogin();
    // clic fuera del panel → cerrar
    if (!panel.contains(e.target)) return closeLogin();
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') { e.preventDefault(); closeLogin(); }
    // bloqueo de tabulación fuera del modal (opcional)
    if (e.key === 'Tab' && !modal.hidden) {
      const sel = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
      const list = Array.from(modal.querySelectorAll(sel)).filter(el => el.offsetParent !== null);
      if (!list.length) return;
      const first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  // Abrir (y evita que el mismo clic burbujee y cierre)
  trigger.addEventListener('click', (e) => {
    e.preventDefault();     // por si el trigger es <a href="#">
    e.stopPropagation();    // evita que burbujee al document
    modal.hidden ? openLogin() : closeLogin();
  });

  // Cerrar tocando el overlay (redundante pero claro)
  overlay.addEventListener('click', () => { if (!modal.hidden) closeLogin(); });
});


//-- ----------------------------------------------------------------------------
//-- ------------------------------ MENÚ HAMBURGUESA ------------------------------
//-- ------------------------------------------------------------------------------
// Selección de elementos
const hamburger = document.getElementById('hamburgerBtn'); // Botón de menú hamburguesa
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');
const tabsContainer = document.querySelector('.tabs-container');  // NUEVO

// Abrir/cerrar menú
hamburger.addEventListener('click', () => {
    tabsContainer.classList.toggle('nav-open');  // CAMBIO: usa .nav-open
});

// Cerrar menú al hacer clic en un link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        tabsContainer.classList.remove('nav-open');  // CAMBIO: usa .nav-open
    });
});

// Cerrar menú al hacer clic en el overlay
overlay.addEventListener('click', () => {
    tabsContainer.classList.remove('nav-open');  // CAMBIO: usa .nav-open
});








