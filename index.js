  window.addEventListener("load", function () {
    // só aplica se for tela mobile (até 768px)
    if (window.innerWidth <= 768) {
      // remove qualquer hash da URL
      if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
      }

      // força scroll para o topo
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  });




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
  const cards = document.querySelectorAll(".impact-card");

  // Cria o observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show"); // reseta ao sair da tela
      }
    });
  }, { threshold: 0.2 });

  // Define esquerda/direita com base na posição na grid
  cards.forEach((card, index) => {
    // se for par → esquerda | ímpar → direita
    if (index % 2 === 0) {
      card.classList.add("left");
    } else {
      card.classList.add("right");
    }

    observer.observe(card);
  });
});










  document.addEventListener("DOMContentLoaded", function () {
    const el = document.getElementById("titulo");
    
    const speed = 100;
    typeHTML(el, speed);
  });

  async function typeHTML(container, speed = 80) {
    const originalHTML = container.innerHTML;
    
    container.innerHTML = "";

  
    const temp = document.createElement("div");
    temp.innerHTML = originalHTML;

    
    const cursor = document.createElement("span");
    cursor.className = "typewriter-cursor";
    container.appendChild(cursor);

    
    const observer = new MutationObserver(() => {
      if (container.lastChild !== cursor) {
        container.appendChild(cursor);
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    function wait(ms) { return new Promise(res => setTimeout(res, ms)); }

   
    async function processNode(parent, node) {
      if (node.nodeType === Node.TEXT_NODE) {
       
        const textNode = document.createTextNode("");
        parent.appendChild(textNode);
        const text = node.nodeValue;
        for (let i = 0; i < text.length; i++) {
          textNode.nodeValue += text.charAt(i);
          await wait(speed);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
       
        const clone = node.cloneNode(false);
        parent.appendChild(clone);
       
        for (let child of node.childNodes) {
          await processNode(clone, child);
        }
      } else {
        
      }
    }

    for (let child of temp.childNodes) {
      await processNode(container, child);
    }

    observer.disconnect();
    
     cursor.remove();  
  }










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
  let auto = setInterval(goNext, 7000);

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












