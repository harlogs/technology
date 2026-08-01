(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ====== Terminal typing effect ======
  var typingEl = document.getElementById('home-typing');
  if (typingEl) {
    var cmds = [
      'npm install technologymanias',
      'generate sitemap --all',
      'compress pdf --quality 80%',
      'scan resume --ats=true',
      'run ai --model instant',
      'curl api.technologymanias.com',
      'parse json --pretty',
      'convert img --to webp'
    ];

    if (reduceMotion) {
      typingEl.textContent = cmds[0];
    } else {
      var ci = 0, pos = 0, deleting = false;
      function tick() {
        typingEl.textContent = cmds[ci].slice(0, pos);
        var delay = deleting ? 26 : 55;
        if (!deleting && pos < cmds[ci].length) {
          pos++;
        } else if (!deleting) {
          deleting = true;
          delay = 1700;
        } else if (pos > 0) {
          pos--;
        } else {
          deleting = false;
          ci = (ci + 1) % cmds.length;
          delay = 400;
        }
        setTimeout(tick, delay);
      }
      tick();
    }
  }

  // ====== Scroll reveal ======
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealEls.forEach(function (el) {
      el.classList.add('in');
      el.classList.remove('reveal');
    });
    return;
  }

  revealEls.forEach(function (el) {
    var siblings = Array.prototype.filter.call(el.parentNode.children, function (s) {
      return s.classList.contains('reveal');
    });
    var idx = siblings.indexOf(el);
    el.style.transitionDelay = ((idx % 8) * 70) + 'ms';
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        el.classList.add('in');
        setTimeout(function () {
          el.classList.remove('reveal');
          el.style.transitionDelay = '';
        }, 700);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(function (el) {
    io.observe(el);
  });
})();
