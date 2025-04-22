document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation
  const navToggle = document.querySelector('#navToggle');
  const navLinks = document.querySelector('.nav-links');
  
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
  });

  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card, .article-card').forEach(card => {
    observer.observe(card);
  });

  // Dynamic content loading
  async function loadServices() {
    try {
      const response = await fetch('/api/services');
      const services = await response.json();
      const grid = document.querySelector('.services-grid');
      
      grid.innerHTML = services.map(service => `
        <div class="service-card">
          <img src="${service.image}" alt="${service.alt}" loading="lazy">
          <h3>${service.title}</h3>
          <p>${service.description}</p>
        </div>
      `).join('');
    } catch (error) {
      console.error('Error loading services:', error);
    }
  }

  // Form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const response = await fetch('/contact', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        showToast('Message sent successfully!', 'success');
        contactForm.reset();
      } else {
        showToast('Error sending message', 'error');
      }
    });
  }

  // Performance optimizations
  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    }
  };

  // 3D hover effects with throttling
  const apply3DEffect = throttle((element, event) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = (x - rect.width/2) / 8;
    const rotateX = (y - rect.height/2) / -8;
    
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, 100);

  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => apply3DEffect(card, e));
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
});
  function toggleChat() {
    const chat = document.getElementById("chatWindow");
    chat.style.display = chat.style.display === "flex" ? "none" : "flex";
  }
