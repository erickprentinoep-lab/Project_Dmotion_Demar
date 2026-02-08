document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-dark/80', 'backdrop-blur-md', 'py-4', 'border-b', 'border-white/5');
            navbar.classList.remove('py-6', 'bg-transparent');
        } else {
            navbar.classList.remove('bg-dark/80', 'backdrop-blur-md', 'py-4', 'border-b', 'border-white/5');
            navbar.classList.add('py-6', 'bg-transparent');
        }
    });

    // Reveal on Scroll
    const revealElements = document.querySelectorAll('section, .group');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
