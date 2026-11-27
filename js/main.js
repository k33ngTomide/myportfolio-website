(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  function initTheme() {
    const button = $('.theme-toggle');
    const themeColor = $('meta[name="theme-color"]');
    if (!button) return;

    const apply = (theme) => {
      root.dataset.theme = theme;
      button.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
      if (themeColor) themeColor.content = theme === 'dark' ? '#0B1120' : '#F8FAFC';
    };

    apply(root.dataset.theme);
    button.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('site-theme', next); } catch (e) { /* not persisted */ }
    });
  }

  function initMenu() {
    const toggle = $('.menu-toggle');
    const menu = $('#site-nav');
    if (!toggle || !menu) return;

    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('menu-open', open);
    };
    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

    toggle.addEventListener('click', () => setOpen(!isOpen()));
    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', (event) => {
      if (isOpen() && !event.target.closest('.site-header')) setOpen(false);
    });
    window.matchMedia('(min-width: 961px)').addEventListener('change', () => setOpen(false));
  }

  function initScrollState() {
    const header = $('.site-header');
    const toTop = $('.to-top');
    const links = $$('.nav-link');
    const sections = $$('main section[id]');
    let queued = false;

    const update = () => {
      queued = false;
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 12);
      toTop.classList.toggle('is-visible', y > 600);

      // The active section is the last one whose top has passed the upper third.
      const marker = window.innerHeight * 0.35;
      let current = '';
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= marker) current = section.id;
      });
      if (window.innerHeight + y >= root.scrollHeight - 2) current = sections[sections.length - 1].id;
      if (current === 'education') current = 'credentials';

      links.forEach((link) => {
        if (link.getAttribute('href') === `#${current}`) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    };

    window.addEventListener('scroll', () => {
      if (!queued) {
        queued = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  function initReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -40px 0px' });
    items.forEach((item) => observer.observe(item));
  }

  initTheme();
  initMenu();
  initScrollState();
  initReveal();

  const year = $('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
