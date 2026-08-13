/* jesstresidder.com, three small jobs and nothing else.
   The press marquee, the FAQ and the mobile menu's layout are all CSS or
   native HTML, so this file only handles state that CSS cannot hold. */

(function () {
  'use strict';

  /* ---- mobile nav ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function isMobile() { return window.matchMedia('(max-width: 900px)').matches; }

  function closeNav() {
    if (!nav || !toggle) return;
    nav.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  if (toggle && nav) {
    // The panel is only ever hidden at mobile widths. On desktop the same
    // element is the inline nav, so the hidden attribute has to come off
    // whenever the viewport crosses back over the breakpoint.
    var syncNav = function () { nav.hidden = isMobile(); };
    syncNav();

    toggle.addEventListener('click', function () {
      var open = nav.hidden;
      nav.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { if (isMobile()) closeNav(); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isMobile()) closeNav();
    });

    window.addEventListener('resize', syncNav);
  }

  /* ---- header hairline, only once the page has moved ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    var setScrolled = function () {
      header.setAttribute('data-scrolled', window.scrollY > 8 ? 'true' : 'false');
    };
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
  }

  /* ---- reveal on entry ---- */
  if ('IntersectionObserver' in window && document.documentElement.classList.contains('anim')) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.rv').forEach(function (el) { obs.observe(el); });
  }
})();
