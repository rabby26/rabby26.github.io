document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    function toggleMenu() {
        mobileMenuOverlay.classList.toggle('open');
        document.body.style.overflow = document.body.style.overflow === 'hidden' ? '' : 'hidden';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Trigger slightly earlier for a snappy feel
        
        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            
            if(revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Trigger once on load

    // --- About Section Read More Toggle ---
    const aboutToggleBtn = document.getElementById('aboutToggleBtn');
    const aboutExtended = document.getElementById('aboutExtended');
    const aboutDots = document.getElementById('aboutDots');

    if (aboutToggleBtn && aboutExtended && aboutDots) {
        aboutToggleBtn.addEventListener('click', () => {
            if (aboutExtended.style.display === 'block') {
                aboutExtended.style.display = 'none';
                aboutDots.style.display = 'inline';
                aboutToggleBtn.innerHTML = 'Read More <i class="ph ph-caret-down" style="margin-left: 0.3rem;"></i>';
            } else {
                aboutExtended.style.display = 'block';
                aboutDots.style.display = 'none';
                aboutToggleBtn.innerHTML = 'Read Less <i class="ph ph-caret-up" style="margin-left: 0.3rem;"></i>';
            }
        });
    }

    // --- Contact Form Modal ---
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (contactForm && successModal && closeModalBtn) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    successModal.classList.add('open');
                    contactForm.reset();
                } else {
                    alert("Oops! There was a problem submitting your message.");
                }
            } catch (error) {
                alert("Oops! There was a problem submitting your message.");
            }
        });

        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('open');
        });

        // Close modal if clicked outside of the content box
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('open');
            }
        });
    }
});
