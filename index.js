

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







gsap.registerPlugin(ScrollTrigger);

const slides = gsap.utils.toArray("#o-que-fazemos .slide");

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#o-que-fazemos",
    start: "top top",
    end: "+=" + (slides.length * 100) + "%",
    scrub: true,
    pin: true,
    pinSpacing: true,
    // markers: true // descomente para debug
  }
});

slides.forEach((slide, i) => {
  const img = slide.querySelector("img");
  const texto = slide.querySelector(".texto-slide");

  // Aparece o slide inteiro (opacity 1)
  tl.to(slide, {
    opacity: 1,
    duration: 0.1,
    ease: "none"
  }, i * 1.5);

  // Anima a imagem vindo de baixo para cima
  tl.to(img, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power1.out"
  }, i * 1.5);

  // Anima o texto vindo de baixo para cima, com pequeno delay
  tl.to(texto, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power1.out"
  }, i * 1.5 + 0.2);

  // Desaparece o slide (imagem, texto e slide juntos) antes do próximo aparecer
  if (i !== slides.length - 1) {
    tl.to([img, texto, slide], {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: "power1.in"
    }, i * 1.5 + 1);
  }
});