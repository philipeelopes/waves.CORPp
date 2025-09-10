

// ===== menu / header toggle =====
window.addEventListener('scroll', function(){
  const header = document.querySelector('#menu');
  if (header) header.classList.toggle('rolagem', window.scrollY > 500);
});

const menuBtn = document.getElementById('menu-btn');
const menuIcon = document.getElementById('menu-icon');
const nav = document.getElementById('nav');
if (menuBtn) {
  function closeMenu() {
    if (nav) nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    if (menuIcon) menuIcon.textContent = 'menu';
  }

  menuBtn.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(opened));
    if (menuIcon) menuIcon.textContent = opened ? 'close' : 'menu';
  });

  document.querySelectorAll('#nav a').forEach(a => a.addEventListener('click', closeMenu));
}

// ===== intersection observer para .hidden (outras seções) =====
const myObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
    else entry.target.classList.remove('show');
  });
}, { threshold: 0.2 });

document.querySelectorAll('.hidden').forEach(el => myObserver.observe(el));

// banner on load
window.addEventListener('load', () => {
  const banner = document.querySelector('.banner');
  if (banner) banner.classList.add('show');
});









document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const slides = gsap.utils.toArray("#o-que-fazemos .slide");

  // Inicializa: só o primeiro slide visível
  slides.forEach((slide, i) => {
    if(i === 0) slide.classList.add('active');
    else slide.classList.remove('active');
  });

  // Timeline para animar os slides com ScrollTrigger e pin
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#o-que-fazemos",
      start: "top top",
      end: () => "+=" + (slides.length * window.innerHeight),
      scrub: true,
      pin: true,
      anticipatePin: 1
    }
  });

  slides.forEach((slide, i) => {
    // Fade in do slide atual
    tl.to(slide, {opacity: 1, duration: 1}, i);

    // Marca slide como ativo para mostrar pointer-events e classe
    tl.call(() => {
      slides.forEach(s => s.classList.remove('active'));
      slide.classList.add('active');
    }, null, i);

    // Fade out do slide atual (menos o último)
    if(i < slides.length - 1) {
      tl.to(slide, {opacity: 0, duration: 1}, i + 0.9);
    }
  });
});

