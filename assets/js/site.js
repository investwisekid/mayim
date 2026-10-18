// MayimFlow — site behavior (header, mobile menu, scroll reveal, footer year).
// Pages work without this file; it only adds polish.
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  var links = document.getElementById('nav-links');

  // Header: transparent over the home hero, solid after scrolling.
  // Inner pages ship with class "is-solid" already set.
  var transparentAtTop = header && header.dataset.transparent === 'true';
  function updateHeader() {
    if (!header || !transparentAtTop) return;
    header.classList.toggle('is-solid', window.scrollY > 40);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Mobile menu
  function closeMenu() {
    if (!links || !toggle) return;
    links.classList.remove('is-open');
    header.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = !links.classList.contains('is-open');
      links.classList.toggle('is-open', open);
      header.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    links.addEventListener('click', function (e) { if (e.target.closest('a, button')) closeMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 920) closeMenu(); });
  }

  // Reveal sections as they scroll into view
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Hero background video: load it only after the page has finished loading,
  // so text, buttons and images appear first. Skipped for Save-Data and reduced motion.
  var hv = document.querySelector('.hero-video');
  if (hv) {
    var saveData = navigator.connection && navigator.connection.saveData;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var startVideo = function () {
      if (hv.dataset.mp4) {
        var v = document.createElement('video');
        v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
        v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
        v.preload = 'auto';
        v.src = (hv.dataset.mp4Small && window.innerWidth < 800) ? hv.dataset.mp4Small : hv.dataset.mp4;
        v.addEventListener('playing', function () { hv.classList.add('is-ready'); });
        hv.appendChild(v);
        var p = v.play(); if (p && p.catch) p.catch(function () {});
      } else if (hv.dataset.youtube) {
        var id = hv.dataset.youtube;
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&mute=1&loop=1&playlist=' + id +
          '&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3';
        f.title = 'MayimFlow background video'; f.tabIndex = -1; f.allow = 'autoplay; encrypted-media';
        f.addEventListener('load', function () { setTimeout(function () { hv.classList.add('is-ready'); }, 900); });
        hv.appendChild(f);
      }
    };
    if (!saveData && !reduce) {
      var later = function () { setTimeout(startVideo, 1000); };
      if (document.readyState === 'complete') later(); else window.addEventListener('load', later);
    }
  }

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
