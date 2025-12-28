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
      
      // Contacto - abre modal de contactos
      if (title === 'Contacto') {
        openModal('contactos');
        return;
      }
      
      // Sobre Mim - abre modal sobre
      if (title === 'Sobre Mim') {
        openModal('sobre');
        return;
      }
      
      // Portfólio - mostra janela principal
      if (title === 'Portfólio') {
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
      // Alternar entre PT e ENG
      if (currentLanguage === 'pt') {
        currentLanguage = 'eng';
        this.setAttribute('title', 'Switch Language');
        changeLanguage('eng');
      } else {
        currentLanguage = 'pt';
        this.setAttribute('title', 'Change Language');
        changeLanguage('pt');
      }
    });
  }
});

function changeLanguage(lang) {
  const texts = {
    pt: {
      // Títulos principais
      'portfolio-title': 'Portfólio',
      'sobre-title': 'Sobre Mim',
      'contactos-title': 'Contactos',
      'projetos-title': 'Galeria',
      'skills-title': 'Aplicações',
      
      // Descrições
      'portfolio-description': 'Website',
      'sobre-description': 'Mais sobre mim',
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
      'abstracao-description': 'Fotografias abstractas e composições artísticas.',
      'natureza-morta-title': 'NATUREZA MORTA',
      'natureza-morta-subtitle': 'Natureza Morta',
      'natureza-morta-description': 'Fotografias de objectos e natureza morta.',
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
      'proficiency-title': 'Níveis de Proficiência',
      
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
      'websites-title': 'Websites',
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
      'age-value': '18 anos',
      'location-label': 'Localização:',
      'location-value': 'Porto',
      'languages-label': 'Línguas:',
      'languages-value': 'Português e Inglês',
      'interests-label': 'Interesses:',
      'interests-text': 'Edição, Viajar, Ouvir música, Tirar fotos',
      'education-title': 'Actualmente a Frequentar',
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
      
      // Websites
      'websites-title': 'Outros Websites',
      
      // Atributos alt das imagens - MANTER SEMPRE EM PORTUGUÊS
      'alt-paisagem': 'Paisagem',
      'alt-abstracao': 'Abstração',
      'alt-natureza-morta': 'Natureza Morta',
      'alt-exposicao': 'Exposição',
      
      // Alertas
      'form-alert': 'Por favor, preencha todos os campos.',
      'sending-text': 'Enviando...',
      'success-message': 'Mensagem enviada com sucesso! Obrigada pelo contacto.',
      'feature-not-available': 'Esta funcionalidade ainda não está disponível'
    },
    eng: {
      // Títulos principais
      'portfolio-title': 'Portfolio',
      'sobre-title': 'About Me',
      'contactos-title': 'Contact',
      'projetos-title': 'Gallery',
      'skills-title': 'Apps',
      
      // Descrições
      'portfolio-description': 'Website',
      'sobre-description': 'More about me',
      'contactos-description': 'Get in touch',
      'projetos-description': 'Photography',
      'skills-description': 'Competencies',
      
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
      'natureza-morta-composition': 'Composition',
      'exposicao-exposicoes': 'Exhibitions',
      'exposicao-eventos': 'Events',
      'exposicao-documentacao': 'Documentation',
      
      // Aplicações
      'apps-section-title': 'Design and Editing Software',
      'apps-description': 'Image editing and graphic design',
      'affinity-description': 'Design suite with multiple apps',
      'davinci-description': 'Video editing and post-production',
      'illustrator-description': 'Vector design and illustrations',
      'proficiency-title': 'Proficiency Levels',
      
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
      'websites-title': 'Websites',
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
      'age-value': '18 years',
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
      
      // Websites
      'websites-title': 'Other Websites',
      
      // Image alt attributes - English translations when language toggle is active
      'alt-paisagem': 'Landscape',
      'alt-abstracao': 'Abstraction',
      'alt-natureza-morta': 'Still Life',
      'alt-exposicao': 'Exhibition',
      
      // Alertas
      'form-alert': 'Please fill in all fields.',
      'sending-text': 'Sending...',
      'success-message': 'Message sent successfully! Thank you for contacting.',
      'feature-not-available': 'This feature is not yet available'
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
    const element = document.querySelector(`[data-${key}]`);
    if (element) {
      element.textContent = currentTexts[key];
    }
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
  
  // Atualizar títulos dos modais diretamente
  if (lang === 'eng') {
    const sobreModal = document.querySelector('#modal-sobre h2');
    const projetosModal = document.querySelector('#modal-projetos h2');
    const skillsModal = document.querySelector('#modal-skills h2');
    const contactosModal = document.querySelector('#modal-contactos h2');
    
    if (sobreModal) sobreModal.textContent = 'About Me';
    if (projetosModal) projetosModal.textContent = 'Photography';
    if (skillsModal) skillsModal.textContent = 'Apps';
    if (contactosModal) contactosModal.textContent = 'Contact';
  } else {
    const sobreModal = document.querySelector('#modal-sobre h2');
    const projetosModal = document.querySelector('#modal-projetos h2');
    const skillsModal = document.querySelector('#modal-skills h2');
    const contactosModal = document.querySelector('#modal-contactos h2');
    
    if (sobreModal) sobreModal.textContent = 'Sobre Mim';
    if (projetosModal) projetosModal.textContent = 'Fotografias';
    if (skillsModal) skillsModal.textContent = 'Aplicações';
    if (contactosModal) contactosModal.textContent = 'Contactos';
  }
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
      
      // Get form data
      const formData = new FormData(this);
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector('textarea').value;
      
      // Simple validation
      const currentLang = document.querySelector('#language-toggle') ? 
        (document.querySelector('#language-toggle').getAttribute('title') === 'Switch Language' ? 'eng' : 'pt') : 'pt';
      
      if (!name || !email || !message) {
        const alertText = currentLang === 'eng' ? 
          'Please fill in all fields.' : 'Por favor, preencha todos os campos.';
        alert(alertText);
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      
      const sendingText = currentLang === 'eng' ? 
        'Sending...' : 'Enviando...';
      submitBtn.textContent = sendingText;
      submitBtn.disabled = true;
      
      setTimeout(() => {
        const successText = currentLang === 'eng' ? 
          'Message sent successfully! Thank you for contacting.' : 
          'Mensagem enviada com sucesso! Obrigada pelo contacto.';
        alert(successText);
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
      
      // LinkedIn e TikTok mostram alerta
      if (linkText === 'LinkedIn' || linkText === 'Tiktok') {
        e.preventDefault();
        alert('Esta funcionalidade ainda não está disponível');
      }
      // GitHub e Instagram funcionam normalmente
      // (não fazer nada, deixa seguir o href)
    });
  });
});

