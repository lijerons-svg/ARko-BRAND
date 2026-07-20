(() => {
  'use strict';

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll('.reveal:not(.is-visible)');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* Copy HEX / RGB from color swatches */
  const toast = document.getElementById('toast');
  let toastTimer = null;
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 1800);
  };

  document.querySelectorAll('.swatch').forEach(swatch => {
    swatch.addEventListener('click', async () => {
      const hex = swatch.getAttribute('data-hex');
      const rgb = swatch.getAttribute('data-rgb');
      const value = `${hex} · rgb(${rgb})`;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
        } else {
          const ta = document.createElement('textarea');
          ta.value = value;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        swatch.classList.add('is-copied');
        showToast(`Copiado — ${value}`);
        setTimeout(() => swatch.classList.remove('is-copied'), 1600);
      } catch (err) {
        showToast('No se pudo copiar');
      }
    });
  });
})();
