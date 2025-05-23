// Funcionalidad para el menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav a');

    // Toggle del menú móvil
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Header sticky con efecto de scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animación de elementos al hacer scroll
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
            else {
                section.style.opacity = '0';
            }
        });
    };

    // Initiallize animations
    sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Run animation on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Integrate with platforms
    const albumCover = document.querySelector('.album-cover');
    const playOverlay = document.querySelector('.play-overlay');
    
    // Play on spotify
    albumCover.addEventListener('click', function() {
        window.open('https://open.spotify.com/intl-es/album/5z3VjoqA1DAEKwV8UQp0Hp', '_blank');
    });

    // Hover effect for platforms
    const platformLinks = document.querySelectorAll('.platform-link');
    platformLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Contact form
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // TODO: send message
        
        const formData = new FormData(contactForm);
        let formValues = {};
        
        for (let [key, value] of formData.entries()) {
            formValues[key] = value;
        }
        
        // Clean form
        contactForm.reset();
        
        // Show message
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.textContent = 'Message transmitted through the aeons! We shall reach out to you when the stars align with our destiny';
        successMessage.style.color = '#2ecc71';
        successMessage.style.padding = '1rem';
        successMessage.style.marginTop = '1rem';
        successMessage.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
        successMessage.style.borderRadius = '5px';
        
        contactForm.parentNode.appendChild(successMessage);
        
        // Delete message after timeout
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });

    // Mossaic effect
    const createMosaicAnimation = function() {
        const body = document.body;
        const bodyBefore = window.getComputedStyle(body, '::before');
        
        let position = 0;
        const speed = 0.2; // Velocidad de la animación
        
        function animateMosaic() {
            position += speed;
            document.documentElement.style.setProperty('--mosaic-position', position + 'px');
            requestAnimationFrame(animateMosaic);
        }
        
        // Add css variable
        document.documentElement.style.setProperty('--mosaic-position', '0px');
        
        // Update style of pseudo-element
        const style = document.createElement('style');
        style.textContent = `
            body::before {
                background-position: var(--mosaic-position) var(--mosaic-position);
            }
        `;
        document.head.appendChild(style);
        
        // Init animation
        animateMosaic();
    };
    
    // Init animation
    createMosaicAnimation();
});

// Función para reproducir música desde diferentes plataformas
function playMusic(platform) {
    const platforms = {
        'spotify': 'https://open.spotify.com/intl-es/album/5z3VjoqA1DAEKwV8UQp0Hp',
        'apple': 'https://music.apple.com/us/album/mambo-mario-v1-single/1809479578',
        'deezer': 'https://www.deezer.com/es/album/744663741',
        'amazon': 'https://music.amazon.es/albums/B0F5M8V9GQ',
        'youtube': 'https://music.youtube.com/playlist?list=OLAK5uy_nzpA_Bfhpq572ebeiPDpCqw80F_Kf92nw'
    };
    
    if (platforms[platform]) {
        window.open(platforms[platform], '_blank');
    }
}
