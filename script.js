const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const metricObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('[data-count]').forEach(counter => {
      const end = Number(counter.dataset.count);
      let current = 0;
      const timer = setInterval(() => {
        current += 1;
        counter.textContent = `${current}+`;
        if (current >= end) clearInterval(timer);
      }, 120);
    });
    metricObserver.unobserve(entry.target);
  });
}, { threshold: 0.35 });

const metrics = document.querySelector('.metrics');
if (metrics) metricObserver.observe(metrics);

document.getElementById('year').textContent = new Date().getFullYear();

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', event => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const tiltCard = document.querySelector('.tilt-card');
if (tiltCard && window.matchMedia('(pointer: fine)').matches) {
  tiltCard.addEventListener('pointermove', event => {
    const rect = tiltCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltCard.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${y * -7}deg)`;
  });
  tiltCard.addEventListener('pointerleave', () => {
    tiltCard.style.transform = 'perspective(900px) rotateY(0) rotateX(0)';
  });
}
