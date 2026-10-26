(function () {
  /* Project disclosure */
  var projects = Array.prototype.slice.call(document.querySelectorAll('.proj'));
  var toggleAll = document.getElementById('toggle-all');

  function isOpen(proj) {
    return proj.querySelector('.proj-head').getAttribute('aria-expanded') === 'true';
  }
  function setOpen(proj, open) {
    proj.querySelector('.proj-head').setAttribute('aria-expanded', String(open));
    proj.classList.toggle('is-open', open);
  }
  function syncToggleAll() {
    toggleAll.textContent = projects.some(isOpen) ? 'Collapse all' : 'Expand all';
  }
  projects.forEach(function (p) {
    p.querySelector('.proj-head').addEventListener('click', function () {
      setOpen(p, !isOpen(p));
      syncToggleAll();
    });
  });
  toggleAll.addEventListener('click', function () {
    var open = toggleAll.textContent === 'Expand all';
    projects.forEach(function (p) { setOpen(p, open); });
    syncToggleAll();
  });

  /* Jump links from other sections open the project they point at. */
  document.querySelectorAll('[data-jump]').forEach(function (a) {
    a.addEventListener('click', function () {
      var body = document.querySelector(a.getAttribute('href'));
      if (!body) return;
      setOpen(body.closest('.proj'), true);
      syncToggleAll();
    });
  });

  projects.forEach(function (p) { setOpen(p, isOpen(p)); });
  syncToggleAll();
})();
