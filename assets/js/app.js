(() => {
  const ANSWER_NAME = 'rodolph';
  const ANSWER_DATE_CANON = '25/3/2023';
  const ANSWER_NUMBER = '69';
  const MASTER_PASSWORD = '123';

  const photos = [
    { src: 'assets/img/photos/1.jpeg', caption: 'Every love story is beautiful, but ours is my favorite. ❤️' },
    { src: 'assets/img/photos/2.jpeg', caption: 'In your eyes, I found my home. 🏡' },
    { src: 'assets/img/photos/3.jpeg', caption: 'You are my today and all of my tomorrows. 🌅' },
    { src: 'assets/img/photos/4.jpeg', caption: 'My heart is and always will be yours. 💓' },
    { src: 'assets/img/photos/5.jpeg', caption: 'I love you more than I have ever found a way to say to you. 💌' },
    { src: 'assets/img/photos/6.jpeg', caption: 'You are my sun, my moon, and all my stars. 🌟' },
    { src: 'assets/img/photos/7.jpeg', caption: 'Forever is a long time, but I wouldn\'t mind spending it by your side. ⏳' },
    { src: 'assets/img/photos/8.jpeg', caption: 'I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more. 💖' },
    { src: 'assets/img/photos/9.jpeg', caption: 'You\'re the butter to my bread, the breath to my life. 🍞' },
    { src: 'assets/img/photos/10.jpeg', caption: 'I choose you. And I\'ll choose you over and over and over. Without pause, without a doubt, in a heartbeat. I\'ll keep choosing you. 💝' },
    { src: 'assets/img/photos/11.jpeg', caption: 'You are my paradise and I\'d happily get stranded on you for a lifetime. 🏝️' },
    { src: 'assets/img/photos/12.jpeg', caption: 'I love you not only for what you are, but for what I am when I am with you. 🌹' },
    { src: 'assets/img/photos/13.jpeg', caption: 'If I had a flower for every time I thought of you, I could walk through my garden forever. 🌷' },
    { src: 'assets/img/photos/14.jpeg', caption: 'You are the poem I never knew how to write and this life is the story I have always wanted to tell. 📖' },
    { src: 'assets/img/photos/15.jpeg', caption: 'I never want to stop making memories with you. 📸' },
    { src: 'assets/img/photos/16.jpeg', caption: 'Your love is all I need to feel complete. ✨' },
    { src: 'assets/img/photos/17.jpeg', caption: 'Every moment with you is like a beautiful dream come true. 💭' },
    { src: 'assets/img/photos/18.jpeg', caption: 'You are my greatest adventure. 🗺️' },
    { src: 'assets/img/photos/19.jpeg', caption: 'Loving you is the best thing that ever happened to me. 💫' },
    { src: 'assets/img/photos/20.jpeg', caption: 'You make my heart smile. 😊' },
    { src: 'assets/img/photos/21.jpeg', caption: 'I fell in love with you because of the million things you never knew you were doing. 🥰' },
    { src: 'assets/img/photos/22.jpeg', caption: 'My love for you is a journey starting at forever and ending at never. ♾️' }
  ];
  const videos = [];

  const screens = {
    welcome: document.getElementById('screen-welcome'),
    step1: document.getElementById('screen-step1'),
    step2: document.getElementById('screen-step2'),
    step3: document.getElementById('screen-step3'),
    refuse: document.getElementById('screen-refuse'),
    gift: document.getElementById('screen-gift'),
  };

  const topbarTitle = document.getElementById('topbarTitle');
  const resetBtn = document.getElementById('resetBtn');
  const topbar = document.querySelector('.topbar');

  const startBtn = document.getElementById('startBtn');
  const refuseBtn = document.getElementById('refuseBtn');
  const tryAgainBtn = document.getElementById('tryAgainBtn');

  const bgParticles = document.getElementById('bgParticles');
  const unlockOverlay = document.getElementById('unlockOverlay');
  const unlockHearts = document.getElementById('unlockHearts');
  const neonWall = document.getElementById('neonWall');

  let unlockOverlayTimeoutId = null;
  let stopUnlockHearts = null;

  const nameInput = document.getElementById('nameInput');
  const nameNextBtn = document.getElementById('nameNextBtn');
  const nameError = document.getElementById('nameError');

  const dateInput = document.getElementById('dateInput');
  const dateNextBtn = document.getElementById('dateNextBtn');
  const backTo1Btn = document.getElementById('backTo1Btn');
  const dateError = document.getElementById('dateError');

  const numInput = document.getElementById('numInput');
  const unlockBtn = document.getElementById('unlockBtn');
  const backTo2Btn = document.getElementById('backTo2Btn');
  const numError = document.getElementById('numError');

  const mixFeed = document.getElementById('mixFeed');

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let activePhotoIndex = 0;

  function normalizeText(s) {
    return String(s ?? '').trim().toLowerCase();
  }

  function normalizeDate(s) {
    const raw = String(s ?? '').trim();
    // Handle date input format (YYYY-MM-DD)
    const m = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (!m) return '';
    const y = m[1];
    const mo = String(parseInt(m[2], 10));
    const d = String(parseInt(m[3], 10));
    return `${d}/${mo}/${y}`;
  }

  function showScreen(key) {
    Object.values(screens).forEach(el => el.classList.remove('is-active'));
    screens[key].classList.add('is-active');

    const showReset = key !== 'welcome' && key !== 'gift';
    resetBtn.hidden = !showReset;

    if (topbar) {
      topbar.classList.toggle('is-hidden', key === 'gift');
    }

    const active = screens[key];
    active.scrollTop = 0;
  }

  function setError(cardEl, errorEl, show) {
    errorEl.hidden = !show;
    if (show) {
      cardEl.classList.remove('shake');
      void cardEl.offsetWidth;
      cardEl.classList.add('shake');
    }
  }

  function unlockGift() {
    console.log('unlockGift called');
    playUnlockEffect();
  }

  function playUnlockEffect() {
    if (!unlockOverlay) return;
    const overlayMs = 12000; // 12 seconds

    buildNeonWall();
    if (unlockOverlayTimeoutId !== null) {
      window.clearTimeout(unlockOverlayTimeoutId);
      unlockOverlayTimeoutId = null;
    }
    if (typeof stopUnlockHearts === 'function') {
      stopUnlockHearts();
      stopUnlockHearts = null;
    }

    stopUnlockHearts = startUnlockHearts();
    unlockOverlay.classList.add('is-active');
    unlockOverlay.setAttribute('aria-hidden', 'false');

    // Set timeout for automatic redirect after 12 seconds
    unlockOverlayTimeoutId = window.setTimeout(() => {
      console.log('Auto-redirecting to gallery.html');
      window.location.href = 'gallery.html';
    }, overlayMs);
  }

  function hideUnlockOverlay() {
    if (!unlockOverlay) return;

    if (unlockOverlayTimeoutId !== null) {
      window.clearTimeout(unlockOverlayTimeoutId);
      unlockOverlayTimeoutId = null;
    }

    unlockOverlay.classList.remove('is-active');
    unlockOverlay.setAttribute('aria-hidden', 'true');

    if (typeof stopUnlockHearts === 'function') {
      stopUnlockHearts();
      stopUnlockHearts = null;
    }
  }

  function buildNeonWall() {
    if (!neonWall) return;
    const phrase = "One heart isn't enough. I'll sketch you a hundred.";
    neonWall.innerHTML = `<div class="neonWall__single">${phrase}</div>`;
  }

  function startUnlockHearts() {
    if (!unlockHearts) return () => {};
    unlockHearts.innerHTML = '';

    const spawn = () => {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const el = document.createElement('span');
      el.className = 'unlockHeart';
      el.textContent = '❤';

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = 12 + Math.random() * 26;
      const dur = 1.8 + Math.random() * 1.8;
      const driftX = (-26 + Math.random() * 52).toFixed(2) + 'px';
      const driftY = (-34 + Math.random() * 68).toFixed(2) + 'px';
      const rot = (-18 + Math.random() * 36).toFixed(2) + 'deg';

      el.style.setProperty('--x', x.toFixed(2) + '%');
      el.style.setProperty('--y', y.toFixed(2) + '%');
      el.style.setProperty('--size', size.toFixed(0) + 'px');
      el.style.setProperty('--dur', dur.toFixed(2) + 's');
      el.style.setProperty('--driftX', driftX);
      el.style.setProperty('--driftY', driftY);
      el.style.setProperty('--rot', rot);

      unlockHearts.appendChild(el);

      window.setTimeout(() => {
        el.remove();
      }, Math.ceil(dur * 1000) + 200);
    };

    for (let i = 0; i < 220; i++) spawn();
    const id = window.setInterval(spawn, 18);

    return () => {
      window.clearInterval(id);
      unlockHearts.innerHTML = '';
      if (neonWall) neonWall.innerHTML = '';
    };
  }

  function spawnBgParticle() {
    if (!bgParticles) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = document.createElement('span');
    el.className = 'bgParticle';

        // Enhanced emoji selection with more variety
        const heartEmojis = ['❤️', '💙', '🖤', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥️', '🔥', '💌'];
        const roseEmojis = ['🌹', '🌸', '💐', '🌺', '🌷', '🌼'];
        const allEmojis = [...heartEmojis, ...roseEmojis];
        
    
    const pick = Math.random();
    el.textContent = allEmojis[Math.floor(Math.random() * allEmojis.length)];

    const x = Math.random() * 100;
    const size = 14 + Math.random() * 20;
    const dur = 5.5 + Math.random() * 5.5;
    const drift = (-16 + Math.random() * 32).toFixed(2) + 'px';
    const rot = (-18 + Math.random() * 36).toFixed(2) + 'deg';

    el.style.setProperty('--x', x.toFixed(2) + '%');
    el.style.setProperty('--size', size.toFixed(0) + 'px');
    el.style.setProperty('--dur', dur.toFixed(2) + 's');
    el.style.setProperty('--drift', drift);
    el.style.setProperty('--rot', rot);

    bgParticles.appendChild(el);

    window.setTimeout(() => {
      el.remove();
    }, Math.ceil(dur * 1000) + 200);
  }

  function startParticles() {
    if (!bgParticles) return;
    for (let i = 0; i < 8; i++) spawnBgParticle();
    window.setInterval(spawnBgParticle, 420);
  }

  function renderMixFeed() {
    if (!mixFeed) return;
    mixFeed.innerHTML = '';

    const hasAny = photos.length || videos.length;
    if (!hasAny) {
      const p = document.createElement('div');
      p.className = 'card';
      p.textContent = 'Add photos to assets/img/photos/ and videos to assets/video/, then list them in assets/js/app.js (photos/videos arrays).';
      mixFeed.appendChild(p);
      return;
    }

    const maxLen = Math.max(photos.length, videos.length);
    const feed = [];
    for (let i = 0; i < maxLen; i++) {
      if (photos[i]) feed.push({ kind: 'photo', index: i, ...photos[i] });
      if (videos[i]) feed.push({ kind: 'video', index: i, ...videos[i] });
    }

    const floatClasses = ['floatA', 'floatB', 'floatC'];

    feed.forEach((item, i) => {
      const row = document.createElement('article');
      row.className = `mixItem ${i % 2 === 0 ? 'is-left' : 'is-right'}`;

      const card = document.createElement('div');
      card.className = `mixCard ${floatClasses[i % floatClasses.length]}`;

      const media = document.createElement('div');
      media.className = 'mixCard__media';

      if (item.kind === 'photo') {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.style.padding = '0';
        btn.style.border = '0';
        btn.style.background = 'transparent';
        btn.style.width = '100%';
        btn.addEventListener('click', () => openLightbox(item.index));

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.caption || `Photo ${item.index + 1}`;
        img.loading = 'lazy';

        btn.appendChild(img);
        media.appendChild(btn);
      } else {
        const v = document.createElement('video');
        v.controls = true;
        v.preload = 'metadata';
        v.src = item.src;
        media.appendChild(v);
      }

      const body = document.createElement('div');
      body.className = 'mixCard__body';

      const title = document.createElement('p');
      title.className = 'mixCard__title';
      title.textContent = item.kind === 'video' ? (item.title || 'Video') : 'Photo';

      body.appendChild(title);

      const messageWrap = document.createElement('div');
      messageWrap.className = 'mixCard__message';

      const message = document.createElement('p');
      message.className = 'mixCard__messageText';
      message.textContent = item.message || item.caption || '';

      messageWrap.appendChild(message);
      body.appendChild(messageWrap);

      card.appendChild(media);
      card.appendChild(body);
      row.appendChild(card);
      mixFeed.appendChild(row);
    });
  }

  function openLightbox(idx) {
    activePhotoIndex = idx;
    updateLightbox();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  function updateLightbox() {
    const item = photos[activePhotoIndex];
    if (!item) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.caption || `Photo ${activePhotoIndex + 1}`;
    lightboxCaption.textContent = item.caption || '';
  }

  function prevPhoto() {
    if (!photos.length) return;
    activePhotoIndex = (activePhotoIndex - 1 + photos.length) % photos.length;
    updateLightbox();
  }

  function nextPhoto() {
    if (!photos.length) return;
    activePhotoIndex = (activePhotoIndex + 1) % photos.length;
    updateLightbox();
  }

  function resetAll() {
    nameInput.value = '';
    dateInput.value = '';
    numInput.value = '';

    nameError.hidden = true;
    dateError.hidden = true;
    numError.hidden = true;

    closeLightbox();
    showScreen('welcome');
  }

  startBtn.addEventListener('click', () => {
    showScreen('step1');
    nameInput.focus();
  });

  refuseBtn.addEventListener('click', () => showScreen('refuse'));
  tryAgainBtn.addEventListener('click', () => {
    showScreen('step1');
    nameInput.focus();
  });

  nameNextBtn.addEventListener('click', () => {
    const card = screens.step1.querySelector('.card');
    const raw = String(nameInput.value ?? '').trim();
    if (raw === MASTER_PASSWORD) {
      nameError.hidden = true;
      unlockGift();
      return;
    }

    const ok = normalizeText(raw) === ANSWER_NAME;
    setError(card, nameError, !ok);
    if (ok) {
      showScreen('step2');
      dateInput.focus();
    }
  });

  backTo1Btn.addEventListener('click', () => {
    showScreen('step1');
    nameInput.focus();
  });

  dateNextBtn.addEventListener('click', () => {
    const card = screens.step2.querySelector('.card');
    const ok = normalizeDate(dateInput.value) === ANSWER_DATE_CANON;
    setError(card, dateError, !ok);
    if (ok) {
      showScreen('step3');
      numInput.focus();
    }
  });

  backTo2Btn.addEventListener('click', () => {
    showScreen('step2');
    dateInput.focus();
  });

  unlockBtn.addEventListener('click', () => {
    const card = screens.step3.querySelector('.card');
    const ok = String(numInput.value ?? '').trim() === ANSWER_NUMBER;
    setError(card, numError, !ok);
    if (ok) unlockGift();
  });

  [nameInput, dateInput, numInput].forEach((el) => {
    el.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      if (el === nameInput) nameNextBtn.click();
      if (el === dateInput) dateNextBtn.click();
      if (el === numInput) unlockBtn.click();
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', prevPhoto);
  lightboxNext.addEventListener('click', nextPhoto);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
  });

  resetBtn.addEventListener('click', resetAll);

  // FIXED: When clicking on the overlay, cancel animation and redirect immediately
  if (unlockOverlay) {
    unlockOverlay.addEventListener('click', () => {
      if (unlockOverlay.classList.contains('is-active')) {
        console.log('Overlay clicked - redirecting immediately');
        
        // Clear the auto-redirect timeout
        if (unlockOverlayTimeoutId !== null) {
          window.clearTimeout(unlockOverlayTimeoutId);
          unlockOverlayTimeoutId = null;
        }
        
        // Stop the heart animation
        if (typeof stopUnlockHearts === 'function') {
          stopUnlockHearts();
          stopUnlockHearts = null;
        }
        
        // Hide the overlay
        unlockOverlay.classList.remove('is-active');
        unlockOverlay.setAttribute('aria-hidden', 'true');
        
        // Redirect immediately to gallery.html
        window.location.href = 'gallery.html';
      }
    });
  }

  startParticles();

  showScreen('welcome');
})();