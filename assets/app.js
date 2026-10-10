(function () {
  // Highlight current section in the nav
  var page = document.querySelector('[data-page]');
  if (page) {
    var link = document.querySelector('.site-nav [data-nav="' + page.getAttribute('data-page') + '"]');
    if (link) link.setAttribute('aria-current', 'page');
  }

  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-menu');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { toggle.click(); toggle.focus(); }
    });
  }

  // Filter chips + search on listing pages
  var cards = Array.prototype.slice.call(document.querySelectorAll('.card[data-search]'));
  var input = document.querySelector('[data-search-input]');
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var empty = document.querySelector('[data-empty]');
  var sections = Array.prototype.slice.call(document.querySelectorAll('[data-section]'));
  var activeTag = '';

  function apply() {
    var q = input ? input.value.trim().toLowerCase() : '';
    var shown = 0;
    cards.forEach(function (c) {
      if (c.closest('.related')) return;
      var ok = (!activeTag || c.getAttribute('data-tag') === activeTag) &&
               (!q || c.getAttribute('data-search').indexOf(q) !== -1);
      c.hidden = !ok; if (ok) shown++;
    });
    sections.forEach(function (s) { s.hidden = !s.querySelector('.card:not([hidden])'); });
    if (empty) empty.hidden = shown > 0;
  }
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      activeTag = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      apply();
    });
  });
  if (input) {
    input.addEventListener('input', apply);
    if (location.hash === '#search') input.focus();
  }
})();
