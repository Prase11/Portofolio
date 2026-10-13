// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// ==========================================
// Preloader Loading Screen Animation (Smooth & Cinematic)
// ==========================================
const preloader = document.getElementById('preloader');
const preloaderFill = document.getElementById('preloader-fill');
const preloaderCount = document.getElementById('preloader-count');
const preloaderStatus = document.getElementById('preloader-status');

if (preloader) {
  const duration = 2800; // ~2.8 seconds for a relaxed, elegant pace
  let startTime = null;

  const statusStages = [
    { threshold: 28, text: 'Initializing Portfolio...' },
    { threshold: 58, text: 'Loading Experience & Systems...' },
    { threshold: 84, text: 'Analyzing People Analytics Data...' },
    { threshold: 99, text: 'Optimizing UI & Interactions...' },
    { threshold: 100, text: 'Welcome!' }
  ];

  const animatePreloader = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing: smooth ease-in-out curve
    const eased = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    const percent = Math.min(Math.round(eased * 100), 100);

    preloaderFill.style.width = `${percent}%`;
    preloaderCount.textContent = `${percent}%`;

    const currentStage = statusStages.find(stage => percent <= stage.threshold);
    if (currentStage && preloaderStatus.textContent !== currentStage.text) {
      preloaderStatus.textContent = currentStage.text;
    }

    if (progress < 1) {
      requestAnimationFrame(animatePreloader);
    } else {
      // Completed 100%
      preloaderStatus.textContent = 'Welcome!';
      preloaderFill.style.width = '100%';
      preloaderCount.textContent = '100%';

      setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.classList.remove('preloader-active');

        // Trigger reveal animations on hero section
        setTimeout(() => {
          document.querySelectorAll('#home .reveal').forEach((el) => {
            el.classList.add('in');
          });
        }, 180);
      }, 420);
    }
  };

  // Start after brief initial pause
  setTimeout(() => {
    requestAnimationFrame(animatePreloader);
  }, 150);
}

// ==========================================
// Theme Toggle (Dark / Light Mode)
// ==========================================
const html = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  html.classList.remove('dark');
} else {
  html.classList.add('dark');
}

themeToggleBtn.addEventListener('click', () => {
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ==========================================
// Navbar Scroll Effect & Mobile Drawer
// ==========================================
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

mobileToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  mobileToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.mobile-link').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
  });
});

// ==========================================
// Scroll Reveal Animations
// ==========================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = Array.from(entry.target.parentElement?.children || []).filter(el => el.classList.contains('reveal'));
      const index = siblings.indexOf(entry.target);
      const delay = Math.max(0, index) * 80;
      entry.target.style.transitionDelay = `${delay}ms`;
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

// ==========================================
// Animated Number Counters
// ==========================================
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${target}+`;
      }
    };

    requestAnimationFrame(step);
    countObserver.unobserve(el);
  });
}, { threshold: 0.4 });

document.querySelectorAll('[data-count]').forEach((el) => {
  countObserver.observe(el);
});

// ==========================================
// Scrollspy Active Navigation Link
// ==========================================
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const linkMap = {};

navLinks.forEach((link) => {
  const id = link.getAttribute('href').replace('#', '');
  linkMap[id] = link;
});

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = linkMap[entry.target.id];
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { rootMargin: '-35% 0px -50% 0px' });

sections.forEach((section) => spyObserver.observe(section));

// ==========================================
// Interactive Contact Form
// ==========================================
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('btn-submit-message');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  submitBtn.classList.add('submitting');
  submitBtn.disabled = true;
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  // Simulate network request
  setTimeout(() => {
    submitBtn.classList.remove('submitting');
    submitBtn.disabled = false;
    formStatus.textContent = 'Thanks for your message! I will get back to you soon.';
    formStatus.className = 'form-status success';
    contactForm.reset();

    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }, 6000);
  }, 1400);
});

// ==========================================
// 3D Physics Lanyard Badge Simulation (Stable & Bug-Free)
// ==========================================
(function initLanyard() {
  const stage = document.getElementById('lanyard-stage');
  const badgeWrap = document.getElementById('lanyard-badge');
  const cardInner = document.getElementById('card-inner');
  const cardGlare = document.getElementById('card-glare');
  const flipBtn = document.getElementById('lanyard-flip-btn');
  const hintBadge = document.getElementById('lanyard-hint');

  // SVG strap paths
  const strapShadow = document.getElementById('strap-shadow');
  const strapMain = document.getElementById('strap-main');
  const strapStitch = document.getElementById('strap-stitch');

  if (!stage || !badgeWrap || !strapMain) return;

  const cardWidth = 284;
  let stageWidth = stage.clientWidth;
  let stageHeight = stage.clientHeight;

  function updateDimensions() {
    stageWidth = stage.clientWidth;
    stageHeight = stage.clientHeight;
  }
  window.addEventListener('resize', updateDimensions);

  // Anchor and resting point (in stage coordinates)
  let anchorX = stageWidth / 2;
  const anchorY = 6;
  let restX = anchorX;
  let restY = 80;

  function updateRest() {
    anchorX = stageWidth / 2;
    restX = anchorX;
    restY = Math.min(90, stageHeight * 0.16);
  }
  updateRest();
  window.addEventListener('resize', updateRest);

  // Physics state
  let x = restX;
  let y = restY;
  let vx = 0;
  let vy = 0;
  let angle = 0;
  let vAngle = 0;
  const MAX_ANGLE = 24; // Never tilt more than ±24 degrees

  // 3D hover tilt
  let tiltX = 0;
  let tiltY = 0;

  // Drag interaction state
  let isDragging = false;
  let grabOffsetX = 0;
  let grabOffsetY = 0;
  let lastPointerX = 0;
  let lastPointerY = 0;
  let pointerVelX = 0;
  let pointerVelY = 0;
  let hasInteracted = false;

  function onPointerDown(e) {
    isDragging = true;
    badgeWrap.classList.add('is-dragging');
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch (_) {}

    const stageRect = stage.getBoundingClientRect();
    const ptrX = e.clientX - stageRect.left;
    const ptrY = e.clientY - stageRect.top;

    // Grab offset relative to top center of badge (x, y)
    grabOffsetX = ptrX - x;
    grabOffsetY = ptrY - y;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    
    // Store initial click position for click-detection
    badgeWrap.dataset.startX = e.clientX;
    badgeWrap.dataset.startY = e.clientY;
    
    pointerVelX = 0;
    pointerVelY = 0;

    if (!hasInteracted && hintBadge) {
      hintBadge.style.opacity = '0';
      hasInteracted = true;
    }
  }

  function onPointerMove(e) {
    const stageRect = stage.getBoundingClientRect();

    if (isDragging) {
      if (e.cancelable) e.preventDefault();

      const ptrX = e.clientX - stageRect.left;
      const ptrY = e.clientY - stageRect.top;

      // Track pointer velocity
      pointerVelX = (e.clientX - lastPointerX) * 0.6;
      pointerVelY = (e.clientY - lastPointerY) * 0.6;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;

      // Desired position with safe boundaries (so badge never flies into text)
      const minX = anchorX - 160;
      const maxX = anchorX + 160;
      const minY = 30;
      const maxY = 220;

      const targetX = Math.max(minX, Math.min(maxX, ptrX - grabOffsetX));
      const targetY = Math.max(minY, Math.min(maxY, ptrY - grabOffsetY));

      // Elastic follow
      x += (targetX - x) * 0.4;
      y += (targetY - y) * 0.4;

      // Angle safely clamped while dragging
      const targetAngle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, (x - anchorX) * 0.12));
      angle += (targetAngle - angle) * 0.25;
    } else {
      // Subtle 3D card tilt on hover
      const rect = badgeWrap.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      const relX = (e.clientX - cardCenterX) / (rect.width / 2);
      const relY = (e.clientY - cardCenterY) / (rect.height / 2);

      tiltX = Math.max(-12, Math.min(12, -relY * 10));
      tiltY = Math.max(-14, Math.min(14, relX * 12));

      if (cardGlare) {
        const glareX = 50 + relX * 25;
        const glareY = 50 + relY * 25;
        cardGlare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.22) 0%, transparent 60%)`;
      }
      
      const cardHologram = document.getElementById('card-hologram');
      if (cardHologram) {
        const holoX = 50 + relX * 50;
        const holoY = 50 + relY * 50;
        cardHologram.style.backgroundPosition = `${holoX}% ${holoY}%`;
      }
    }
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    badgeWrap.classList.remove('is-dragging');
    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch (_) {}

    // Flip card if it was just a click (moved less than 5 pixels)
    const dx = e.clientX - parseFloat(badgeWrap.dataset.startX || e.clientX);
    const dy = e.clientY - parseFloat(badgeWrap.dataset.startY || e.clientY);
    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
      if (typeof cardInner !== 'undefined' && cardInner) {
        cardInner.classList.toggle('is-flipped');
      }
    }

    // Transfer inertia (clamped)
    vx = Math.max(-8, Math.min(8, pointerVelX * 0.7));
    vy = Math.max(-8, Math.min(8, pointerVelY * 0.7));
    vAngle = Math.max(-3, Math.min(3, pointerVelX * 0.15));
  }

  // Pointer event listeners
  badgeWrap.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove, { passive: false });
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);

  // Card Flip Button
  if (flipBtn && cardInner) {
    flipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      cardInner.classList.toggle('is-flipped');
    });
  }

  // Double click badge to flip
  badgeWrap.addEventListener('dblclick', () => {
    if (cardInner) cardInner.classList.toggle('is-flipped');
  });

  // Update SVG strap path
  function updateStrap(time) {
    const startX = anchorX;
    const startY = anchorY;
    const endX = x;
    const endY = y;

    // Control point creates natural, realistic curve (static when idle)
    const ctrlX = (startX + endX) / 2;
    const ctrlY = (startY + endY) / 2 + 16;

    const pathD = `M ${startX.toFixed(1)} ${startY.toFixed(1)} Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}`;

    strapShadow.setAttribute('d', pathD);
    strapMain.setAttribute('d', pathD);
    strapStitch.setAttribute('d', pathD);

    strapStitch.setAttribute('stroke-dashoffset', '0');
  }

  // Animation Physics Loop
  function loop(currentTime) {
    if (!isDragging) {
      // Stable, critically-damped spring back to resting equilibrium
      const k = 0.065;
      const damping = 0.88;

      const ax = (restX - x) * k;
      const ay = (restY - y) * k;

      vx = (vx + ax) * damping;
      vy = (vy + ay) * damping;

      x += vx;
      y += vy;

      // Angular spring towards resting zero angle
      const angK = 0.075;
      const angDamping = 0.86;
      const targetAngle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, (x - anchorX) * 0.12));
      const aForce = (targetAngle - angle) * angK;
      vAngle = (vAngle + aForce) * angDamping;
      angle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, angle + vAngle));

      // Fully settled: lock to the exact resting pose so it stays still
      if (
        Math.abs(vx) < 0.02 && Math.abs(vy) < 0.02 && Math.abs(vAngle) < 0.02 &&
        Math.abs(x - restX) < 0.3 && Math.abs(y - restY) < 0.3
      ) {
        x = restX;
        y = restY;
        vx = vy = vAngle = 0;
        angle = 0;
      }

      // Smooth return of 3D tilt
      tiltX *= 0.92;
      tiltY *= 0.92;
    }

    // Apply transform to 3D badge wrap
    // Top center of wrap (142px, 0px) is placed precisely at (x, y)
    const badgeLeft = x - cardWidth / 2;
    const badgeTop = y;
    badgeWrap.style.transform = `translate3d(${badgeLeft.toFixed(1)}px, ${badgeTop.toFixed(1)}px, 0) rotate(${angle.toFixed(2)}deg) rotateX(${tiltX.toFixed(1)}deg) rotateY(${tiltY.toFixed(1)}deg)`;

    // Update SVG strap ribbon
    updateStrap(currentTime);

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
})();

// ==========================================
// React Bits: <FluidGlass /> 3D Optical Component
// Real-time Transmission, Refraction & Chromatic Aberration
// ==========================================
(function initFluidGlass() {
  const container = document.getElementById('fluid-glass-container');
  const stage = document.getElementById('fluid-glass-stage');
  const canvas = document.getElementById('fluid-glass-canvas');
  const modeButtons = document.querySelectorAll('.fg-mode-btn');
  const slideTabs = document.querySelectorAll('.fg-slide-tab');

  if (!container || !stage || !canvas) return;

  function start() {
    if (typeof THREE === 'undefined') {
      setTimeout(start, 50);
      return;
    }

    let width = stage.clientWidth;
    let height = stage.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Camera
    const camera = new THREE.PerspectiveCamera(22, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    // Offscreen FBO (Frame Buffer Object) Render Target
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let fbo = new THREE.WebGLRenderTarget(width * dpr, height * dpr, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat
    });

    // Background Scene (the content being refracted)
    const sceneBg = new THREE.Scene();
    sceneBg.background = new THREE.Color(0x0a0f1d);

    // Main Scene (quad displaying buffer + 3D fluid glass mesh)
    const sceneMain = new THREE.Scene();

    // Quad that displays the buffer texture
    const quadGeo = new THREE.PlaneGeometry(1, 1);
    const quadMat = new THREE.MeshBasicMaterial({ map: fbo.texture, toneMapped: false });
    const quadMesh = new THREE.Mesh(quadGeo, quadMat);
    sceneMain.add(quadMesh);

    function updateQuadSize() {
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const visibleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;
      quadMesh.scale.set(visibleWidth, visibleHeight, 1);
    }
    updateQuadSize();

    // ==========================================
    // Project Slide Boards (Canvas Textures)
    // ==========================================
    const projectSlides = [
      {
        tag: 'SYSTEM INTEGRATION',
        title: 'HCIS (MYHC) & SAP HR',
        sub: 'Real-time employee lifecycle synchronization, mutation & promotion data flows.',
        chips: ['SAP HR', 'MYHC', 'Middleware API', 'Real-Time Sync'],
        color1: '#1e3a8a',
        color2: '#3b82f6',
        icon: '⚡'
      },
      {
        tag: 'ANALYTICS & BI',
        title: 'People Analytics Dashboard',
        sub: 'Executive KPI reporting, headcount trends, and predictive turnover analytics.',
        chips: ['People Analytics', 'Power BI', 'Headcount KPIs', 'Turnover Modeling'],
        color1: '#0e7490',
        color2: '#06b6d4',
        icon: '📊'
      },
      {
        tag: 'DATA GOVERNANCE',
        title: 'Employee Data Quality',
        sub: 'Automated data integrity audit and SOE compliance monitoring system.',
        chips: ['SOE Standards', 'Data Auditing', 'Automated Verification'],
        color1: '#1d4ed8',
        color2: '#818cf8',
        icon: '🛡️'
      },
      {
        tag: 'WORKFLOW AUTOMATION',
        title: 'HR Digital Form (PowerApps)',
        sub: 'Self-service administrative requests integrated directly with core HR databases.',
        chips: ['Microsoft PowerApps', 'Power Automate', 'Zero-Paper HR'],
        color1: '#7c3aed',
        color2: '#a855f7',
        icon: '📱'
      },
      {
        tag: 'ENTERPRISE ARCHITECTURE',
        title: 'System Requirements & Design',
        sub: 'Translating business HR requirements into robust technical specifications.',
        chips: ['User Story Mapping', 'SDLC', 'Schema Design', 'Process Mapping'],
        color1: '#2563eb',
        color2: '#38bdf8',
        icon: '🧩'
      }
    ];

    const slideGroup = new THREE.Group();
    sceneBg.add(slideGroup);

    const slideSpacing = 6.2;
    projectSlides.forEach((slide, idx) => {
      const c = document.createElement('canvas');
      c.width = 900;
      c.height = 540;
      const ctx = c.getContext('2d');

      // Card Background Gradient
      const grad = ctx.createLinearGradient(0, 0, 900, 540);
      grad.addColorStop(0, slide.color1);
      grad.addColorStop(1, '#090d16');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 900, 540);

      // Subtle Tech Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 900; x += 45) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 540);
        ctx.stroke();
      }
      for (let y = 0; y < 540; y += 45) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(900, y);
        ctx.stroke();
      }

      // Card Border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 4;
      ctx.strokeRect(10, 10, 880, 520);

      // Icon & Tag
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText(slide.icon, 55, 90);

      ctx.fillStyle = slide.color2;
      ctx.font = 'bold 22px monospace';
      ctx.fillText(slide.tag, 115, 84);

      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px sans-serif';
      ctx.fillText(slide.title, 55, 175);

      // Subtitle
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '24px sans-serif';
      ctx.fillText(slide.sub, 55, 235);

      // Chip Pills
      let chipX = 55;
      slide.chips.forEach((chip) => {
        ctx.font = '600 20px sans-serif';
        const txtWidth = ctx.measureText(chip).width;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.beginPath();
        ctx.roundRect(chipX, 300, txtWidth + 30, 44, 22);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.fillText(chip, chipX + 15, 330);

        chipX += txtWidth + 44;
      });

      // Bottom Barcode / Tech Accent
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '16px monospace';
      ctx.fillText(`PRASETYO NUGROHO • HUMAN CAPITAL & TECH • SLIDE 0${idx + 1}`, 55, 480);

      const tex = new THREE.CanvasTexture(c);
      const mat = new THREE.MeshBasicMaterial({ map: tex });
      const geo = new THREE.PlaneGeometry(5.2, 3.12);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(idx * slideSpacing, 0, 0);
      slideGroup.add(mesh);
    });

    // Background Floating Graphic Elements
    const ambientGroup = new THREE.Group();
    sceneBg.add(ambientGroup);
    for (let i = 0; i < 24; i++) {
      const pGeo = new THREE.SphereGeometry(0.08 + Math.random() * 0.12, 12, 12);
      const pMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(Math.random() > 0.5 ? 0x3b82f6 : 0x60a5fa),
        transparent: true,
        opacity: 0.35 + Math.random() * 0.4
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.position.set((Math.random() - 0.5) * 35, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4);
      ambientGroup.add(pMesh);
    }

    // ==========================================
    // Fluid Glass Transmission Optical Shader
    // Refraction with Chromatic Aberration & IOR
    // ==========================================
    const fluidGlassShader = {
      uniforms: {
        tBuffer: { value: fbo.texture },
        winResolution: { value: new THREE.Vector2(width * dpr, height * dpr) },
        ior: { value: 1.15 },
        chromaticAberration: { value: 0.08 },
        thickness: { value: 5.0 }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec4 vScreenPos;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
          vScreenPos = gl_Position;
        }
      `,
      fragmentShader: `
        uniform sampler2D tBuffer;
        uniform vec2 winResolution;
        uniform float ior;
        uniform float chromaticAberration;
        uniform float thickness;

        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec4 vScreenPos;

        void main() {
          vec2 screenUV = (vScreenPos.xy / vScreenPos.w) * 0.5 + 0.5;
          vec3 viewDir = normalize(vViewPosition);
          vec3 normal = normalize(vNormal);

          // Optical refraction displacement with chromatic separation
          float etaR = 1.0 / (ior - chromaticAberration);
          float etaG = 1.0 / ior;
          float etaB = 1.0 / (ior + chromaticAberration);

          vec3 refractR = refract(-viewDir, normal, etaR);
          vec3 refractG = refract(-viewDir, normal, etaG);
          vec3 refractB = refract(-viewDir, normal, etaB);

          float factor = (thickness * 0.015);
          vec2 uvR = screenUV + refractR.xy * factor;
          vec2 uvG = screenUV + refractG.xy * factor;
          vec2 uvB = screenUV + refractB.xy * factor;

          float colR = texture2D(tBuffer, uvR).r;
          float colG = texture2D(tBuffer, uvG).g;
          float colB = texture2D(tBuffer, uvB).b;

          // Fresnel glass reflection rim
          float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.8);
          vec3 glassTint = vec3(colR, colG, colB) + vec3(0.7, 0.85, 1.0) * fresnel * 0.4;

          gl_FragColor = vec4(glassTint, 1.0);
        }
      `
    };

    const glassMat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(fluidGlassShader.uniforms),
      vertexShader: fluidGlassShader.vertexShader,
      fragmentShader: fluidGlassShader.fragmentShader
    });
    glassMat.uniforms.tBuffer.value = fbo.texture;

    // ==========================================
    // 3D Glass Geometries (Lens, Cube, Bar)
    // ==========================================
    // 1. Lens Geometry (Convex Magnifying Glass Lens)
    const lensGeo = new THREE.SphereGeometry(1.5, 64, 32);
    lensGeo.scale(1.0, 1.0, 0.28);
    const lensMesh = new THREE.Mesh(lensGeo, glassMat);
    lensMesh.position.set(0, 0, 3.5);

    // 2. Cube Geometry (Rotating Crystal Cube Prism)
    const cubeGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const cubeMesh = new THREE.Mesh(cubeGeo, glassMat);
    cubeMesh.position.set(0, 0, 3.5);

    // 3. Bar Geometry (Bottom Fluid Glass Dock)
    const barGeo = new THREE.BoxGeometry(4.8, 0.75, 0.35);
    const barMesh = new THREE.Mesh(barGeo, glassMat);
    barMesh.position.set(0, -1.5, 3.5);

    // Active mode state
    let activeMode = 'lens';
    let currentMesh = lensMesh;
    sceneMain.add(currentMesh);

    function setMode(mode) {
      activeMode = mode;
      sceneMain.remove(currentMesh);

      if (mode === 'lens') {
        currentMesh = lensMesh;
        glassMat.uniforms.thickness.value = 5.0;
        glassMat.uniforms.ior.value = 1.15;
      } else if (mode === 'cube') {
        currentMesh = cubeMesh;
        glassMat.uniforms.thickness.value = 6.5;
        glassMat.uniforms.ior.value = 1.22;
      } else if (mode === 'bar') {
        currentMesh = barMesh;
        glassMat.uniforms.thickness.value = 8.0;
        glassMat.uniforms.ior.value = 1.15;
      }
      sceneMain.add(currentMesh);

      modeButtons.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
      });
    }

    modeButtons.forEach((btn) => {
      btn.addEventListener('click', () => setMode(btn.dataset.mode));
    });

    // ==========================================
    // Slide Navigation
    // ==========================================
    let activeSlide = 0;
    let targetSlideX = 0;

    function setSlide(idx) {
      activeSlide = idx;
      targetSlideX = -idx * slideSpacing;
      slideTabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === idx);
      });
    }

    slideTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        setSlide(Number(tab.dataset.slide));
      });
    });

    // Horizontal wheel to slide
    stage.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        if (e.deltaX > 20 && activeSlide < projectSlides.length - 1) {
          setSlide(activeSlide + 1);
        } else if (e.deltaX < -20 && activeSlide > 0) {
          setSlide(activeSlide - 1);
        }
      }
    }, { passive: false });

    // Pointer Interaction (Normalized -1 to +1)
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;

    function onPointerMove(e) {
      const rect = stage.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetPointerX = Math.max(-1, Math.min(1, x));
      targetPointerY = Math.max(-1, Math.min(1, y));
    }

    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerleave', () => {
      targetPointerX = 0;
      targetPointerY = 0;
    });

    // Resize Handler
    function onResize() {
      width = stage.clientWidth;
      height = stage.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setSize(width, height);
      renderer.setPixelRatio(dpr);

      fbo.setSize(width * dpr, height * dpr);
      glassMat.uniforms.winResolution.value.set(width * dpr, height * dpr);

      updateQuadSize();
    }
    window.addEventListener('resize', onResize);

    // ==========================================
    // Render Animation Loop
    // ==========================================
    let clock = new THREE.Clock();

    function animate() {
      const delta = Math.min(clock.getDelta(), 0.05);
      const time = clock.getElapsedTime();

      // Smooth mouse follow with inertial damping
      pointerX += (targetPointerX - pointerX) * 0.12;
      pointerY += (targetPointerY - pointerY) * 0.12;

      // Smooth slide transition
      slideGroup.position.x += (targetSlideX - slideGroup.position.x) * 0.08;

      // Gentle floating animation of background particles
      ambientGroup.children.forEach((p, idx) => {
        p.position.y += Math.sin(time + idx) * 0.002;
      });

      // Glass object positioning based on active mode
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const vHeight = 2 * Math.tan(vFOV / 2) * (camera.position.z - currentMesh.position.z);
      const vWidth = vHeight * camera.aspect;

      if (activeMode === 'lens') {
        const destX = (pointerX * vWidth) * 0.42;
        const destY = (pointerY * vHeight) * 0.42;
        currentMesh.position.x += (destX - currentMesh.position.x) * 0.15;
        currentMesh.position.y += (destY - currentMesh.position.y) * 0.15;
        currentMesh.rotation.x = -pointerY * 0.25;
        currentMesh.rotation.y = pointerX * 0.25;
      } else if (activeMode === 'cube') {
        const destX = (pointerX * vWidth) * 0.38;
        const destY = (pointerY * vHeight) * 0.38;
        currentMesh.position.x += (destX - currentMesh.position.x) * 0.14;
        currentMesh.position.y += (destY - currentMesh.position.y) * 0.14;
        currentMesh.rotation.x += 0.015;
        currentMesh.rotation.y += 0.02;
      } else if (activeMode === 'bar') {
        // Locked to bottom
        currentMesh.position.set(0, -vHeight * 0.34, 3.5);
        currentMesh.rotation.y = pointerX * 0.08;
      }

      // Step 1: Render background scene into FBO buffer
      renderer.setRenderTarget(fbo);
      renderer.render(sceneBg, camera);

      // Step 2: Render main scene (buffer quad + fluid glass mesh) to screen
      renderer.setRenderTarget(null);
      renderer.render(sceneMain, camera);

      requestAnimationFrame(animate);
    }

    animate();
  }

  // Launch when page is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();

// ==========================================
// Typewriter Animation for Hero Section
// ==========================================
(function initTypewriter() {
  const textElement = document.getElementById('typewriter-text');
  if (!textElement) return;

  const words = [
    "Human Capital Officer",
    "People Analytics",
    "HR Tech Specialist"
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  // Timings (in milliseconds)
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseEnd = 2000;
  const pauseStart = 500;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Remove a character
      textElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Add a character
      textElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      // Finished typing word, pause before deleting
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting word, switch to next word and pause before typing
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = pauseStart;
    }

    // Add some random variation to typing speed for realism
    if (!isDeleting && charIndex !== currentWord.length) {
      delay += Math.random() * 50;
    }

    setTimeout(type, delay);
  }

  // Start the typing effect after a short initial delay
  setTimeout(type, 1000);
})();

// ==========================================
// Projects Slider Logic
// ==========================================
(function initProjectsSlider() {
  const slider = document.getElementById('projects-slider');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');
  
  if (!slider || !prevBtn || !nextBtn || !dotsContainer) return;

  const cards = slider.querySelectorAll('.project-card');
  const cardCount = cards.length;
  if (cardCount === 0) return;

  // Create dots
  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
    
    dot.addEventListener('click', () => {
      scrollToCard(index);
    });
  });

  const dots = dotsContainer.querySelectorAll('.slider-dot');

  function updateDots(activeIndex) {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  }

  function getActiveIndex() {
    // Calculate based on scroll position
    const scrollLeft = slider.scrollLeft;
    const cardWidth = slider.clientWidth;
    return Math.round(scrollLeft / cardWidth);
  }

  function scrollToCard(index) {
    if (index < 0) index = 0;
    if (index >= cardCount) index = cardCount - 1;
    const cardWidth = slider.clientWidth;
    // Account for the gap between cards if needed, but flex 100% and gap 20px usually snaps easily
    slider.scrollTo({
      left: index * (cardWidth + 20), // 20 is the gap
      behavior: 'smooth'
    });
  }

  prevBtn.addEventListener('click', () => {
    let index = getActiveIndex();
    scrollToCard(index - 1);
  });

  nextBtn.addEventListener('click', () => {
    let index = getActiveIndex();
    scrollToCard(index + 1);
  });

  // Listen to scroll events to update dots actively while swiping/scrolling
  let scrollTimeout;
  slider.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      updateDots(getActiveIndex());
    }, 50);
  });
})();

// ==========================================
// Custom Glow Cursor Logic
// ==========================================
(function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const cursorGlow = document.getElementById('custom-cursor-glow');
  
  if (!cursor || !cursorGlow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate update for dot (using standard top/left or transform)
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  // Smooth follow for glow
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;
    
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // Hover states on interactive elements
  const interactables = document.querySelectorAll('a, button, .glass-card, .id-card-3d, input, textarea');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorGlow.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorGlow.classList.remove('hover');
    });
  });
})();
