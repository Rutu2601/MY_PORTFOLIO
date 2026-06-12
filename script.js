/* =========================
   NAVBAR SCROLL EFFECT
========================= */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* =========================
   MOBILE MENU
========================= */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

/* =========================
   FADE IN ANIMATION
========================= */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 55);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fi').forEach(el => io.observe(el));

/* =========================
   SCROLL PROGRESS BAR
========================= */
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';

document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;

  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  progressBar.style.width =
    (winScroll / height) * 100 + '%';
});

/* =========================
   CURSOR GLOW
========================= */
const glow = document.createElement('div');
glow.className = 'cursor-glow';

document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

/* =========================
   HERO TYPING EFFECT
========================= */
const typingElement =
  document.getElementById('typing-text');

if (typingElement) {

  const roles = [
    "AIML Developer",
    "Deep Learning Engineer",
    "Computer Vision Engineer",
    "AI Researcher"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {

    const current = roles[roleIndex];

    if (!deleting) {

      typingElement.textContent =
        current.substring(0, charIndex++);

      if (charIndex > current.length) {
        deleting = true;
        setTimeout(typeEffect, 1500);
        return;
      }

    } else {

      typingElement.textContent =
        current.substring(0, charIndex--);

      if (charIndex < 0) {
        deleting = false;
        roleIndex =
          (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeEffect,
      deleting ? 50 : 100);
  }

  typeEffect();
}

/* =========================
   PROJECT CARD 3D TILT
========================= */
document.querySelectorAll('.proj-card')
.forEach(card => {

  card.addEventListener('mousemove', e => {

    const rect =
      card.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    const rotateX =
      (y - rect.height / 2) / 15;

    const rotateY =
      -(x - rect.width / 2) / 15;

    card.style.transform =
      `perspective(1000px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-5px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });

});


/* =========================
   HERO CANVAS NETWORK
========================= */
const canvas = document.getElementById('hero-canvas');

if (canvas) {

  const ctx = canvas.getContext('2d');

  let W, H, nodes = [];

  function resize() {
    const hero = document.getElementById('hero');
    W = canvas.width = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }

  class Node {
    constructor() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r = Math.random() * 1.8 + 0.8;
      this.a = Math.random() * 0.55 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > W)
        this.vx *= -1;

      if (this.y < 0 || this.y > H)
        this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle =
        `rgba(167,139,250,${this.a})`;
      ctx.fill();
    }
  }

  function initNodes() {
    const n =
      Math.min(Math.floor((W * H) / 16000), 70);

    nodes =
      Array.from({ length: n },
      () => new Node());
  }

  function drawLines() {

    const MAX = 150;

    for (let i = 0; i < nodes.length; i++) {

      for (let j = i + 1; j < nodes.length; j++) {

        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;

        const d =
          Math.sqrt(dx * dx + dy * dy);

        if (d < MAX) {

          const a =
            (1 - d / MAX) * 0.22;

          ctx.beginPath();

          ctx.moveTo(
            nodes[i].x,
            nodes[i].y
          );

          ctx.lineTo(
            nodes[j].x,
            nodes[j].y
          );

          ctx.strokeStyle =
            `rgba(124,58,237,${a})`;

          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {

    ctx.clearRect(0, 0, W, H);

    drawLines();

    nodes.forEach(n => {
      n.update();
      n.draw();
    });

    requestAnimationFrame(animate);
  }

  resize();
  initNodes();
  animate();

  window.addEventListener('resize', () => {
    resize();
    initNodes();
  });
}

/* =========================
   CONTACT FORM
========================= */
function handleSubmit() {

  const name =
    document.getElementById('cf-name').value.trim();

  const email =
    document.getElementById('cf-email').value.trim();

  const subject =
    document.getElementById('cf-subject').value.trim();

  const msg =
    document.getElementById('cf-msg').value.trim();

  if (!name || !email || !msg) {

    alert(
      'Please fill in your name, email, and message.'
    );

    return;
  }

  const body =
    `Name: ${name}\nEmail: ${email}\n\n${msg}`;

  window.location.href =
    `mailto:riturajdusane@gmail.com?subject=${
      encodeURIComponent(subject || 'Portfolio Inquiry')
    }&body=${
      encodeURIComponent(body)
    }`;
}