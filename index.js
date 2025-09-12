

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

// Definir estados iniciais
slides.forEach((s, idx) => {
  const img = s.querySelector("img");
  const text = s.querySelector(".texto-slide");

  if (idx === 0) {
    // primeiro slide visível no carregamento
    gsap.set(s, { opacity: 1 });
    gsap.set([img, text], { opacity: 1, y: 0 });
  } else {
    // outros começam invisíveis
    gsap.set(s, { opacity: 0 });
    gsap.set([img, text], { opacity: 0, y: 80 });
  }
});

// Timeline com scroll
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#o-que-fazemos",
    start: "top top",
    end: "+=" + (slides.length * 80) + "%",
    scrub: 1.2,
    pin: true,
    pinSpacing: true,
    // markers: true
  }
});

slides.forEach((slide, i) => {
  const img = slide.querySelector("img");
  const texto = slide.querySelector(".texto-slide");

  // Mostra o slide
  tl.to(slide, { opacity: 1, duration: 0.6, ease: "power2.out" }, i);

  if (i !== 0) {
    // anima apenas os que não são o primeiro
    tl.to(img, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, i);
    tl.to(texto, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, i + 0.2);
  }

  // Faz sumir antes do próximo
  if (slides.length - 1) {
    tl.to(slide, { opacity: 0, y: -40, duration: 0.6, ease: "power2.in" }, i + 0.9);
  }
});
