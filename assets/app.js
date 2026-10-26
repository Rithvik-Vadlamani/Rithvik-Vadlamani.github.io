(function () {
  var root = document.documentElement;

  /* Theme: follows the system until the visitor picks one. */
  var themeBtn = document.querySelector('.theme');
  var themeLabel = themeBtn.querySelector('.theme-label');
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  function isDark() {
    var t = root.dataset.theme;
    return t ? t === 'dark' : mq.matches;
  }
  function syncTheme() {
    var dark = isDark();
    themeLabel.textContent = dark ? 'Light mode' : 'Dark mode';
  }
  themeBtn.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncTheme();
  });
  mq.addEventListener('change', syncTheme);
  syncTheme();

  /* Project disclosure */
  var projects = Array.prototype.slice.call(document.querySelectorAll('.proj'));
  var toggleAll = document.getElementById('toggle-all');

  function setOpen(proj, open) {
    proj.querySelector('.proj-head').setAttribute('aria-expanded', String(open));
    proj.classList.toggle('is-open', open);
  }
  function visible() { return projects.filter(function (p) { return !p.hidden; }); }
  function syncToggleAll() {
    var vis = visible();
    var anyOpen = vis.some(function (p) { return p.querySelector('.proj-head').getAttribute('aria-expanded') === 'true'; });
    toggleAll.textContent = anyOpen ? 'Collapse all' : 'Expand all';
    toggleAll.hidden = vis.length === 0;
  }
  projects.forEach(function (p) {
    p.querySelector('.proj-head').addEventListener('click', function (e) {
      var open = e.currentTarget.getAttribute('aria-expanded') === 'true';
      setOpen(p, !open);
      syncToggleAll();
    });
  });
  toggleAll.addEventListener('click', function () {
    var open = toggleAll.textContent === 'Expand all';
    visible().forEach(function (p) { setOpen(p, open); });
    syncToggleAll();
  });

  /* Filter */
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var count = document.getElementById('count');
  var empty = document.getElementById('empty');
  function applyFilter(tag) {
    projects.forEach(function (p) {
      var tags = p.dataset.tags.split(' ');
      p.hidden = !(tag === 'all' || tags.indexOf(tag) !== -1);
    });
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.filter === tag)); });
    var n = visible().length;
    count.textContent = tag === 'all' ? n + ' projects' : n + ' of ' + projects.length + ' projects';
    empty.hidden = n !== 0;
    syncToggleAll();
  }
  chips.forEach(function (c) { c.addEventListener('click', function () { applyFilter(c.dataset.filter); }); });

  /* Jump links from other sections open the project they point at. */
  document.querySelectorAll('[data-jump]').forEach(function (a) {
    a.addEventListener('click', function () {
      var body = document.querySelector(a.getAttribute('href'));
      if (!body) return;
      var proj = body.closest('.proj');
      if (proj.hidden) applyFilter('all');
      setOpen(proj, true);
      syncToggleAll();
    });
  });

  projects.forEach(function (p) { setOpen(p, p.querySelector('.proj-head').getAttribute('aria-expanded') === 'true'); });
  applyFilter('all');
})();
