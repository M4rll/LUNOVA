// ===== ANIMAÇÕES AVANÇADAS =====
class AdvancedAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initTypewriter();
        this.initCounterAnimation();
        this.initParallax();
        this.initScrollAnimations();
    }

    // Efeito máquina de escrever
    initTypewriter() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            element.style.visibility = 'visible';
            
            setTimeout(() => {
                this.typeWriter(element, text, 0, 50);
            }, index * 1000);
        });
    }

    typeWriter(element, text, i, speed) {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(() => this.typeWriter(element, text, i, speed), speed);
        } else {
            // Manter cursor piscando
            element.style.borderRight = '2px solid transparent';
        }
    }

    // Animação de contadores
    initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number, .sobre-stat .stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    // Efeito parallax
    initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Animações no scroll
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.stagger-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                        entry.target.classList.add('animate-in');
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    }

    // Efeito de digitação em tempo real
    createRealTimeTypewriter(element, texts, speed = 100) {
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, 1000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? speed / 2 : speed);
            }
        }
        
        type();
    }
}

// ===== INICIALIZAÇÃO DAS ANIMAÇÕES =====
document.addEventListener('DOMContentLoaded', function() {
    new AdvancedAnimations();
    
    // Exemplo de uso do typewriter em tempo real
    const dynamicText = document.getElementById('dynamicText');
    if (dynamicText) {
        const texts = [
            'conhecimento que transforma',
            'resultados extraordinários', 
            'crescimento acelerado',
            'sucesso garantido'
        ];
        
        // new AdvancedAnimations().createRealTimeTypewriter(dynamicText, texts, 100);
    }
});

// ===== EFEITOS DE PARTICULAS AVANÇADOS =====
function createAdvancedParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const container = document.querySelector('.hero-background');
    
    if (!container) return;
    
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    
    container.appendChild(canvas);
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.alpha = Math.random() * 0.5 + 0.2;
            this.color = `rgba(59, 130, 246, ${this.alpha})`;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Criar partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Redimensionar canvas
    window.addEventListener('resize', () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    });
}

// Inicializar partículas avançadas
// document.addEventListener('DOMContentLoaded', createAdvancedParticles);
