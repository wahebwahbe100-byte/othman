(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('mobile-nav');
  const setMenu = (open, returnFocus = false) => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    toggle.querySelector('path')?.setAttribute('d', open ? 'M6 6l12 12M18 6 6 18' : 'M3 6h18M3 12h18M3 18h18');
    nav.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    if (returnFocus) toggle.focus();
  };
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', event => {
    if (toggle?.getAttribute('aria-expanded') === 'true' && !event.target.closest('.site-header')) setMenu(false);
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) setMenu(false); });


  // All gallery and service photos are loaded from local files in assets/kleinanzeigen.
  // If the download has not been run yet, show a clear placeholder instead of external links.
  document.querySelectorAll('img[src^="assets/kleinanzeigen/"]').forEach(img => {
    const markMissing = () => {
      img.closest('.project-visual')?.classList.add('ka-image-error');
      if (img.classList.contains('listing-photo')) {
        const parent = img.parentElement;
        if (parent && !parent.querySelector('.local-photo-missing')) {
          parent.classList.add('local-image-missing');
          const note = document.createElement('span');
          note.className = 'local-photo-missing';
          note.textContent = 'Foto noch nicht heruntergeladen';
          parent.appendChild(note);
        }
      }
    };
    img.addEventListener('error', markMissing);
    if (img.complete && !img.naturalWidth) markMissing();
  });

  const hero = document.querySelector('.hero-slider');
  if (hero) {
    const slides = [...hero.querySelectorAll('.hero-slide')];
    const dots = [...hero.querySelectorAll('[data-hero-dot]')];
    const status = document.getElementById('hero-slide-status');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let current = 0, timer = null;
    function showSlide(next, announce = false) {
      const index = (next + slides.length) % slides.length;
      if (index === current) return;
      slides.forEach((slide, i) => {
        const active = i === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
        slide.inert = !active;
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
        dot.setAttribute('aria-pressed', String(i === index));
      });
      current = index;
      if (announce && status) status.textContent = 'Angebot ' + (index + 1) + ' von ' + slides.length;
    }
    function stopAuto() { if (timer) window.clearInterval(timer); timer = null; }
    function startAuto() {
      stopAuto();
      if (!prefersReducedMotion.matches && document.visibilityState === 'visible' && !hero.contains(document.activeElement))
        timer = window.setInterval(() => showSlide(current + 1), 4000);
    }
    hero.querySelector('[data-hero-prev]')?.addEventListener('click', () => { showSlide(current - 1, true); startAuto(); });
    hero.querySelector('[data-hero-next]')?.addEventListener('click', () => { showSlide(current + 1, true); startAuto(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i, true); startAuto(); }));
    hero.addEventListener('focusin', stopAuto);
    hero.addEventListener('focusout', event => { if (!hero.contains(event.relatedTarget)) startAuto(); });
    document.addEventListener('visibilitychange', startAuto);
    prefersReducedMotion.addEventListener('change', startAuto);
    startAuto();
  }

  const projectFilterButtons = [...document.querySelectorAll('[data-filter]')];
  const projectFilterGrid = document.querySelector('[data-filter-grid]');
  if (projectFilterButtons.length && projectFilterGrid) {
    const cards = [...projectFilterGrid.querySelectorAll('[data-category]')];
    const countEl = document.getElementById('projects-count-number');
    const applyFilter = filter => {
      let visible = 0;
      cards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(/\s+/).filter(Boolean);
        const show = filter === 'all' || categories.includes(filter);
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (countEl) countEl.textContent = String(visible);
      projectFilterButtons.forEach(btn => {
        const active = btn.getAttribute('data-filter') === filter;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
    };
    projectFilterButtons.forEach(btn => btn.addEventListener('click', () => applyFilter(btn.getAttribute('data-filter') || 'all')));
    applyFilter('all');
  }

  const gallery = document.querySelector('.gallery-dialog');
  const galleryButtons = [...document.querySelectorAll('.othman-gallery .gallery-item, .projects-page .project-card[data-project]')];
  if (gallery && galleryButtons.length) {
    const photo = gallery.querySelector('.gallery-view');
    const caption = gallery.querySelector('.gallery-view-caption');
    const count = gallery.querySelector('.gallery-count');
    let selected = 0;
    const getActiveGalleryButtons = () => {
      const visibleButtons = galleryButtons.filter(button => !button.hidden);
      return visibleButtons.length ? visibleButtons : galleryButtons;
    };
    function renderPhoto(next) {
      const activeButtons = getActiveGalleryButtons();
      selected = (next + activeButtons.length) % activeButtons.length;
      const activeButton = activeButtons[selected];
      const source = activeButton.querySelector('img');
      photo.src = source.currentSrc || source.src;
      photo.alt = source.alt;
      caption.textContent = activeButton.querySelector('.gallery-caption strong, .project-meta h3')?.textContent || activeButton.dataset.title || '';
      if (count) count.textContent = (selected + 1) + ' / ' + activeButtons.length;
    }
    galleryButtons.forEach(button => button.addEventListener('click', () => {
      const picture = button.querySelector('img[data-photo-local="true"]');
      if (picture && picture.closest('.project-visual')?.classList.contains('ka-image-error')) return;
      if (button.querySelector('.project-image.is-blocked')) return;

      const activeButtons = getActiveGalleryButtons();
      const index = Math.max(0, activeButtons.indexOf(button));
      renderPhoto(index);
      if (typeof gallery.showModal === 'function') gallery.showModal();
    }));
    document.querySelector('button.gallery-show-all')?.addEventListener('click', () => { const firstVisible = galleryButtons.find(button => !button.hidden); (firstVisible || galleryButtons[0])?.click(); });
    gallery.querySelector('.gallery-close').addEventListener('click', () => gallery.close());
    gallery.querySelector('.gallery-prev').addEventListener('click', () => renderPhoto(selected - 1));
    gallery.querySelector('.gallery-next').addEventListener('click', () => renderPhoto(selected + 1));
    gallery.addEventListener('click', event => { if (event.target === gallery) gallery.close(); });
    gallery.addEventListener('close', () => getActiveGalleryButtons()[selected]?.focus());
    gallery.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') renderPhoto(selected - 1);
      if (event.key === 'ArrowRight') renderPhoto(selected + 1);
    });
  }

  const form = document.getElementById('request-form');
  if (!form) return;
  const service = form.elements.service;
  const selected = new URLSearchParams(window.location.search).get('leistung');
  if (selected && Array.from(service.options).some(option => option.value === selected)) service.value = selected;
  const date = form.elements.date;
  const today = new Date();
  date.min = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
  const preview = document.getElementById('request-preview');
  const previewText = document.getElementById('request-message');
  const openWhatsApp = document.getElementById('open-whatsapp');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const get = key => String(data.get(key) || '').trim();
    const parts = [
      'Hallo OTHMAN Küchenmontage, ich möchte ein unverbindliches Angebot anfragen.',
      '',
      'Name: ' + get('name'),
      'Montageort: ' + get('location'),
      'Leistung: ' + get('service')
    ];
    if (get('phone')) parts.push('Telefon: ' + get('phone'));
    if (get('date')) parts.push('Wunschtermin: ' + get('date').split('-').reverse().join('.'));
    parts.push('', 'Mein Vorhaben:', get('message'));
    const message = parts.join('\n');
    previewText.textContent = message;
    openWhatsApp.href = 'https://wa.me/491626164060?text=' + encodeURIComponent(message);
    form.hidden = true;
    preview.hidden = false;
    preview.focus({preventScroll: true});
    preview.scrollIntoView({behavior: 'smooth', block: 'center'});
  });
  document.getElementById('edit-request')?.addEventListener('click', () => {
    preview.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });
})();
