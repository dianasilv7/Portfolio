// ==================== BOOT SEQUENCE ====================
window.addEventListener('DOMContentLoaded', function() {
  const bootScreen = document.getElementById('boot-screen');
  const loginScreen = document.getElementById('login-screen');
  
  // Após 3.5 segundos, inicia transição para login
  setTimeout(() => {
    bootScreen.classList.add('fade-out');
    
    setTimeout(() => {
      bootScreen.style.display = 'none';
      loginScreen.classList.add('active');
      updateTime();
      updateMenuTime();
      startClocks();
    }, 800);
  }, 3500);
});

// ==================== LOGIN ====================
function loginUser() {
  const loginScreen = document.getElementById('login-screen');
  const desktop = document.getElementById('desktop');
  const passwordInput = document.getElementById('passwordInput');
  
  // Qualquer tecla faz login (simulação)
  loginScreen.classList.add('fade-out');
  
  setTimeout(() => {
    loginScreen.style.display = 'none';
    desktop.classList.add('active');
  }, 800);
}

// Enter key para login
document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.getElementById('passwordInput');
  
  if (passwordInput) {
    passwordInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        loginUser();
      }
    });
    
    // Auto-focus no campo
    setTimeout(() => {
      passwordInput.focus();
    }, 4500);
  }
});

// ==================== RELÓGIO ====================
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const timeString = `${hours}:${minutes}`;
  
  const currentTimeEl = document.getElementById('current-time');
  if (currentTimeEl) {
    currentTimeEl.textContent = timeString;
  }
}

function updateMenuTime() {
  const now = new Date();
  const options = { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  const timeString = now.toLocaleDateString('pt-PT', options);
  
  const menuTimeEl = document.getElementById('menu-time');
  if (menuTimeEl) {
    menuTimeEl.textContent = timeString;
  }
}

function startClocks() {
  setInterval(() => {
    updateTime();
    updateMenuTime();
  }, 1000);
}

// ==================== WINDOW CONTROLS ====================
document.addEventListener('DOMContentLoaded', function() {
  // Botão Close
  const closeBtn = document.querySelector('.control.close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      const window = document.getElementById('portfolio-window');
      window.style.animation = 'windowClose 0.3s ease forwards';
      
      setTimeout(() => {
        window.style.display = 'none';
      }, 300);
    });
  }
  
  // Botão Minimize
  const minimizeBtn = document.querySelector('.control.minimize');
  if (minimizeBtn) {
    minimizeBtn.addEventListener('click', function() {
      const window = document.getElementById('portfolio-window');
      window.style.animation = 'windowMinimize 0.4s ease forwards';
      
      setTimeout(() => {
        window.style.display = 'none';
      }, 400);
    });
  }
  
  // Botão Maximize (mobile-friendly)
const maximizeBtn = document.querySelector('.control.maximize');
if (maximizeBtn) {
  let isMaximized = false;

  maximizeBtn.addEventListener('click', function () {
    const windowEl = document.getElementById('portfolio-window');

    if (!isMaximized) {
      windowEl.style.width = '100vw';
      windowEl.style.height = '100vh';
      windowEl.style.maxWidth = '100vw';
      windowEl.style.maxHeight = '100vh';
      windowEl.style.borderRadius = '0';
      isMaximized = true;
    } else {
      windowEl.style.width = '';
      windowEl.style.height = '';
      windowEl.style.maxWidth = '';
      windowEl.style.maxHeight = '';
      windowEl.style.borderRadius = '';
      isMaximized = false;
    }
  });
}

// Adicionar animações de fechamento ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
  @keyframes windowClose {
    to {
      opacity: 0;
      transform: scale(0.8);
    }
  }
  
  @keyframes windowMinimize {
    to {
      opacity: 0;
      transform: scale(0.1) translateY(500px);
    }
  }
`;
document.head.appendChild(style);
});

// ==================== DOCK INTERACTIONS ====================
document.addEventListener('DOMContentLoaded', function() {
  const dockItems = document.querySelectorAll('.dock-item');
  
  dockItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      // Remove active de todos
      dockItems.forEach(i => i.classList.remove('active'));
      
      // Adiciona active ao clicado
      this.classList.add('active');
      
      const title = this.getAttribute('title');
      
      // Contactos - abre modal contactos
      if (title === 'Contactos') {
        openModal('contactos');
        return;
      }
      
      // Sobre Mim - abre modal sobre
      if (title === 'Sobre Mim') {
        openModal('sobre');
        return;
      }
      
      // Portfolio - mostra a janela principal
      if (title === 'Portfolio') {
        const window = document.getElementById('portfolio-window');
        window.style.display = 'block';
        window.style.animation = 'windowOpen 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        return;
      }
      
      // Galeria - abre modal projetos
      if (title === 'Galeria') {
        openModal('projetos');
        return;
      }
    });
  });
});

// ==================== LANGUAGE TOGGLE ====================
document.addEventListener('DOMContentLoaded', function() {
  const languageToggle = document.getElementById('language-toggle');
  let currentLanguage = 'pt';
  
  if (languageToggle) {
    languageToggle.addEventListener('click', function() {
      // Toggle between PT and ENG
      if (currentLanguage === 'pt') {
        currentLanguage = 'eng';
        this.setAttribute('title', 'Switch Language');
        changeLanguage('eng');
      } else {
        currentLanguage = 'pt';
        this.setAttribute('title', 'Mudar Idioma');
        changeLanguage('pt');
      }
    });
  }
});

function changeLanguage(lang) {
  const texts = {
    pt: {
      'portfolio-title': 'Portfólio',
      'sobre-title': 'Sobre Mim',
      'contactos-title': 'Contactos',
      'projetos-title': 'Projetos',
      'skills-title': 'Competências',
      'portfolio-description': 'Website',
      'sobre-description': 'Mais sobre mim',
      'contactos-description': 'Entrar em contacto',
      'projetos-description': 'Trabalhos realizados',
      'skills-description': 'Competências'
    },
    eng: {
      'portfolio-title': 'Portfolio',
      'sobre-title': 'About Me',
      'contactos-title': 'Contact',
      'projetos-title': 'Projects',
      'skills-title': 'Skills',
      'portfolio-description': 'Website',
      'sobre-description': 'More about me',
      'contactos-description': 'Get in touch',
      'projetos-description': 'Work done',
      'skills-description': 'Competencies'
    }
  };
  
  // Change page title
  if (lang === 'eng') {
    document.title = 'Portfolio | Diana Silva';
  } else {
    document.title = 'Portfólio | Diana Silva';
  }
  
  // Update modal titles and content
  const currentTexts = texts[lang];
  Object.keys(currentTexts).forEach(key => {
    const element = document.querySelector(`[data-${key}]`);
    if (element) {
      element.textContent = currentTexts[key];
    }
  });
}

// ==================== MENU BAR INTERACTIONS ====================
document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-item');
  
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove active de todos
      menuItems.forEach(i => i.classList.remove('active'));
      
      // Adiciona active ao clicado (exceto o logo)
      if (!this.classList.contains('logo-text')) {
        this.classList.add('active');
      }
    });
  });
});

if (window.innerWidth < 768) {
  setTimeout(() => {
    loginUser();
  }, 1500);
}

// Animação de abertura da janela// ==================== DRAG WINDOW ====================
let highestZIndex = 1000; // Começa no z-index base do desktop

function makeWindowDraggable(windowEl) {
  const header = windowEl.querySelector('.window-header');
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.style.cursor = 'grab';

  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - windowEl.offsetLeft;
    offsetY = e.clientY - windowEl.offsetTop;

    // Z-index dinâmico: janela ativa sempre acima
    highestZIndex++;
    windowEl.style.zIndex = highestZIndex;

    header.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    windowEl.style.left = `${e.clientX - offsetX}px`;
    windowEl.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    header.style.cursor = 'grab';
  });

  // Para toque mobile (opcional)
  header.addEventListener('touchstart', (e) => {
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - windowEl.offsetLeft;
    offsetY = touch.clientY - windowEl.offsetTop;

    highestZIndex++;
    windowEl.style.zIndex = highestZIndex;
  });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    windowEl.style.left = `${touch.clientX - offsetX}px`;
    windowEl.style.top = `${touch.clientY - offsetY}px`;
  });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });
}

// ==================== INICIAR ARRASTO ====================
const portfolioWindow = document.getElementById('portfolio-window');
portfolioWindow.style.position = 'absolute';
portfolioWindow.style.left = '50%';
portfolioWindow.style.top = '50%';
portfolioWindow.style.transform = 'translate(-50%, -50%)';

makeWindowDraggable(portfolioWindow);

// ==================== PORTFOLIO MODALS FUNCTIONALITY ====================
document.addEventListener('DOMContentLoaded', function() {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const modals = document.querySelectorAll('.modal');
  const modalCloses = document.querySelectorAll('.modal-close');
  
  // Portfolio item click handlers
  portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
      const section = this.getAttribute('data-section');
      openModal(section);
    });
  });
  
  // Modal close handlers
  modalCloses.forEach(close => {
    close.addEventListener('click', function() {
      const modalType = this.getAttribute('data-modal');
      closeModal(modalType);
    });
  });
  
  // Close modal when clicking outside
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        const modalId = modal.id;
        const modalType = modalId.replace('modal-', '');
        closeModal(modalType);
      }
    });
  });
  
  // ESC key to close modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) {
        const modalId = activeModal.id;
        const modalType = modalId.replace('modal-', '');
        closeModal(modalType);
      }
    }
  });
  
  // Contact form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector('textarea').value;
      
      // Simple validation
      if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert('Mensagem enviada com sucesso! Obrigada pelo contacto.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        closeModal('contactos');
      }, 1500);
    });
  }
});

// Open modal function
function openModal(section) {
  const modal = document.getElementById(`modal-${section}`);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Special handling for skills modal - animate skill bars
    if (section === 'skills') {
      setTimeout(() => {
        animateSkillBars();
      }, 300);
    }
  }
}

// Close modal function
function closeModal(section) {
  const modal = document.getElementById(`modal-${section}`);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    bar.style.setProperty('--progress-width', progress + '%');
  });
}

// Enhanced portfolio item interactions
document.addEventListener('DOMContentLoaded', function() {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach(item => {
    // Add ripple effect on click
    item.addEventListener('click', function(e) {
      const ripple = document.createElement('div');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ==================== SOCIAL LINKS ALERTS ====================
// Adicionar alertas para LinkedIn e TikTok
document.addEventListener('DOMContentLoaded', function() {
  // Selecionar todos os links sociais
  const socialLinks = document.querySelectorAll('.social-link');
  
    socialLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const linkText = this.textContent.trim();
        
        // Apenas LinkedIn mostra alerta
        if (linkText === 'LinkedIn') {
          e.preventDefault();
          alert('Esta funcionalidade ainda não está disponível');
        }
        // GitHub, Instagram e TikTok funcionam normalmente
        // (não fazer nada, deixa seguir o href)
      });
    });
});


