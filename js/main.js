// ========================================
// YOULEADER - MAIN JAVASCRIPT
// Contador de visitas, menú móvil, animaciones
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  
  // ========== CONTADOR DE VISITAS (ESQUINA SUPERIOR DERECHA) ==========
  let visitCount = localStorage.getItem('youleader_visits_v2');
  
  if (visitCount === null) {
    visitCount = 0;
  }
  
  visitCount = parseInt(visitCount) + 1;
  localStorage.setItem('youleader_visits_v2', visitCount);
  
  const counterElement = document.getElementById('visitCounter');
  if (counterElement) {
    // Animación de conteo progresivo
    let current = 0;
    const target = visitCount;
    const duration = 800;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counterElement.textContent = target;
        clearInterval(timer);
      } else {
        counterElement.textContent = Math.floor(current);
      }
    }, stepTime);
  }
  
  // ========== MENÚ HAMBURGUESA (MÓVIL) ==========
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      // Animación de las barras
      const bars = menuToggle.querySelectorAll('.bar');
      if (mobileMenu.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });
  }
  
  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('.mobile-nav-link, .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.remove('active');
      // Resetear hamburguesa
      const bars = menuToggle?.querySelectorAll('.bar');
      if (bars) {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });
  });
  
  // ========== SCROLL SUAVE CON OFFSET PARA HEADER FIJO ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === "#" || targetId === "") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========== FORMULARIO DE DEMO ==========
  const demoForm = document.getElementById('demoForm');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = demoForm.querySelector('input[placeholder="Nombre completo"]');
      const emailInput = demoForm.querySelector('input[placeholder="Correo corporativo"]');
      
      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      
      if (name && email) {
        alert(`✅ ¡Gracias ${name}! Un asesor de YouLeader se contactará contigo en las próximas 24 horas.`);
        demoForm.reset();
      } else {
        alert('Por favor completa tu nombre y correo.');
      }
    });
  }
  
  // ========== ANIMACIONES AL SCROLL (FADE IN) ==========
  const animatedElements = document.querySelectorAll('.feature-card, .benefit-card, .testimonial-card, .dashboard-main');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // ========== EFECTO HEADER AL SCROLL ==========
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
      header.style.background = 'rgba(255,255,255,0.98)';
    } else {
      header.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
      header.style.background = 'rgba(255,255,255,0.98)';
    }
  });
  
  // ========== ACTIVE NAV LINK ON SCROLL ==========
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  console.log(`✅ YouLeader Landing Page cargada | Visitas: ${visitCount}`);
});