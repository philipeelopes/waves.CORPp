

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

  // timeline que controla os slides
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
    // entrada
    tl.to(slide, { opacity: 1, y: 0, duration: 0.8 }, i);

    // saída (menos o último)
    if (i < slides.length - 1) {
      tl.to(slide, { opacity: 0, y: -40, duration: 0.8 }, i + 0.7);
    }
  });
});
