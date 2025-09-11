

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
    end: "+=" + (slides.length * 80) + "%", 
    scrub: 1.2, // suaviza o movimento
    pin: true,
    pinSpacing: true,
    // markers: true
  }
});

slides.forEach((slide, i) => {
  const img = slide.querySelector("img");
  const texto = slide.querySelector(".texto-slide");

  // Slide aparece (fade)
  tl.to(slide, { opacity: 1, duration: 0.6, ease: "power2.out" }, i);

  // Imagem entra de baixo
  tl.fromTo(img, 
    { opacity: 0, y: 80 },   // <- começa embaixo
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 
    i
  );

  // Texto entra de baixo também
  tl.fromTo(texto, 
    { opacity: 0, y: 80 },   // <- começa embaixo
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 
    i + 0.2
  );

  // Slide some antes do próximo
  if (i !== slides.length - 1) {
    tl.to(slide, { opacity: 0, y: -40, duration: 0.6, ease: "power2.in" }, i + 0.9);
  }
});
