document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const scrollUpBtn = document.querySelector('.scroll-up-btn');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const themeToggle = document.querySelector('.theme-toggle');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('site-theme', theme);
    const icon = themeToggle?.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  };

  const savedTheme = localStorage.getItem('site-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }

    if (window.scrollY > 500) {
      scrollUpBtn.classList.add('show');
    } else {
      scrollUpBtn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', handleScroll);

  scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });
  }

  navLinkItems.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger?.classList.remove('active');
      document.body.classList.remove('nav-open');
    });
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(currentTheme);
    });
  }

  const fadeElements = document.querySelectorAll('.fadein');
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('showme');
        }
      });
    },
    { threshold: 0.2 }
  );
  fadeElements.forEach((el) => fadeObserver.observe(el));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinkItems.forEach((link) => {
          link.classList.toggle(link.getAttribute('href') === `#${id}`, entry.isIntersecting);
        });
      });
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: 0.2 }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  new Typed('.typing', {
    strings: ['Mobile Applications', 'Ecommerce Websites', 'Web Applications', 'Full Backend and Frontend', 'AI & Intelligent Systems'],
    typeSpeed: 120,
    backSpeed: 50,
    loop: true,
  });

  new Typed('.typing2', {
    strings: ['Software Engineer', 'Full Stack Developer', 'AI & Intelligent Systems Specialist'],
    typeSpeed: 90,
    backSpeed: 50,
    loop: true,
  });
});
