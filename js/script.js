document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    /* MÓDULO 1: NAVEGAÇÃO MÓVEL */
    const setupMobileNavigation = () => {
        if (navToggle && navMenu && navClose) {
            navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
            navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
            navLinks.forEach(link => {
                link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
            });
        }
    };

    /* MÓDULO 2: BANNER ROTATIVO (SLIDER) */
    const setupSlider = () => {
        const slides = document.querySelectorAll('.slide');
        if (slides.length <= 1) return;
        let currentSlide = 0;
        const slideInterval = 7000;
        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            currentSlide = index;
        };
        const nextSlide = () => showSlide((currentSlide + 1) % slides.length);
        showSlide(0);
        setInterval(nextSlide, slideInterval);
    };

    /* MÓDULO 3: EFEITO NO CABEÇALHO AO ROLAR */
    const setupHeaderScrollEffect = () => {
        if (!header) return;
        window.addEventListener('scroll', () => {
            header.classList.toggle('scroll-header', window.scrollY >= 50);
        });
    };

    /* MÓDULO 4: NAVEGAÇÃO ATIVA AO ROLAR*/
    const setupScrollSpy = () => {
        const sections = document.querySelectorAll('section[id]');
        if (sections.length === 0) return;

        const onScroll = () => {
            const scrollY = window.pageYOffset;
            const headerHeight = header ? header.offsetHeight : 70;

            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - headerHeight - 10; // Adiciona um pequeno buffer
                const sectionId = current.getAttribute('id');
                const navLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

                if (navLink) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        navLink.classList.add('active-link');
                    } else {
                        navLink.classList.remove('active-link');
                    }
                }
            });
        };
        window.addEventListener('scroll', onScroll);
        onScroll();
    };

    /* ========================================================== */
    /* MÓDULO 5: LÓGICA DOS MODAIS      */
    /* ========================================================== */
    const setupModals = () => {
        const inscriptionModal = document.getElementById('inscription-modal');
        const historyModal = document.getElementById('history-modal');

        const openModal = (modal) => {
            if (modal) modal.classList.add('is-open');
        };

        const closeModal = (modal) => {
            if (modal) modal.classList.remove('is-open');
        };

        // Event listener central para cliques em todo o documento
        document.addEventListener('click', (e) => {
            const target = e.target;

            // Abrir modal de Inscrição
            const openInscriptionBtn = target.closest('.js-open-inscription-modal');
            if (openInscriptionBtn) {
                const title = openInscriptionBtn.getAttribute('data-title');
                const modalTitle = inscriptionModal.querySelector('#inscription-modal-title');
                if (modalTitle) modalTitle.textContent = title;
                openModal(inscriptionModal);
            }

            // Abrir modal de História
            const openHistoryBtn = target.closest('.js-open-history-modal');
            if (openHistoryBtn) {
                openModal(historyModal);
            }

            // Fechar modais
            if (
                target.matches('.js-close-modal, .js-close-history-modal, .modal__overlay') ||
                target.closest('.js-close-modal, .js-close-history-modal')
            ) {
                const modalToClose = target.closest('.modal') || document.querySelector('.modal.is-open');
                closeModal(modalToClose);
            }
        });

        // Lógica de submissão do formulário de inscrição
        const inscriptionForm = inscriptionModal ? inscriptionModal.querySelector('.modal__form') : null;
        if (inscriptionForm) {
            inscriptionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Inscrição enviada com sucesso! Em breve, a secretaria entrará em contato.');
                closeModal(inscriptionModal);
                inscriptionForm.reset();
            });
        }
    };

    // ================== INICIALIZAÇÃO DE TODOS OS MÓDULOS ==================
    setupMobileNavigation();
    setupSlider();
    setupHeaderScrollEffect();
    setupScrollSpy();
    setupModals();
});