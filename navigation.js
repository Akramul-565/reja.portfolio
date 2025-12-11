// Navigation Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Navigation (only if present on the page)
  if (hamburger && navLinks) {
    // Ensure nav has an accessible hidden state
    navLinks.setAttribute('aria-hidden', 'true');

    const closeMenu = () => {
      navLinks.classList.remove('active');
      navLinks.setAttribute('aria-hidden', 'true');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
      navLinks.classList.add('active');
      navLinks.setAttribute('aria-hidden', 'false');
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    };

    const toggleMenu = () => {
      if (navLinks.classList.contains('active')) closeMenu();
      else openMenu();
    };

    // Toggle via click on hamburger (handles clicks on child .bar via event bubbling)
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Keyboard accessibility: toggle on Enter or Space
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close when clicking outside the nav (useful on mobile)
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav')) {
        // Click happened outside the nav
        if (navLinks.classList.contains('active')) closeMenu();
      }
    });

    // Close menu when a navigation link is clicked (useful on mobile)
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        // small delay to allow link navigation on single-page apps; safe for normal links
        closeMenu();
      });
    });

    // Ensure menu is closed when resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  // ---------------------------
  // Back To Top button
  // ---------------------------
  const existingBtn = document.querySelector('.back-to-top');
  const backToTopBtn = existingBtn || (() => {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.setAttribute('title', 'Back to Top');
    btn.type = 'button';
    btn.innerHTML = '↑';
    document.body.appendChild(btn);
    return btn;
  })();

  const toggleBackToTop = () => {
    const threshold = 120; // show a bit earlier
    const doc = document.documentElement;
    const isShortPage = doc.scrollHeight <= window.innerHeight + 50; // page doesn't scroll much
    if (window.scrollY > threshold || isShortPage) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }

    // Avoid overlapping the footer/social icons: if footer is near the viewport, lift the button
    const footer = document.querySelector('footer');
    if (footer) {
      const rect = footer.getBoundingClientRect();
      const nearFooter = rect.top < window.innerHeight - 20; // footer entering viewport
      if (nearFooter) backToTopBtn.classList.add('avoid-footer');
      else backToTopBtn.classList.remove('avoid-footer');
    }
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  window.addEventListener('resize', toggleBackToTop);
  toggleBackToTop(); // initialize state

  backToTopBtn.addEventListener('click', () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      // fallback for older browsers
      window.scrollTo(0, 0);
    }
  });

  // -------------------------------------------------
  // Scroll-Reveal (like Education section) for others
  // Reveals both whole sections and key inner blocks
  // -------------------------------------------------
  try {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Target common content blocks across pages (excluding home hero)
    const selectors = [
      // About
      '.about-section .about-3d-container',
      '.about-section .text-block',
      '.about-section .stat',
      '.about-section .about-actions .btn',

      // Skills
      '.skills-section .skills-box',
      '.skills-section .skill',

      // Projects, Thesis, Certifications
      '.projects-section .project-card',
      '.thesis-section .thesis-card',
      '.certifications-section .certification-card',

      // Contact
      '.contact-section #form-container',
      '.contact-section .thank-you-card'
    ];

    // Collect elements robustly (avoid flatMap)
    const elements = [];
    for (let i = 0; i < selectors.length; i++) {
      const list = document.querySelectorAll(selectors[i]);
      for (let j = 0; j < list.length; j++) elements.push(list[j]);
    }

    // Also target non-hero sections to fade/slide as a whole
    const sectionNodes = document.querySelectorAll('section:not(.hero-section)');
    const sections = Array.prototype.slice.call(sectionNodes);
    sections.forEach(sec => elements.push(sec));

    // Add base hidden state (idempotent)
    elements.forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });

    if (reduceMotion) {
      elements.forEach(el => el.classList.add('visible'));
    } else if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries, io) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      elements.forEach(el => obs.observe(el));
    } else {
      // Fallback: show immediately
      elements.forEach(el => el.classList.add('visible'));
    }
  } catch (_) {
    // no-op
  }

  // ---------------------------
  // Typewriter Effect for Name
  // ---------------------------
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    const fullText = typewriterElement.textContent;
    typewriterElement.textContent = '';
    
    let i = 0;
    const typeSpeed = 100; // milliseconds per character
    
    const typeWriter = () => {
      if (i < fullText.length) {
        typewriterElement.textContent += fullText.charAt(i);
        i++;
        setTimeout(typeWriter, typeSpeed);
      } else {
        // Remove the blinking cursor after typing is complete
        typewriterElement.classList.add('typing-complete');
      }
    };
    
    // Start typewriter effect after a short delay
    setTimeout(typeWriter, 500);
  }
 
});





// Navigation Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Navigation (only if present on the page)
  if (hamburger && navLinks) {
    // Ensure nav has an accessible hidden state
    navLinks.setAttribute('aria-hidden', 'true');

    const closeMenu = () => {
      navLinks.classList.remove('active');
      navLinks.setAttribute('aria-hidden', 'true');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
      navLinks.classList.add('active');
      navLinks.setAttribute('aria-hidden', 'false');
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    };

    const toggleMenu = () => {
      if (navLinks.classList.contains('active')) closeMenu();
      else openMenu();
    };

    // Toggle via click on hamburger (handles clicks on child .bar via event bubbling)
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Keyboard accessibility: toggle on Enter or Space
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close when clicking outside the nav (useful on mobile)
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav')) {
        // Click happened outside the nav
        if (navLinks.classList.contains('active')) closeMenu();
      }
    });

    // Close menu when a navigation link is clicked (useful on mobile)
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        // small delay to allow link navigation on single-page apps; safe for normal links
        closeMenu();
      });
    });

    // Ensure menu is closed when resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  // ---------------------------
  // Back To Top button
  // ---------------------------
  const existingBtn = document.querySelector('.back-to-top');
  const backToTopBtn = existingBtn || (() => {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.setAttribute('title', 'Back to Top');
    btn.type = 'button';
    btn.innerHTML = '↑';
    document.body.appendChild(btn);
    return btn;
  })();

  const toggleBackToTop = () => {
    const threshold = 120; // show a bit earlier
    const doc = document.documentElement;
    const isShortPage = doc.scrollHeight <= window.innerHeight + 50; // page doesn't scroll much
    if (window.scrollY > threshold || isShortPage) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }

    // Avoid overlapping the footer/social icons: if footer is near the viewport, lift the button
    const footer = document.querySelector('footer');
    if (footer) {
      const rect = footer.getBoundingClientRect();
      const nearFooter = rect.top < window.innerHeight - 20; // footer entering viewport
      if (nearFooter) backToTopBtn.classList.add('avoid-footer');
      else backToTopBtn.classList.remove('avoid-footer');
    }
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  window.addEventListener('resize', toggleBackToTop);
  toggleBackToTop(); // initialize state

  backToTopBtn.addEventListener('click', () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      // fallback for older browsers
      window.scrollTo(0, 0);
    }
  });

  // -------------------------------------------------
  // Scroll-Reveal (like Education section) for others
  // Reveals both whole sections and key inner blocks
  // -------------------------------------------------
  try {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Target common content blocks across pages (excluding home hero)
    const selectors = [
      // About
      '.about-section .about-3d-container',
      '.about-section .text-block',
      '.about-section .stat',
      '.about-section .about-actions .btn',

      // Skills
      '.skills-section .skills-box',
      '.skills-section .skill',

      // Projects, Thesis, Certifications
      '.projects-section .project-card',
      '.thesis-section .thesis-card',
      '.certifications-section .certification-card',

      // Contact
      '.contact-section #form-container',
      '.contact-section .thank-you-card'
    ];

    // Collect elements robustly (avoid flatMap)
    const elements = [];
    for (let i = 0; i < selectors.length; i++) {
      const list = document.querySelectorAll(selectors[i]);
      for (let j = 0; j < list.length; j++) elements.push(list[j]);
    }

    // Also target non-hero sections to fade/slide as a whole
    const sectionNodes = document.querySelectorAll('section:not(.hero-section)');
    const sections = Array.prototype.slice.call(sectionNodes);
    sections.forEach(sec => elements.push(sec));

    // Add base hidden state (idempotent)
    elements.forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });

    if (reduceMotion) {
      elements.forEach(el => el.classList.add('visible'));
    } else if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries, io) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      elements.forEach(el => obs.observe(el));
    } else {
      // Fallback: show immediately
      elements.forEach(el => el.classList.add('visible'));
    }
  } catch (_) {
    // no-op
  }

  // ---------------------------
  // Typewriter Effect for Name
  // ---------------------------
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    const fullText = typewriterElement.textContent;
    typewriterElement.textContent = '';
    
    let i = 0;
    const typeSpeed = 100; // milliseconds per character
    
    const typeWriter = () => {
      if (i < fullText.length) {
        typewriterElement.textContent += fullText.charAt(i);
        i++;
        setTimeout(typeWriter, typeSpeed);
      } else {
        // Remove the blinking cursor after typing is complete
        typewriterElement.classList.add('typing-complete');
      }
    };
    
    // Start typewriter effect after a short delay
    setTimeout(typeWriter, 500);
  }
 
});
