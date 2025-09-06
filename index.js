





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


// ===== SLIDER GSAP + ScrollTrigger =====
document.addEventListener("DOMContentLoaded", function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP ou ScrollTrigger não carregados. Verifique se os <script> CDN estão antes do index.js');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  const slider = document.querySelector('#o-que-fazemos .container-slider');
  const slides = gsap.utils.toArray('#o-que-fazemos .slide');

  if (!slider || slides.length === 0) return;

  // preparo inicial
  slides.forEach((s, i) => {
    s.classList.remove('visible');
    gsap.set(s, { autoAlpha: 0, yPercent: 5, zIndex: slides.length - i });
  });
  slides[0].classList.add('visible');
  gsap.set(slides[0], { autoAlpha: 1, yPercent: 0 });

  // função que calcula o tamanho total do scroll (reavaliada no refresh)
  const totalScroll = () => window.innerHeight * slides.length;

  // timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: slider,
      start: "top top",
      end: () => "+=" + totalScroll(),
      scrub: 0.6,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  slides.forEach((slide, i) => {
    // entrada do slide
    tl.to(slide, { autoAlpha: 1, yPercent: 0, duration: 1 }, i);

    // atualiza classe visible (leve delay para garantir render)
    tl.call(() => {
      slides.forEach(s => s.classList.remove('visible'));
      slide.classList.add('visible');
    }, null, i + 0.01);

    // saída (exceto o último)
    if (i !== slides.length - 1) {
      tl.to(slide, { autoAlpha: 0, yPercent: -20, duration: 1 }, i + 0.85);
    }
  });

  // ao redimensionar, o end será recalculado (invalidateOnRefresh true)
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
});
