  // Configuration
  const API_KEY = "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";
  const MODEL = "mistralai/mistral-7b-instruct:free";
  let isProcessing = false;
  let conversationHistory = [
    {
      role: "system",
      content: "You are an expert assistant for HDM Web Academy. Provide concise, professional responses about AI, digital marketing, web development, and courses. Respond in English unless asked for another language."
    }
  ];
  
  async function getChatbotResponse(message) {
    try {
      conversationHistory.push({ role: "user", content: message });
  
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Referer": window.location.href,
          "X-Title": "HDM Web Academy",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: MODEL,
          messages: conversationHistory,
          temperature: 0.7,
          max_tokens: 500
        })
      });
  
      if (response.status === 429) {
        throw new Error("Please wait a moment before sending another message");
      }
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || "API request failed");
      }
  
      const botResponse = data.choices[0].message.content;
      conversationHistory.push({ role: "assistant", content: botResponse });
      return botResponse;
    } catch (error) {
      console.error("API Error:", error);
      return `Error: ${error.message}`;
    }
  }
  
  async function sendMessage() {
    if (isProcessing) return;
    
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    if (!message) return;
  
    isProcessing = true;
    userInput.disabled = true;
    
    const chatBody = document.getElementById('chatBody');
    
    // Add user message
    chatBody.innerHTML += `
      <div class="user-message">
        <p>${message}</p>
      </div>
    `;
  
    userInput.value = '';
    
    // Add loading indicator
    const loadingId = Date.now();
    chatBody.innerHTML += `
      <div class="bot-message loading" id="${loadingId}">
        <div class="loading-dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    `;
  
    chatBody.scrollTop = chatBody.scrollHeight;
  
    try {
      const response = await getChatbotResponse(message);
      
      // Remove loading
      document.getElementById(loadingId)?.remove();
      
      // Add response
      chatBody.innerHTML += `
        <div class="bot-message">
          <p>${response}</p>
        </div>
      `;
    } catch (error) {
      document.getElementById(loadingId)?.remove();
      chatBody.innerHTML += `
        <div class="bot-message error">
          <p>⚠️ ${error.message}</p>
        </div>
      `;
    } finally {
      isProcessing = false;
      userInput.disabled = false;
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }
  
  // Chat visibility toggle
  function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
  }
  
  // Enter key handler
  document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Initialize language system when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
  });

  // ==================== MOBILE NAVIGATION ====================
  const navToggle = document.querySelector('#navToggle');
  const navLinks = document.querySelector('.nav-links');
  
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
  });

  // ==================== ANIMATION SYSTEM ====================
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

  // ==================== LANGUAGE SYSTEM ====================
  const langSelect = document.getElementById('languageSelect');
  let translations = {};

  const loadTranslations = async (lang) => {
    try {
      const langData = {
        'en': {
          "title": "HDM Web Academy - AI & Digital Marketing Solutions",
          "dir": "ltr",
          "alt": {
            "logo": "HDM Web Academy Logo",
            "ai_solutions": "AI Solutions",
            "success_graph": "Success Graph",
            "video_production": "Video Production",
            "graphic_design": "Graphic Design",
            "web_dev": "Web Development",
            "social_media": "Social Media Management",
            "ecommerce": "E-commerce Solutions",
            "chat_assistant": "Chat Assistant",
            "ai_education": "AI in Moroccan Education",
            "digital_skills": "Digital Skills Training",
            "ecommerce_growth": "E-commerce Growth"
          },

          "nav": {
            "home": "Home",
            "academy": "Academy",
            "services": "Programming",
            "articles": "Articles",
            "contact": "Contact"
          },
          "lang": {
            "en": "EN",
            "fr": "FR",
            "ar": "Arabic"
          },
          "home": {
            "title": "Transform Your Business with AI Solutions",
            "subtitle": "HDM Web Academy: Your partner in digital transformation and AI integration in Morocco",
            "cta": "Start Your AI Journey"
          },
          "academy": {
            "title": "Select a Course to Explore"
          },
          "courses": {
            "ai_fundamentals": "AI Fundamentals",
            "digital_marketing": "Digital Marketing",
            "web_dev": "Web Dev Bootcamp",
            "learn": "What You'll Learn:",
            "ai1": "Intro to AI & ML",
            "ai2": "Supervised Learning",
            "ai3": "Python Basics",
            "dm1": "SEO & Analytics",
            "dm2": "Social Media Strategy",
            "dm3": "Email Funnels",
            "web1": "HTML, CSS, JS",
            "web2": "APIs & Node.js",
            "web3": "Deploying Projects"
          },
          "success": {
            "title1": "YOUR SUCCESS",
            "title2": "IS OUR FIRST PASSION",
            "description": "Our experts are with you from the very first steps! We provide a comprehensive market analysis, guaranteed pricing strategies, and customized marketing plans tailored to your unique business needs.",
            "cta": "⭐ START NOW AND BENEFIT FROM A FREE CONSULTATION"
          },
          "services": {
            "title": "Our Professional Services",
            "video_production": "Video Production",
            "video_desc": "Professional video shooting and editing services",
            "graphic_design": "Graphic Design",
            "design_desc": "Creative visual solutions for your brand",
            "web_dev": "Web Development",
            "web_desc": "Custom websites and web applications",
            "social_media": "Social Media Management",
            "social_desc": "Complete social media strategy and execution",
            "ecommerce": "E-commerce Solutions",
            "ecommerce_desc": "AI-powered online stores"
          },
          "articles": {
            "title": "News & Articles",
            "subtitle": "Discover the latest updates, expert insights, and real-world innovations in technology, AI, education, and beyond.",
            "category1": "AI Education",
            "title1": "Morocco Implements AI Curriculum in Universities",
            "excerpt1": "HDMWeb Academy partners with leading institutions to develop Morocco's first national AI education framework...",
            "category2": "Digital Transformation",
            "title2": "10,000 Moroccan Youth to Receive Free Coding Training",
            "excerpt2": "New government initiative powered by HDMWeb Academy's learning platform aims to boost digital employment...",
            "category3": "Tech Innovation",
            "title3": "Moroccan E-commerce Sector Grows 40% in 2024",
            "excerpt3": "How AI-powered solutions from HDMWeb Academy are helping local businesses compete globally...",
            "read_more": "Read Full Article",
            "view_all": "View All Articles"
          },
"contact": {
      "title": "Contact Our AI Experts",
      "motivation": "<strong>Don't miss the opportunity and join the digital transformation.</strong><br>All you have to do is take the first step… <span>we'll complete the journey with you.</span>",
      "form": {
        "full_name": "Your Full Name",
        "email": "Your Email Address",
        "phone": "Your Phone Number",
        "company": "Company Name",
        "website": "Company Website or Social Media Link (optional)",
        "service_default": "I'm interested in...",
        "service1": "Branding",
        "service2": "Social Media Marketing",
        "service3": "SEO Optimization",
        "service4": "Content Marketing",
        "service5": "Website Design & Development",
        "service6": "Other",
        "message": "Tell us more about your project or needs...",
        "submit": "Send Message",
        "submit_success": "Message sent successfully!",
        "submit_error": "Error sending message"
      }
    },
          "footer": {
            "title": "HDM Web Academy",
            "description": "Empowering businesses with AI & digital solutions."
          },
          "chat": {
            "title": "HDM Assistant",
            "welcome": "Welcome to HDM Web Academy! Ask me about AI, programming, or digital marketing. 🤖",
            "input": "Type your message..."
          }
        },
        'fr': {
          "title": "HDM Web Academy - Solutions d'IA et Marketing Digital",
          "dir": "ltr",
          "alt": {
            "logo": "Logo HDM Web Academy",
            "ai_solutions": "Solutions d'IA",
            "success_graph": "Graphique de réussite",
            "video_production": "Production Vidéo",
            "graphic_design": "Design Graphique",
            "web_dev": "Développement Web",
            "social_media": "Gestion des Réseaux Sociaux",
            "ecommerce": "Solutions E-commerce",
            "chat_assistant": "Assistant Virtuel",
            "ai_education": "IA dans l'éducation marocaine",
            "digital_skills": "Formation aux compétences numériques",
            "ecommerce_growth": "Croissance du e-commerce"
          },

          "nav": {
            "home": "Accueil",
            "academy": "Académie",
            "services": "Programmation",
            "articles": "Articles",
            "contact": "Contact"
          },
          "lang": {
            "en": "AN",
            "fr": "FR",
            "ar": "Arabe"
          },
          "home": {
            "title": "Transformez votre entreprise avec des solutions IA",
            "subtitle": "HDM Web Academy : Votre partenaire en transformation numérique et intégration d'IA au Maroc",
            "cta": "Commencez votre voyage IA"
          },
          "academy": {
            "title": "Choisissez un cours à explorer"
          },
          "courses": {
            "ai_fundamentals": "Fondamentaux de l'IA",
            "digital_marketing": "Marketing Digital",
            "web_dev": "Bootcamp Développement Web",
            "learn": "Ce que vous apprendrez :",
            "ai1": "Introduction à l'IA & ML",
            "ai2": "Apprentissage Supervisé",
            "ai3": "Bases de Python",
            "dm1": "SEO & Analytics",
            "dm2": "Stratégie Réseaux Sociaux",
            "dm3": "Entonnoirs Email",
            "web1": "HTML, CSS, JS",
            "web2": "APIs & Node.js",
            "web3": "Déploiement de Projets"
          },
          "success": {
            "title1": "VOTRE RÉUSSITE",
            "title2": "EST NOTRE PREMIÈRE PASSION",
            "description": "Nos experts vous accompagnent dès les premières étapes ! Nous fournissons une analyse complète du marché, des stratégies de tarification garanties et des plans marketing personnalisés adaptés à vos besoins commerciaux.",
            "cta": "⭐ COMMENCEZ MAINTENANT ET BÉNÉFICIEZ D'UNE CONSULTATION GRATUITE"
          },
          "services": {
            "title": "Nos Services Professionnels",
            "video_production": "Production Vidéo",
            "video_desc": "Services professionnels de tournage et montage vidéo",
            "graphic_design": "Design Graphique",
            "design_desc": "Solutions visuelles créatives pour votre marque",
            "web_dev": "Développement Web",
            "web_desc": "Sites web et applications sur mesure",
            "social_media": "Gestion des Réseaux Sociaux",
            "social_desc": "Stratégie et exécution complètes pour réseaux sociaux",
            "ecommerce": "Solutions E-commerce",
            "ecommerce_desc": "Boutiques en ligne alimentées par l'IA"
          },
          "articles": {
            "title": "Actualités & Articles",
            "subtitle": "Découvrez les dernières actualités, analyses d'experts et innovations technologiques dans le domaine de l'IA, de l'éducation et au-delà.",
            "category1": "Éducation IA",
            "title1": "Le Maroc implémente un programme d'IA dans les universités",
            "excerpt1": "HDMWeb Academy s'associe à des institutions leaders pour développer le premier cadre national d'éducation en IA...",
            "category2": "Transformation Digitale",
            "title2": "10 000 jeunes Marocains formés gratuitement au codage",
            "excerpt2": "Une nouvelle initiative gouvernementale utilisant la plateforme HDMWeb Academy pour booster l'emploi digital...",
            "category3": "Innovation Technologique",
            "title3": "Le secteur e-commerce marocain croît de 40% en 2024",
            "excerpt3": "Comment les solutions IA de HDMWeb Academy aident les entreprises locales à rivaliser à l'international...",
            "read_more": "Lire l'article complet",
            "view_all": "Voir tous les articles"
          },
          "contact": {
            "title": "Contactez nos experts en IA",
            "motivation": "<strong>Ne manquez pas l'opportunité et rejoignez la transformation numérique.</strong><br>Tout ce que vous avez à faire est de faire le premier pas… <span>nous terminerons le voyage avec vous.</span>",
            "form": {
              "full_name": "Votre nom complet",
              "email": "Votre adresse email",
              "phone": "Votre numéro de téléphone",
              "company": "Nom de l'entreprise",
              "website": "Site web ou lien réseaux sociaux (optionnel)",
              "service_default": "Je suis intéressé par...",
              "service1": "Branding",
              "service2": "Marketing Réseaux Sociaux",
              "service3": "Optimisation SEO",
              "service4": "Marketing de Contenu",
              "service5": "Conception & Développement Web",
              "service6": "Autre",
              "message": "Dites-nous en plus sur votre projet ou besoins...",
              "submit": "Envoyer le message",
              "submit_success": "Message envoyé avec succès !",
              "submit_error": "Erreur lors de l'envoi du message"
            }
          },
          "footer": {
            "title": "HDM Web Academy",
            "description": "Responsabiliser les entreprises avec des solutions IA et digitales."
          },
          "chat": {
            "title": "Assistant HDM",
            "welcome": "Bienvenue chez HDM Web Academy ! Demandez-moi de l'IA, de la programmation ou du marketing digital. 🤖",
            "input": "Tapez votre message..."
          }
        },
        'ar': {
          "title": "أكاديمية HDM الويب - حلول الذكاء الاصطناعي والتسويق الرقمي",
          "dir": "rtl",
          "alt": {
            "logo": "شعار أكاديمية HDM الويب",
            "ai_solutions": "حلول الذكاء الاصطناعي",
            "success_graph": "رسم بياني للنجاح",
            "video_production": "إنتاج الفيديو",
            "graphic_design": "التصميم الجرافيكي",
            "web_dev": "تطوير الويب",
            "social_media": "إدارة وسائل التواصل الاجتماعي",
            "ecommerce": "حلول التجارة الإلكترونية",
            "chat_assistant": "المساعد الافتراضي",
            "ai_education": "الذكاء الاصطناعي في التعليم المغربي",
            "digital_skills": "تدريب المهارات الرقمية",
            "ecommerce_growth": "نمو التجارة الإلكترونية"
          },

          "nav": {
            "home": "الصفحة الرئيسية",
            "academy": "الأكاديمية",
            "services": "البرمجة",
            "articles": "المقالات",
            "contact": "اتصل بنا"
          },
          "lang": {
            "en": "الإنجليزية",
            "fr": "الفرنسية",
            "ar": "العربية"
          },
          "home": {
            "title": "حول عملك باستخدام حلول الذكاء الاصطناعي",
            "subtitle": "أكاديمية HDM الويب: شريكك في التحول الرقمي ودمج الذكاء الاصطناعي في المغرب",
            "cta": "ابدأ رحلة الذكاء الاصطناعي الخاصة بك"
          },
          "academy": {
            "title": "اختر دورة لاستكشافها"
          },
          "courses": {
            "ai_fundamentals": "أساسيات الذكاء الاصطناعي",
            "digital_marketing": "التسويق الرقمي",
            "web_dev": "معسكر تطوير الويب",
            "learn": "ما الذي ستتعلمه:",
            "ai1": "مقدمة في الذكاء الاصطناعي وتعلم الآلة",
            "ai2": "التعلم الموجّه",
            "ai3": "أساسيات بايثون",
            "dm1": "تحسين محركات البحث والتحليلات",
            "dm2": "استراتيجية وسائل التواصل الاجتماعي",
            "dm3": "قمع البريد الإلكتروني",
            "web1": "HTML, CSS, JavaScript",
            "web2": "واجهات برمجة التطبيقات وNode.js",
            "web3": "نشر المشاريع"
          },
          "success": {
            "title1": "نجاحك",
            "title2": "هو شغفنا الأول",
            "description": "خبراؤنا معك من الخطوات الأولى! نقدم تحليلًا شاملاً للسوق، واستراتيجيات تسعير مضمونة، وخطط تسويقية مخصصة تلبي احتياجات عملك الفريدة.",
            "cta": "⭐ ابدأ الآن واستفد من استشارة مجانية"
          },
          "services": {
            "title": "خدماتنا المهنية",
            "video_production": "إنتاج الفيديو",
            "video_desc": "خدمات تصوير ومونتاج فيديو احترافية",
            "graphic_design": "التصميم الجرافيكي",
            "design_desc": "حلول بصرية إبداعية لعلامتك التجارية",
            "web_dev": "تطوير الويب",
            "web_desc": "مواقع وتطبيقات ويب مخصصة",
            "social_media": "إدارة وسائل التواصل الاجتماعي",
            "social_desc": "استراتيجية وتنفيذ كامل لوسائل التواصل الاجتماعي",
            "ecommerce": "حلول التجارة الإلكترونية",
            "ecommerce_desc": "متاجر إلكترونية مدعومة بالذكاء الاصطناعي"
          },
          "articles": {
            "title": "الأخبار والمقالات",
            "subtitle": "اكتشف آخر التحديثات ورؤى الخبراء والابتكارات الواقعية في التكنولوجيا، الذكاء الاصطناعي، التعليم وما بعده.",
            "category1": "التعليم بالذكاء الاصطناعي",
            "title1": "المغرب ينفذ منهج الذكاء الاصطناعي في الجامعات",
            "excerpt1": "أكاديمية HDM الويب تتعاون مع مؤسسات رائدة لتطوير أول إطار تعليمي وطني للذكاء الاصطناعي...",
            "category2": "التحول الرقمي",
            "title2": "10 آلاف شاب مغربي يتلقون تدريبًا مجانيًا على البرمجة",
            "excerpt2": "مبادرة حكومية جديدة باستخدام منصة أكاديمية HDM الويب لتعزيز التوظيف الرقمي...",
            "category3": "الابتكار التكنولوجي",
            "title3": "قطاع التجارة الإلكترونية المغربي ينمو 40% في 2024",
            "excerpt3": "كيف تساعد حلول أكاديمية HDM الويب المدعومة بالذكاء الاصطناعي الشركات المحلية على المنافسة عالميًا...",
            "read_more": "اقرأ المقال كاملًا",
            "view_all": "عرض جميع المقالات"
          },
    "contact": {
      "title": "اتصل بخبراء الذكاء الاصطناعي",
      "motivation": "<strong>لا تفوت الفرصة وانضم إلى التحول الرقمي.</strong><br>كل ما عليك فعله هو اتخاذ الخطوة الأولى… <span>سنكمل الرحلة معك.</span>",
      "form": {
              "full_name": "اسمك الكامل",
              "email": "عنوان بريدك الإلكتروني",
              "phone": "رقم هاتفك",
              "company": "اسم الشركة",
              "website": "موقع الويب أو رابط وسائل التواصل الاجتماعي (اختياري)",
              "service_default": "أنا مهتم بـ...",
              "service1": "العلامة التجارية",
              "service2": "تسويق وسائل التواصل الاجتماعي",
              "service3": "تحسين محركات البحث",
              "service4": "تسويق المحتوى",
              "service5": "تصميم وتطوير المواقع",
              "service6": "أخرى",
              "message": "أخبرنا المزيد عن مشروعك أو احتياجاتك...",
              "submit": "إرسال الرسالة",
              "submit_success": "تم إرسال الرسالة بنجاح!",
              "submit_error": "خطأ في إرسال الرسالة"
            }
          },
          "footer": {
            "title": "أكاديمية HDM الويب",
            "description": "تمكين الأعمال بحلول الذكاء الاصطناعي والرقمية."
          },
          "chat": {
            "title": "مساعد HDM",
            "welcome": "مرحبًا بكم في أكاديمية HDM الويب! اسألني عن الذكاء الاصطناعي، البرمجة، أو التسويق الرقمي. 🤖",
            "input": "اكتب رسالتك..."
          }
        }
      };
      return langData[lang];
    } catch (error) {
      console.error('Translation error:', error);
      return {};
    }
  };

  const applyTranslations = async (lang) => {
    try {
      translations = await loadTranslations(lang);
      
      // Update all translatable elements
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const keys = el.dataset.i18n.split('.');
        let value = keys.reduce((acc, key) => acc?.[key], translations);
        
        if (value) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = value;
          } else if (el.hasAttribute('data-i18n-placeholder')) {
            el.placeholder = value;
          } else if (el.tagName === 'OPTION') {
            el.textContent = value;
          } else {
            el.textContent = value;
          }
        }
      });

      // Update elements with data-i18n-placeholder
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const keys = el.dataset.i18nPlaceholder.split('.');
        let value = keys.reduce((acc, key) => acc?.[key], translations);
        if (value) el.placeholder = value;
      });

      // Special handling for select placeholder
      const select = document.querySelector('select[name="serviceInterested"]');
      if (select) {
        const defaultOption = select.querySelector('option[value=""]');
        if (defaultOption) {
          const keys = 'contact.form.service_default'.split('.');
          const value = keys.reduce((acc, key) => acc?.[key], translations);
          if (value) defaultOption.textContent = value;
        }
      }

      // Update document direction and language
      document.documentElement.lang = lang;
      document.documentElement.dir = translations.dir || 'ltr';
      document.body.classList.toggle('rtl', lang === 'ar');
      if (langSelect) langSelect.value = lang;
    } catch (error) {
      console.error('Translation application failed:', error);
    }
  };

  const initializeLanguage = async () => {
    const savedLang = localStorage.getItem('lang');
    const supportedLangs = ['en', 'fr', 'ar'];
    const defaultLang = supportedLangs.includes(navigator.language.slice(0,2)) 
      ? navigator.language.slice(0,2)
      : 'en';
    
    await applyTranslations(savedLang || defaultLang);

    langSelect.addEventListener('change', async (e) => {
      const lang = e.target.value;
      localStorage.setItem('lang', lang);
      await applyTranslations(lang);
    });
  };

  // ==================== FORM SYSTEM ====================
  const initializeForm = () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const showToast = (message, type) => {
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => toast.remove(), 3000);
    };

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      try {
        const formData = new FormData(contactForm);
        const response = await fetch('/contact', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error('Server error');
        showToast(translations.contact?.form?.submit_success || 'Message sent successfully!', 'success');
        contactForm.reset();
      } catch (error) {
        showToast(translations.contact?.form?.submit_error || 'Error sending message', 'error');
      }
    });
  };

  // ==================== INTERACTIVE ELEMENTS ====================
  const initializeHoverEffects = () => {
    const throttle = (func, limit) => {
      let lastFunc;
      let lastRan;
      return function(...args) {
        if (!lastRan) {
          func.apply(this, args);
          lastRan = Date.now();
        } else {
          clearTimeout(lastFunc);
          lastFunc = setTimeout(() => {
            if ((Date.now() - lastRan) >= limit) {
              func.apply(this, args);
              lastRan = Date.now();
            }
          }, limit - (Date.now() - lastRan));
        }
      };
    };

    const apply3DEffect = throttle((element, event) => {
      const rect = element.getBoundingClientRect();
      const rotateY = (event.clientX - rect.left - rect.width/2) / 8;
      const rotateX = (rect.top + rect.height/2 - event.clientY) / 8;
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }, 100);

    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mousemove', (e) => apply3DEffect(card, e));
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  };

  const initializeChat = () => {
    const toggleChat = () => {
      const chat = document.getElementById("chatWindow");
      chat.style.display = chat.style.display === "flex" ? "none" : "flex";
    };
    
    document.querySelector('.chatbot-icon').addEventListener('click', toggleChat);
    document.querySelector('.chatbot-window .close-btn').addEventListener('click', toggleChat);
  };

  // ==================== COURSE PREVIEWS ====================
  const initializeCoursePreviews = () => {
    document.querySelectorAll('.course-preview').forEach(course => {
      course.addEventListener('mouseenter', () => {
        course.querySelector('.course-hover-details').style.display = 'block';
      });
      course.addEventListener('mouseleave', () => {
        course.querySelector('.course-hover-details').style.display = 'none';
      });
    });
  };

  // ==================== INITIALIZE ALL SYSTEMS ====================
  const initializeAll = async () => {
    await initializeLanguage();
    initializeForm();
    initializeHoverEffects();
    initializeChat();
    initializeCoursePreviews();
  };

  initializeAll();


  // Toggle course details on click
function toggleCourseDetails(element) {
  const details = element.querySelector('.course-hover-details');
  const isMobile = window.matchMedia("(hover: none)").matches;
  
  if (isMobile) {
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
    element.classList.toggle('active');
  }
}

// Close details when clicking elsewhere
document.addEventListener('click', function(e) {
  if (!e.target.closest('.course-preview')) {
    document.querySelectorAll('.course-hover-details').forEach(details => {
      details.style.display = 'none';
    });
    document.querySelectorAll('.course-preview').forEach(course => {
      course.classList.remove('active');
    });
  }
});

// Keep hover for desktop
document.querySelectorAll('.course-preview').forEach(course => {
  course.addEventListener('mouseenter', function() {
    if (!window.matchMedia("(hover: none)").matches) {
      this.querySelector('.course-hover-details').style.display = 'block';
    }
  });
  
  course.addEventListener('mouseleave', function() {
    if (!window.matchMedia("(hover: none)").matches) {
      this.querySelector('.course-hover-details').style.display = 'none';
    }
  });
});
// Mobile course toggle functionality
document.querySelectorAll('.course-preview').forEach(course => {
  course.addEventListener('click', function() {
    if (window.innerWidth <= 768) { // Only for mobile
      this.classList.toggle('active');
      
      // Close other open courses
      document.querySelectorAll('.course-preview').forEach(otherCourse => {
        if (otherCourse !== this) {
          otherCourse.classList.remove('active');
        }
      });
    }
  });
});

// Close when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.course-preview') && window.innerWidth <= 768) {
    document.querySelectorAll('.course-preview').forEach(course => {
      course.classList.remove('active');
    });
  }
});
// To remember if chat was open between page refreshes
window.addEventListener('DOMContentLoaded', () => {
  const wasOpen = localStorage.getItem('chatOpen') === 'true';
  if (wasOpen) toggleChat();
});

// Update when toggling
function toggleChat(event) {
  // ... existing code ...
  localStorage.setItem('chatOpen', chatIsOpen);
}

// When setting the content, use innerHTML instead of textContent
document.querySelector('.cta-message p').innerHTML = 
  '<strong>Don\'t miss the opportunity and join the digital transformation.</strong><br>' +
  'All you have to do is take the first step… <span>we\'ll complete the journey with you.</span>';