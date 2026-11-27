// Runs before first paint so the saved theme applies without a flash.
(function () {
  var root = document.documentElement;
  var theme = 'dark';
  try {
    if (localStorage.getItem('site-theme') === 'light') theme = 'light';
  } catch (e) { /* storage can be blocked; keep the default */ }
  root.dataset.theme = theme;
  root.classList.add('js');
})();
