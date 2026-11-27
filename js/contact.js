// Contact form: sends through FormSubmit's AJAX endpoint (no API key involved).
// Without JavaScript the form still posts to FormSubmit through its `action`.
(() => {
  'use strict';

  const form = document.getElementById('contact-form');
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  const label = button.querySelector('[data-label]');
  const status = form.querySelector('.form-status');
  const fields = Array.from(form.querySelectorAll('input[required], textarea[required]'));
  const TIMEOUT_MS = 15000;

  form.noValidate = true;

  function messageFor(field) {
    const name = field.labels[0].textContent.toLowerCase();
    if (!field.value.trim()) return `Please enter your ${name}.`;
    if (field.type === 'email' && (field.validity.typeMismatch || !/^\S+@\S+\.\S+$/.test(field.value.trim()))) {
      return 'Please enter a valid email address.';
    }
    return '';
  }

  function validate(field) {
    const message = messageFor(field);
    field.setAttribute('aria-invalid', String(Boolean(message)));
    document.getElementById(`${field.id}-error`).textContent = message;
    return !message;
  }

  function showStatus(type, text) {
    status.className = `form-status is-${type}`;
    status.textContent = text;
    if (type === 'error') {
      // Offer a direct email, pre-filled, so the visitor does not lose the message.
      const data = new FormData(form);
      const link = document.createElement('a');
      const address = form.action.split('/').pop();
      link.href = `mailto:${address}?subject=${encodeURIComponent(data.get('subject'))}&body=${encodeURIComponent(data.get('message'))}`;
      link.textContent = 'Email me directly instead';
      status.append(' ', link, '.');
    }
  }

  function setLoading(loading) {
    button.disabled = loading;
    button.classList.toggle('is-loading', loading);
    form.setAttribute('aria-busy', String(loading));
    label.textContent = loading ? 'Sending…' : 'Send message';
  }

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validate(field);
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (button.disabled) return;
    status.className = 'form-status';
    status.textContent = '';

    const invalid = fields.filter((field) => !validate(field));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    const payload = Object.fromEntries(new FormData(form));
    payload._subject = `Portfolio: ${payload.subject}`;

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
    setLoading(true);

    try {
      const response = await fetch(form.dataset.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result = await response.json();
      // FormSubmit can answer 200 with success "false", so check the flag too.
      if (!response.ok || String(result.success) !== 'true') throw new Error(result.message || 'Send failed');
      form.reset();
      fields.forEach((field) => field.removeAttribute('aria-invalid'));
      showStatus('success', 'Thank you. Your message has been sent.');
    } catch (error) {
      showStatus('error', 'Sorry, your message could not be sent.');
    } finally {
      window.clearTimeout(timer);
      setLoading(false);
    }
  });

  // "Ask about this project" links pre-fill the subject.
  document.querySelectorAll('a[data-subject]').forEach((link) => {
    link.addEventListener('click', () => {
      form.elements.subject.value = link.dataset.subject;
    });
  });
})();
