document.addEventListener('DOMContentLoaded', function() {
  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      var open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Tools dropdown
  var toolsDrop = document.getElementById('toolsDrop');
  if (toolsDrop) {
    var btn = toolsDrop.querySelector('.drop-btn');
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var open = toolsDrop.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function(e) {
      if (!toolsDrop.contains(e.target)) {
        toolsDrop.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // FAQ toggles
  document.querySelectorAll('.faq-question').forEach(function(q) {
    q.addEventListener('click', function() {
      var answer = this.nextElementSibling;
      var icon = this.querySelector('.faq-toggle');
      answer.classList.toggle('open');
      if (icon) {
        icon.textContent = answer.classList.contains('open') ? '−' : '+';
      }
    });
  });

  // Copy buttons
  document.querySelectorAll('.btn-copy').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = document.querySelector(this.dataset.target);
      if (target) {
        navigator.clipboard.writeText(target.textContent).then(function() {
          var orig = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(function() { btn.textContent = orig; }, 2000);
        });
      }
    });
  });

  // Tool output copy
  document.querySelectorAll('.tool-output').forEach(function(el) {
    var copyBtn = document.createElement('button');
    copyBtn.className = 'btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-2';
    copyBtn.textContent = 'Copy';
    copyBtn.style.fontSize = '0.75rem';
    var wrapper = document.createElement('div');
    wrapper.className = 'position-relative';
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
    wrapper.appendChild(copyBtn);
    copyBtn.addEventListener('click', function() {
      navigator.clipboard.writeText(el.textContent);
      copyBtn.textContent = 'Copied!';
      setTimeout(function() { copyBtn.textContent = 'Copy'; }, 2000);
    });
  });
});
