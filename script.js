// Animações de scroll reveal mais dinâmicas
document.addEventListener('DOMContentLoaded', function() {
    
    // Configuração do Intersection Observer com configurações otimizadas
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    // Observer principal para elementos scroll-reveal
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adicionar classe revealed com pequeno delay para efeito mais suave
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, 100);
                
                // Parar de observar o elemento após a animação
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos os elementos com classes de animação
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-delay-1, .scroll-reveal-delay-2, .scroll-reveal-delay-3');
    revealElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scroll melhorado para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação do logo no scroll (corrigida para não interferir)
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateLogo() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const logo = document.querySelector('.logo-fixed');
        
        if (logo && window.innerWidth > 600) {
            if (scrollTop > 100) {
                logo.style.transform = 'scale(0.85)';
                logo.style.opacity = '0.95';
            } else {
                logo.style.transform = 'scale(1)';
                logo.style.opacity = '1';
            }
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }

    // Otimização de performance para scroll
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateLogo);
            ticking = true;
        }
    });

    // Animações mais dinâmicas nos cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        // Adicionar delay baseado no índice para efeito cascata
        card.style.transitionDelay = `${index * 0.1}s`;
        
        // Efeitos de hover melhorados
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
    });

    // Animação dos ícones nos cards
    const cardIcons = document.querySelectorAll('.card-icon');
    cardIcons.forEach(icon => {
        const card = icon.closest('.card');
        
        card.addEventListener('mouseenter', function() {
            icon.style.transform = 'scale(1.15) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Animação dos itens de contato
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
        
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(-5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Efeito de digitação no título principal (mais suave)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid #8bc34a';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 60);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1500);
            }
        };
        
        // Iniciar após animação inicial
        setTimeout(typeWriter, 1500);
    }

    // Animação de entrada mais suave para o botão CTA
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efeito parallax sutil e otimizado
    let parallaxTicking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        parallaxTicking = false;
    }

    window.addEventListener('scroll', function() {
        if (!parallaxTicking) {
            requestAnimationFrame(updateParallax);
            parallaxTicking = true;
        }
    });

    // Animação de entrada para seções quando ficam visíveis
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        sectionObserver.observe(section);
    });

    // Melhorar a animação do WhatsApp
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.15) rotate(5deg)';
        });
        
        whatsappFloat.addEventListener('mouseleave', function() {
            this.style.animation = 'pulse 3s infinite';
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Preloader simples e elegante
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            window.scrollTo(0, 0);
        }, 200);
    });

    // Adicionar efeito de ondulação nos botões
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    // Aplicar efeito ripple aos botões
    ctaButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // CSS para o efeito ripple (adicionar dinamicamente)
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn-primary {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Detectar dispositivos touch para otimizar animações
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Reduzir animações em dispositivos touch para melhor performance
        const touchStyle = document.createElement('style');
        touchStyle.textContent = `
            .touch-device .card:hover {
                transform: translateY(-8px) scale(1.01);
            }
            
            .touch-device .contact-item:hover {
                transform: translateY(-3px);
            }
        `;
        document.head.appendChild(touchStyle);
    }
});

// Função para reiniciar animações (útil para desenvolvimento)
function restartAnimations() {
    const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-delay-1, .scroll-reveal-delay-2, .scroll-reveal-delay-3');
    elements.forEach(el => {
        el.classList.remove('revealed');
        setTimeout(() => {
            el.classList.add('revealed');
        }, 100);
    });
}

// Disponibilizar função globalmente para debug
window.restartAnimations = restartAnimations;
