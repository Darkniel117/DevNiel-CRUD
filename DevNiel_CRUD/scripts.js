/**
 * DevNiel CRUD - Scripts
 * Manejo de navegación, modal de login y menú hamburguesa
 */

(function() {
    'use strict';

    // ============================================
    // CONFIGURACIÓN Y UTILIDADES
    // ============================================
    const Config = {
        navSelector: '.tabs-container',
        loginImageId: 'loginImage',
        loginFormId: 'loginForm',
        overlayId: 'overlay',
        closeLoginId: 'closeLogin',
        navLinksId: 'navLinks',
        hamburgerId: 'hamburgerBtn',
        stickyClass: 'sticky'
    };

    // Cache de elementos del DOM para evitar selectores repetidos
    const DOM = {
        nav: null,
        loginImage: null,
        loginForm: null,
        overlay: null,
        closeLogin: null,
        navLinks: null,
        hamburger: null
    };

    // ============================================
    // UTILIDADES
    // ============================================
    const Utils = {
        // Verifica si un elemento está visible
        isVisible: (el) => el && !el.hidden && el.offsetParent !== null,

        // Obtiene el primer elemento enfocable
        getFirstFocusable: (container) => {
            const selectors = 'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])';
            return container.querySelector(selectors);
        },

        // Guarda y restaura el foco
        trapFocus: (container, lastFocus) => {
            const focusableElements = Array.from(
                container.querySelectorAll('button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])')
            ).filter(Utils.isVisible);

            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            return (e) => {
                if (e.key !== 'Tab') return;

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            };
        }
    };

    // ============================================
    // SISTEMA DE STICKY NAVIGATION
    // ============================================
    function initStickyNav() {
        const offset = DOM.nav.offsetTop;

        if (offset === 0) return; // Si ya está en la parte superior

        const handleScroll = () => {
            DOM.nav.classList.toggle(Config.stickyClass, window.scrollY >= offset);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Verificar estado inicial
    }

    // ============================================
    // SISTEMA DE MODAL DE LOGIN
    // ============================================
    const LoginModal = {
        lastFocus: null,
        isOpen: false,
        openedAt: 0,
        onKeyDown: null,

        init() {
            if (!DOM.loginImage || !DOM.loginForm || !DOM.overlay) {
                console.warn('LoginModal: Faltan elementos del DOM');
                return;
            }

            // Event listeners
            DOM.loginImage.addEventListener('click', (e) => this.open(e));
            
            // Botón X para cerrar
            if (DOM.closeLogin) {
                DOM.closeLogin.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.close();
                });
            }

            // Cerrar con Escape
            document.addEventListener('keydown', (e) => this.handleKeyDown(e));

            // Cerrar al hacer clic fuera del modal (delegado al overlay)
            DOM.overlay.addEventListener('click', (e) => {
                if (e.target === DOM.overlay) {
                    this.close();
                }
            });
        },

        toggle(event) {
            event?.preventDefault();
            event?.stopPropagation();
            this.isOpen ? this.close() : this.open();
        },

        open() {
            this.lastFocus = document.activeElement;
            this.openedAt = performance.now();

            DOM.overlay.hidden = false;
            DOM.loginForm.hidden = false;
            document.body.classList.add('modal-open');
            DOM.loginImage.setAttribute('aria-expanded', 'true');
            this.isOpen = true;

            // Enfocar primer elemento
            const firstFocusable = Utils.getFirstFocusable(DOM.loginForm);
            if (firstFocusable) {
                requestAnimationFrame(() => firstFocusable.focus());
            }

            // Bloquear tabulación
            this.onKeyDown = Utils.trapFocus(DOM.loginForm, this.lastFocus);
            document.addEventListener('keydown', this.onKeyDown);
        },

        close() {
            DOM.overlay.hidden = true;
            DOM.loginForm.hidden = true;
            document.body.classList.remove('modal-open');
            DOM.loginImage.setAttribute('aria-expanded', 'false');
            this.isOpen = false;

            // Restaurar foco
            if (this.lastFocus && typeof this.lastFocus.focus === 'function') {
                this.lastFocus.focus();
            }

            // Quitar listeners de trap focus
            if (this.onKeyDown) {
                document.removeEventListener('keydown', this.onKeyDown);
                this.onKeyDown = null;
            }
        },



        handleKeyDown(event) {
            if (event.key === 'Escape' && this.isOpen) {
                event.preventDefault();
                this.close();
            }
        }
    };

    // ============================================
    // SISTEMA DE MENÚ HAMBURGUESA
    // ============================================
    const HamburgerMenu = {
        isOpen: false,

        init() {
            if (!DOM.hamburger || !DOM.navLinks || !DOM.overlay) return;

            DOM.hamburger.addEventListener('click', () => this.toggle());
            DOM.overlay.addEventListener('click', () => this.close());

            // Cerrar al hacer clic en un enlace
            DOM.navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.close());
            });
        },

        toggle() {
            this.isOpen = !this.isOpen;
            DOM.nav.classList.toggle('nav-open', this.isOpen);
            DOM.hamburger.classList.toggle('active', this.isOpen);
            DOM.overlay.classList.toggle('active', this.isOpen);
        },

        close() {
            this.isOpen = false;
            DOM.nav.classList.remove('nav-open');
            DOM.hamburger.classList.remove('active');
            DOM.overlay.classList.remove('active');
        }
    };

    // ============================================
    // INICIALIZACIÓN
    // ============================================
    function initDOMCache() {
        DOM.nav = document.querySelector(Config.navSelector);
        DOM.loginImage = document.getElementById(Config.loginImageId);
        DOM.loginForm = document.getElementById(Config.loginFormId);
        DOM.overlay = document.getElementById(Config.overlayId);
        DOM.closeLogin = document.getElementById(Config.closeLoginId);
        DOM.navLinks = document.getElementById(Config.navLinksId);
        DOM.hamburger = document.getElementById(Config.hamburgerId);
    }

    function init() {
        initDOMCache();
        initStickyNav();
        LoginModal.init();
        HamburgerMenu.init();
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
