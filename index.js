
window.addEventListener('scroll', function(){
   let header = document.querySelector('#menu')
    header.classList.toggle('rolagem',window.scrollY > 500)


})

const menuBtn = document.getElementById('menu-btn');
const menuIcon = document.getElementById('menu-icon');
const nav = document.getElementById('nav');

function closeMenu() {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuIcon.textContent = 'menu';
}

menuBtn.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(opened));
  menuIcon.textContent = opened ? 'close' : 'menu';
});

document.querySelectorAll('#nav a').forEach(a => {
  a.addEventListener('click', closeMenu);
});


const imagem = document.querySelector('.imagem')

const myObserver = new IntersectionObserver( (entries) =>{
 entries.forEach ( (entry) =>{
  if(entry.isIntersecting){
    entry.target.classList.add('show')
  } else{
    entry.target.classList.remove('show')
  }
    
 });
});

const elements = document.querySelectorAll('.hidden',)

elements.forEach( (element) => myObserver.observe (element))

window.addEventListener('load', () => {
  const banner = document.querySelector('.banner');
  banner.classList.add('show');
});



document.addEventListener('DOMContentLoaded', function () {
  const section = document.querySelector('#o-que-fazemos');
  if (!section) return;

  const sliderRoot = section.querySelector('.container-slider');
  const slides = Array.from(sliderRoot.querySelectorAll('.slide'));
  if (!slides.length) return;

  // remove spacers antigos (se houver)
  section.querySelectorAll('.spacer').forEach(s => s.remove());

  // cria um spacer (100vh) por slide e adiciona ao final da seção
  slides.forEach((_, i) => {
    const spacer = document.createElement('div');
    spacer.className = 'spacer';
    spacer.dataset.index = i;
    section.appendChild(spacer);
  });

  // função para mostrar slide por índice
  function show(index) {
    index = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
  }

  // start com o primeiro slide ativo
  show(0);

  // observer que detecta qual spacer está visível (meio/centro da viewport)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Number(entry.target.dataset.index || 0);
        show(idx);
      }
    });
  }, {
    root: null,
    threshold: 0.5
  });

  section.querySelectorAll('.spacer').forEach(s => observer.observe(s));

  // teclas para navegar (opcional)
  document.addEventListener('keydown', e => {
    const current = slides.findIndex(s => s.classList.contains('active'));
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      const next = Math.min(current + 1, slides.length - 1);
      const target = section.querySelector(`.spacer[data-index="${next}"]`);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      const prev = Math.max(current - 1, 0);
      const target = section.querySelector(`.spacer[data-index="${prev}"]`);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});






