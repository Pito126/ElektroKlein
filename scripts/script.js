document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll pro všechny anchor odkazy
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Lazy loading pro obrázky (pro lepší výkon)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));

    // Particles efekt
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#DC3545' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#DC3545', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }

    // Lightbox modal funkce (globální pro všechny stránky)
window.openModal = function(src, pdfPath) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const modalFooter = document.getElementById('modalFooter');
    if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = src;
        if (pdfPath) {
            modalFooter.style.display = 'block';
            document.getElementById('fullViewBtn').onclick = function() {
                window.open(pdfPath, '_blank');
            };
        } else {
            modalFooter.style.display = 'none';
        }
    }
};

    window.closeModal = function() {
        const modal = document.getElementById('imageModal');
        if (modal) {
            modal.style.display = 'none';
        }
    };

    // Zavření modálu klikem mimo obrázek
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('imageModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Zavření modálu ESC klávesou
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});