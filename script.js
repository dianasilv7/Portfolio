// ==================== BOOT SEQUENCE ====================
let currentLanguage = 'pt';

const statusMessages = {
  pt: {
    formAlert: 'Por favor, preencha todos os campos.',
    sendingText: 'Enviando...',
    successMessage: 'Mensagem enviada com sucesso! Obrigada pelo contacto.',
    featureNotAvailable: 'Esta funcionalidade ainda não está disponível'
  },
  eng: {
    formAlert: 'Please fill in all fields.',
    sendingText: 'Sending...',
    successMessage: 'Message sent successfully! Thank you for contacting.',
    featureNotAvailable: 'This feature is not yet available'
  }
};

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
});

// ==================== DOCK INTERACTIONS ====================
document.addEventListener('DOMContentLoaded', function() {
  const dockItems = document.querySelectorAll('.dock-item');
  
  dockItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      // Skip language toggle
      if (this.id === 'language-toggle') {
        return;
      }
      
      // Remove active de todos
      dockItems.forEach(i => i.classList.remove('active'));
      
      // Adiciona active ao clicado
      this.classList.add('active');
      
      // Usar data attributes ao invés de title (que muda com tradução)
      if (this.hasAttribute('data-dock-contact')) {
        openModal('contactos');
        return;
      }
      
      if (this.hasAttribute('data-dock-about')) {
        openModal('sobre');
        return;
      }
      
      if (this.hasAttribute('data-dock-portfolio')) {
        const window = document.getElementById('portfolio-window');
        window.style.display = 'block';
        window.style.animation = 'windowOpen 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        return;
      }
      
      if (this.hasAttribute('data-dock-gallery')) {
        openModal('projetos');
        return;
      }
    });
  });
});

// ==================== LANGUAGE TOGGLE ====================
document.addEventListener('DOMContentLoaded', function() {
  const languageToggle = document.getElementById('language-toggle');
  
  if (languageToggle) {
    languageToggle.addEventListener('click', function() {
      // Alternar entre PT e ENG
      if (currentLanguage === 'pt') {
        currentLanguage = 'eng';
        this.textContent = 'PT';
        this.setAttribute('title', 'Mudar para português');
        changeLanguage('eng');
      } else {
        currentLanguage = 'pt';
        this.textContent = 'ENG';
        this.setAttribute('title', 'Mudar para inglês');
        changeLanguage('pt');
      }
    });
  }
});

function changeLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang === 'eng' ? 'en' : 'pt';

  const texts = {
    pt: {
      // Títulos principais
      'portfolio-title': 'Portfólio',
      'sobre-title': 'SOBRE',
      'contactos-title': 'CONTACTOS',
      'projetos-title': 'GALERIA',
      'skills-title': 'APPS',
      
      // Descrições
      'portfolio-description': 'Website',
      'sobre-description': 'Sobre mim',
      'contactos-description': 'Entrar em contacto',
      'projetos-description': 'Fotografias',
      'skills-description': 'Competências',
      
      // Títulos dos modais
      'modal-sobre-title': 'Sobre Mim',
      'modal-projetos-title': 'Fotografias',
      'modal-skills-title': 'Aplicações',
      'modal-contactos-title': 'Contactos',
      
      // Galeria - MANTER SEMPRE EM PORTUGUÊS
      'paisagem-title': 'PAISAGEM',
      'paisagem-subtitle': 'Paisagens',
      'paisagem-description': 'Fotografias de paisagens naturais e cenário urbano.',
      'abstracao-title': 'ABSTRAÇÃO',
      'abstracao-subtitle': 'Abstração',
      'abstracao-description': 'Fotografias abstratas e composições artísticas.',
      'natureza-morta-title': 'NATUREZA MORTA',
      'natureza-morta-subtitle': 'Natureza Morta',
      'natureza-morta-description': 'Fotografias de objetos e natureza morta.',
      'exposicao-title': 'EXPOSIÇÃO',
      'exposicao-subtitle': 'Fotos de Exposições',
      'exposicao-description': 'Registo de exposições e eventos artísticos.',
      
      // Tags da Galeria - MANTER SEMPRE EM PORTUGUÊS
      'paisagem-tag': 'Paisagem',
      'paisagem-natureza': 'Natureza',
      'paisagem-urbano': 'Urbano',
      'abstracao-tag': 'Abstrato',
      'abstracao-artistico': 'Artístico',
      'abstracao-composicoes': 'Composições',
      'natureza-morta-objetos': 'Objetos',
      'natureza-morta-tag': 'Natureza Morta',
      'natureza-morta-composicao': 'Composição',
      'exposicao-exposicoes': 'Exposições',
      'exposicao-eventos': 'Eventos',
      'exposicao-documentacao': 'Documentação',
      
      // Aplicações
      'apps-section-title': 'Software de Design e Edição',
      'apps-description': 'Edição de imagens e design gráfico',
      'affinity-description': 'Suite de design com múltiplas apps',
      'davinci-description': 'Edição de vídeo e pós-produção',
      'illustrator-description': 'Design vectorial e ilustrações',
      
      // Contactos
      'messages-title': 'Mensagens',
      'messages-description': 'para a realização de trabalhos/eventos/projetos...',
      'name-placeholder': 'Nome',
      'email-placeholder': 'Email',
      'message-placeholder': 'Mensagem',
      'send-button': 'Enviar Mensagem',
      'social-title': 'Redes Sociais',
      'direct-contact-title': 'Contacto Direto',
      
      // Websites
      'websites-title': 'Outros Websites',
      'galeria-site-title': 'Galeria',
      'galeria-site-description': 'Portfólio de Fotografia',
      'notebook-site-title': 'The Notebook',
      'notebook-site-description': 'Website promocional para um filme',
      'first-site-title': 'Primeiro Site',
      'first-site-description': 'Primeiro projeto de programação',
      
      // Sobre Mim
      'profile-title': 'Estudante Universitária',
      'name-label': 'Nome:',
      'name-value': 'Diana Silva',
      'age-label': 'Idade:',
      'age-value': '19 anos',
      'location-label': 'Localização:',
      'location-value': 'Porto',
      'languages-label': 'Línguas:',
      'languages-value': 'Português e Inglês',
      'interests-label': 'Interesses:',
      'interests-text': 'Edição, Viagens, Música, Fotografia',
      'education-title': 'Atualmente a Frequentar',
      'university-name': 'Universidade Lusófona',
      'university-period': '2025 - Presente',
      'university-course': 'Curso de Comunicação Audiovisual e Multimédia',
      'bristol-name': 'Escola Bristol',
      'bristol-period': '2019 - Presente',
      'bristol-level': 'Nível C1 de Inglês',
      
      // Níveis de Proficiência
      'proficiency-title': 'Níveis de Proficiência',
      'photoshop-span': 'Photoshop',
      'affinity-span': 'Affinity',
      'davinci-span': 'DaVinci Resolve',
      'illustrator-span': 'Illustrator',
      
      // Atributos alt das imagens - MANTER SEMPRE EM PORTUGUÊS
      'alt-paisagem': 'Paisagem',
      'alt-abstracao': 'Abstração',
      'alt-natureza-morta': 'Natureza Morta',
      'alt-exposicao': 'Exposição',
      
      // Dock items
      'dock-portfolio': 'Portfólio',
      'dock-contact': 'Contacto',
      'dock-gallery': 'Galeria',
      'dock-about': 'Sobre Mim',
      'language-toggle': 'ENG',
      
      // Window title
      'window-title': 'Portfólio — Diana Silva',
      'menu-portfolio': 'Portfólio'
    },
    eng: {
      // Títulos principais
      'portfolio-title': 'Portfolio',
      'sobre-title': 'ABOUT',
      'contactos-title': 'CONTACT',
      'projetos-title': 'GALLERY',
      'skills-title': 'APPS',
      
      // Descrições
      'portfolio-description': 'Website',
      'sobre-description': 'About me',
      'contactos-description': 'Get in touch',
      'projetos-description': 'Photography',
      'skills-description': 'Skills',
      
      // Títulos dos modais
      'modal-sobre-title': 'About Me',
      'modal-projetos-title': 'Photography',
      'modal-skills-title': 'Apps',
      'modal-contactos-title': 'Contact',
      
      // Galeria - English translations when language toggle is active
      'paisagem-title': 'LANDSCAPE',
      'paisagem-subtitle': 'Landscapes',
      'paisagem-description': 'Natural landscapes and urban scenery photography.',
      'abstracao-title': 'ABSTRACTION',
      'abstracao-subtitle': 'Abstraction',
      'abstracao-description': 'Abstract photography and artistic compositions.',
      'natureza-morta-title': 'STILL LIFE',
      'natureza-morta-subtitle': 'Still Life',
      'natureza-morta-description': 'Photography of objects and still life.',
      'exposicao-title': 'EXHIBITION',
      'exposicao-subtitle': 'Exhibition Photos',
      'exposicao-description': 'Recording of exhibitions and artistic events.',
      
      // Gallery Tags - English translations when language toggle is active
      'paisagem-tag': 'Landscape',
      'paisagem-natureza': 'Nature',
      'paisagem-urbano': 'Urban',
      'abstracao-tag': 'Abstract',
      'abstracao-artistico': 'Artistic',
      'abstracao-composicoes': 'Compositions',
      'natureza-morta-objetos': 'Objects',
      'natureza-morta-tag': 'Still Life',
      'natureza-morta-composicao': 'Composition',
      'exposicao-exposicoes': 'Exhibitions',
      'exposicao-eventos': 'Events',
      'exposicao-documentacao': 'Documentation',
      
      // Aplicações
      'apps-section-title': 'Design and Editing Software',
      'apps-description': 'Image editing and graphic design',
      'affinity-description': 'Design suite with multiple apps',
      'davinci-description': 'Video editing and post-production',
      'illustrator-description': 'Vector design and illustrations',
      
      // Contactos
      'messages-title': 'Messages',
      'messages-description': 'for the realization of work/events/projects...',
      'name-placeholder': 'Name',
      'email-placeholder': 'Email',
      'message-placeholder': 'Message',
      'send-button': 'Send Message',
      'social-title': 'Social Networks',
      'direct-contact-title': 'Direct Contact',
      
      // Websites
      'websites-title': 'Other Websites',
      'galeria-site-title': 'Gallery',
      'galeria-site-description': 'Photography Portfolio',
      'notebook-site-title': 'The Notebook',
      'notebook-site-description': 'Promotional website for a movie',
      'first-site-title': 'First Site',
      'first-site-description': 'First programming project',
      
      // Sobre Mim
      'profile-title': 'University Student',
      'name-label': 'Name:',
      'name-value': 'Diana Silva',
      'age-label': 'Age:',
      'age-value': '19 years',
      'location-label': 'Lives:',
      'location-value': 'Porto',
      'languages-label': 'Speaks:',
      'languages-value': 'Portuguese and English',
      'interests-label': 'Hobbies:',
      'interests-text': 'Editing, Traveling, Music, Photography',
      'education-title': 'Currently Attending',
      'university-name': 'Universidade Lusófona',
      'university-period': '2025 - Present',
      'university-course': 'Audiovisual and Multimedia Communication Course',
      'bristol-name': 'Bristol School',
      'bristol-period': '2019 - Present',
      'bristol-level': 'C1 Level in English',
      
      // Níveis de Proficiência
      'proficiency-title': 'Proficiency Levels',
      'photoshop-span': 'Photoshop',
      'affinity-span': 'Affinity',
      'davinci-span': 'DaVinci Resolve',
      'illustrator-span': 'Illustrator',
      
      // Dock items
      'dock-portfolio': 'Portfolio',
      'dock-contact': 'Contact',
      'dock-gallery': 'Gallery',
      'dock-about': 'About',
      'language-toggle': 'PT',
      
      // Window title
      'window-title': 'Portfolio — Diana Silva',
      'menu-portfolio': 'Portfolio',
      
      // Image alt attributes
      'alt-paisagem': 'Landscape',
      'affinity-span': 'Affinity',
      'davinci-span': 'DaVinci Resolve',
      'illustrator-span': 'Illustrator',
      
      // Image alt attributes - English translations when language toggle is active
      'alt-paisagem': 'Landscape',
      'alt-abstracao': 'Abstraction',
      'alt-natureza-morta': 'Still Life',
      'alt-exposicao': 'Exhibition'
    }
  };
  
  // Alterar título da página
  if (lang === 'eng') {
    document.title = 'Portfolio | Diana Silva';
  } else {
    document.title = 'Portfólio | Diana Silva';
  }
  
  // Atualizar títulos e conteúdo dos modais
  const currentTexts = texts[lang];
  Object.keys(currentTexts).forEach(key => {
    document.querySelectorAll(`[data-${key}]`).forEach(element => {
      if (element.hasAttribute('placeholder')) {
        element.setAttribute('placeholder', currentTexts[key]);
      } else if (element.hasAttribute('title')) {
        element.setAttribute('title', currentTexts[key]);
      } else {
        element.textContent = currentTexts[key];
      }
    });
  });
  
  // Atualizar atributos alt das imagens
  Object.keys(currentTexts).forEach(key => {
    if (key.startsWith('alt-')) {
      const element = document.querySelector(`[data-alt-${key.replace('alt-', '')}]`);
      if (element) {
        element.setAttribute('alt', currentTexts[key]);
      }
    }
  });
}

window.addEventListener('DOMContentLoaded', function() {
  changeLanguage(currentLanguage);
});

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

// ==================== DRAG WINDOW ====================
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
      
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector('textarea').value;
      
      if (!name || !email || !message) {
        alert(statusMessages[currentLanguage].formAlert);
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = statusMessages[currentLanguage].sendingText;
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert(statusMessages[currentLanguage].successMessage);
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

// ==================== SOCIAL LINKS ALERTS ====================
// Adicionar alertas para LinkedIn e TikTok
document.addEventListener('DOMContentLoaded', function() {
  // Selecionar todos os links sociais
  const socialLinks = document.querySelectorAll('.social-link');
  
  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const linkText = this.textContent.trim();
      
      // LinkedIn e TikTok mostram alerta
      if (linkText === 'LinkedIn' || linkText === 'TikTok') {
        e.preventDefault();
        alert(statusMessages[currentLanguage].featureNotAvailable);
      }
      // GitHub e Instagram funcionam normalmente
      // (não fazer nada, deixa seguir o href)
    });
  });
});
