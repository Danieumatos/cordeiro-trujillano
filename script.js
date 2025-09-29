// Landing Page Cordeiro & Trujillano - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CONFIGURAÇÕES GERAIS =====
    
    // Configuração do Intersection Observer para animações
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    // Observer para elementos scroll-reveal
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos os elementos com classes de animação
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-delay-1, .scroll-reveal-delay-2, .scroll-reveal-delay-3');
    revealElements.forEach(element => {
        observer.observe(element);
    });

    // ===== NAVEGAÇÃO SUAVE =====
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== MENU MOBILE =====
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const headerCta = document.querySelector('.header-cta');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            headerCta.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Fechar menu mobile ao clicar em link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            headerCta.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // ===== FAQ ACCORDION =====
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const answer = this.nextElementSibling;
            
            // Fechar todas as outras perguntas
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherQuestion.nextElementSibling.classList.remove('active');
                }
            });
            
            // Toggle da pergunta atual
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                answer.classList.remove('active');
            } else {
                this.setAttribute('aria-expanded', 'true');
                answer.classList.add('active');
            }
        });
    });

    // ===== FORMULÁRIO DE CONTATO =====
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(this);
            const nome = formData.get('nome');
            const email = formData.get('email');
            const telefone = formData.get('telefone');
            const mensagem = formData.get('mensagem');
            
            // Criar mensagem para WhatsApp
            const whatsappMessage = `Olá! Meu nome é ${nome}.

📧 E-mail: ${email}
📞 Telefone: ${telefone}

Mensagem: ${mensagem}

Gostaria de agendar uma consulta sobre meu caso.`;
            
            // Codificar mensagem para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/5511943596470?text=${encodedMessage}`;
            
            // Abrir WhatsApp
            window.open(whatsappURL, '_blank' );
            
            // Mostrar mensagem de sucesso
            showSuccessMessage();
            
            // Limpar formulário
            this.reset();
        });
    }
    
    // Função para mostrar mensagem de sucesso
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                </svg>
                <span>Mensagem enviada! Você será redirecionado para o WhatsApp.</span>
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // ===== HEADER SCROLL EFFECT =====
    
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // ===== ANIMAÇÕES AVANÇADAS =====
    
    // Animação dos cards de serviço
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.zIndex = '10';
            
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
            
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Animação dos membros da equipe
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.transitionDelay = `${index * 0.15}s`;
        
        member.addEventListener('mouseenter', function() {
            const photo = this.querySelector('.photo-placeholder');
            if (photo) {
                photo.style.transform = 'scale(1.1) rotate(-5deg)';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            const photo = this.querySelector('.photo-placeholder');
            if (photo) {
                photo.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // ===== EFEITOS ESPECIAIS =====
    
    // Efeito de digitação no título principal
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
                setTimeout(typeWriter, 80);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 2000);
            }
        };
        
        setTimeout(typeWriter, 1500);
    }

    // Efeito parallax sutil
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

    // ===== BOTÕES INTERATIVOS =====
    
    // Efeito ripple nos botões
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
    const buttons = document.querySelectorAll('.btn-primary, .btn-header');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===== WHATSAPP FLOAT =====
    
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

    // ===== VALIDAÇÃO DE FORMULÁRIO =====
    
    // Validação em tempo real
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remover classes de erro anteriores
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Validações específicas
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório.';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, insira um e-mail válido.';
            }
        } else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\(\)\-\+]+$/;
            if (!phoneRegex.test(value) || value.length < 10) {
                isValid = false;
                errorMessage = 'Por favor, insira um telefone válido.';
            }
        }
        
        // Mostrar erro se inválido
        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        }
        
        return isValid;
    }

    // ===== INICIALIZAÇÃO =====
    
    // Preloader e inicialização suave
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            window.scrollTo(0, 0);
        }, 200);
    });

    // Detectar dispositivos touch
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    // Log de inicialização
    console.log('🚀 Landing page Cordeiro & Trujillano carregada com sucesso!');
    console.log('📱 Dispositivo touch:', 'ontouchstart' in window ? 'Sim' : 'Não');
    console.log('📏 Viewport:', window.innerWidth + 'x' + window.innerHeight);
});

// ===== CSS DINÂMICO =====

// Adicionar estilos dinâmicos
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    /* Estilos para menu mobile */
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-menu.active .nav-links {
            flex-direction: column;
            gap: 15px;
        }
        
        .header-cta.active {
            display: block;
            margin-top: 20px;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .menu-open {
            overflow: hidden;
        }
    }
    
    /* Header scrolled effect */
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 25px rgba(0, 0, 0, 0.15);
    }
    
    /* Efeito ripple */
    .btn-primary, .btn-header {
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
    
    /* Mensagem de sucesso */
    .success-message {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #8bc34a, #689f38);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(139, 195, 74, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
    }
    
    .success-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    /* Validação de formulário */
    .form-group input.error,
    .form-group textarea.error {
        border-color: #e74c3c;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
    }
    
    .error-message {
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 5px;
    }
    
    /* Otimizações para dispositivos touch */
    .touch-device .service-card:hover,
    .touch-device .team-member:hover {
        transform: translateY(-5px) scale(1.01);
    }
    
    .touch-device .btn-primary:hover,
    .touch-device .btn-header:hover {
        transform: translateY(-2px) scale(1.02);
    }
`;

document.head.appendChild(dynamicStyles);

// ===== FUNÇÕES UTILITÁRIAS =====

// Função para debug (disponível no console)
window.debugLandingPage = function() {
    console.log('=== DEBUG LANDING PAGE ===');
    console.log('Elementos scroll-reveal:', document.querySelectorAll('.scroll-reveal').length);
    console.log('FAQ items:', document.querySelectorAll('.faq-item').length);
    console.log('Service cards:', document.querySelectorAll('.service-card').length);
    console.log('Team members:', document.querySelectorAll('.team-member').length);
    console.log('Formulário presente:', !!document.getElementById('contactForm'));
    console.log('WhatsApp float presente:', !!document.querySelector('.whatsapp-float'));
};

// Função para reiniciar animações
window.restartAnimations = function() {
    const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-delay-1, .scroll-reveal-delay-2, .scroll-reveal-delay-3');
    elements.forEach(el => {
        el.classList.remove('revealed');
        setTimeout(() => {
            el.classList.add('revealed');
        }, 100);
    });
    console.log('Animações reiniciadas!');
};
