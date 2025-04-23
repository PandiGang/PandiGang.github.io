// Archivo para funcionalidades dinámicas adicionales

// Función para crear un efecto de partículas con el logo
function createParticleEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Configurar el canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.7';
    
    document.body.appendChild(canvas);
    
    // Cargar la imagen del logo
    const logoImg = new Image();
    logoImg.src = 'images/logo.jpg';
    
    // Clase para las partículas
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 15 + 5;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = Math.random() * 0.02 - 0.01;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            
            // Rebote en los bordes
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            ctx.drawImage(logoImg, -this.size/2, -this.size/2, this.size, this.size);
            ctx.restore();
        }
    }
    
    // Crear partículas
    const particles = [];
    const particleCount = 15; // Número de partículas
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Función de animación
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    // Iniciar animación cuando la imagen esté cargada
    logoImg.onload = function() {
        animate();
    };
    
    // Ajustar el canvas cuando cambia el tamaño de la ventana
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Función para crear un reproductor de música personalizado
function createCustomMusicPlayer() {
    // Crear el elemento del reproductor
    const playerContainer = document.createElement('div');
    playerContainer.classList.add('custom-player');
    playerContainer.innerHTML = `
        <div class="player-controls">
            <button class="player-button play-pause">
                <i class="fas fa-play"></i>
            </button>
            <div class="player-progress">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <div class="time-display">0:00 / 3:45</div>
            </div>
            <button class="player-button volume">
                <i class="fas fa-volume-up"></i>
            </button>
        </div>
        <div class="player-info">
            <div class="track-info">
                <span class="track-name">Mambo Mario V1</span>
                <span class="artist-name">Pandi Gang</span>
            </div>
        </div>
    `;
    
    // Estilos para el reproductor
    const style = document.createElement('style');
    style.textContent = `
        .custom-player {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: rgba(44, 62, 80, 0.9);
            color: white;
            border-radius: 10px;
            padding: 15px;
            width: 300px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 100;
            transform: translateY(120%);
            transition: transform 0.5s ease;
        }
        
        .custom-player.active {
            transform: translateY(0);
        }
        
        .player-controls {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
        }
        
        .player-button {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.1);
            transition: background-color 0.3s;
        }
        
        .player-button:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
        
        .player-progress {
            flex: 1;
        }
        
        .progress-bar {
            height: 5px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 5px;
            cursor: pointer;
        }
        
        .progress-fill {
            height: 100%;
            width: 30%;
            background-color: #e67e22;
            border-radius: 5px;
        }
        
        .time-display {
            font-size: 0.8rem;
            text-align: right;
        }
        
        .player-info {
            display: flex;
            align-items: center;
        }
        
        .track-info {
            display: flex;
            flex-direction: column;
        }
        
        .track-name {
            font-weight: bold;
        }
        
        .artist-name {
            font-size: 0.8rem;
            opacity: 0.8;
        }
        
        .player-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #e67e22;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(230, 126, 34, 0.3);
            z-index: 101;
            transition: transform 0.3s;
        }
        
        .player-toggle:hover {
            transform: scale(1.1);
        }
    `;
    
    document.head.appendChild(style);
    
    // Crear botón para mostrar/ocultar el reproductor
    const playerToggle = document.createElement('div');
    playerToggle.classList.add('player-toggle');
    playerToggle.innerHTML = '<i class="fas fa-music"></i>';
    
    // Añadir elementos al DOM
    document.body.appendChild(playerContainer);
    document.body.appendChild(playerToggle);
    
    // Funcionalidad para mostrar/ocultar el reproductor
    playerToggle.addEventListener('click', function() {
        playerContainer.classList.toggle('active');
        
        if (playerContainer.classList.contains('active')) {
            playerToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            playerToggle.innerHTML = '<i class="fas fa-music"></i>';
        }
    });
    
    // Simular reproducción al hacer clic en play
    const playPauseBtn = playerContainer.querySelector('.play-pause');
    let isPlaying = false;
    
    playPauseBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            // Aquí se reproduciría la música real
            window.open('https://open.spotify.com/intl-es/album/5z3VjoqA1DAEKwV8UQp0Hp', '_blank');
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
}

// Función para añadir un efecto de desplazamiento suave
function enhanceSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcular la posición de desplazamiento
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Animación de desplazamiento suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Función para añadir un efecto de paralaje
function addParallaxEffect() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Calcular la posición relativa
            if (scrollPosition > sectionTop - window.innerHeight && 
                scrollPosition < sectionTop + sectionHeight) {
                const speed = section.getAttribute('data-speed') || 0.2;
                const yPos = (scrollPosition - sectionTop) * speed;
                
                section.style.backgroundPositionY = `${yPos}px`;
            }
        });
    });
    
    // Añadir atributos de velocidad a las secciones
    document.querySelector('.hero').setAttribute('data-speed', '0.5');
    document.querySelector('.about-section').setAttribute('data-speed', '0.3');
}

// Inicializar todas las funcionalidades cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar el efecto de partículas después de 2 segundos
    setTimeout(createParticleEffect, 2000);
    
    // Crear el reproductor de música personalizado
    createCustomMusicPlayer();
    
    // Mejorar el desplazamiento suave
    enhanceSmoothScrolling();
    
    // Añadir efecto de paralaje
    addParallaxEffect();
});
