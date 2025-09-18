

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






document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth > 768) return; // só roda no mobile

  const cards = Array.from(document.querySelectorAll('.impact-card'));
  if (!cards.length) return;

  let current = 0;
  let isAnimating = false;
  const duration = 700;
  let startX = 0;
  let endX = 0;

  // estado inicial
  cards.forEach((c, i) => {
    if (i === current) {
      c.classList.add('active');
      c.style.transform = 'translateX(0)';
      c.style.opacity = '1';
    } else {
      c.style.transform = 'translateX(100%)';
      c.style.opacity = '0';
    }
  });

  function goTo(nextIndex, direction = 1) {
    if (isAnimating || nextIndex === current) return;
    isAnimating = true;

    const outgoing = cards[current];
    const incoming = cards[nextIndex];

    // prepara o incoming (entra pela direita se direction=1, pela esquerda se -1)
    incoming.style.transition = 'none';
    incoming.style.transform = `translateX(${direction * 100}%)`;
    incoming.style.opacity = '1';
    void incoming.offsetWidth; // força reflow
    incoming.style.transition = '';

    // anima
    outgoing.style.transform = `translateX(${direction * -100}%)`;
    outgoing.style.opacity = '0';
    incoming.classList.add('active');
    incoming.style.transform = 'translateX(0)';

    const cleanup = () => {
      outgoing.classList.remove('active');
      outgoing.removeEventListener('transitionend', cleanup);
      isAnimating = false;
    };
    outgoing.addEventListener('transitionend', cleanup);
    setTimeout(() => { if (isAnimating) cleanup(); }, duration + 100);

    current = nextIndex;
  }

  function goNext() {
    goTo((current + 1) % cards.length, 1);
  }

  function goPrev() {
    goTo((current - 1 + cards.length) % cards.length, -1);
  }

  // autoplay
  let auto = setInterval(goNext, 4000);

  // swipe detect
  const container = document.querySelector('.impact-grid');
  container.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    endX = startX;
    clearInterval(auto); // pausa autoplay enquanto arrasta
  });

  container.addEventListener('touchmove', e => {
    endX = e.touches[0].clientX;
  });

  container.addEventListener('touchend', () => {
    const diff = endX - startX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) goNext(); // arrastou para esquerda
      else goPrev(); // arrastou para direita
    }
    auto = setInterval(goNext, 4000); // retoma autoplay
  });
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
    end: "+=" + (slides.length *  window.innerHeight) ,
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





// Desativa animação no mobile (<=768px)
function handleResize() {
  if (window.innerWidth <= 768) {
    // mata todos os triggers
    ScrollTrigger.getAll().forEach(st => st.kill());

    // limpa estilos dos slides
    document.querySelectorAll("#o-que-fazemos .slide").forEach(s => {
      gsap.set(s, { clearProps: "all" });
      const img = s.querySelector("img");
      const text = s.querySelector(".texto-slide");
      if (img) gsap.set(img, { clearProps: "all" });
      if (text) gsap.set(text, { clearProps: "all" });
    });
  }
}

// roda na carga e no resize
handleResize();
window.addEventListener("resize", handleResize);






