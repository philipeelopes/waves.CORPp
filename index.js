
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
    
 })
})

const elements = document.querySelectorAll('.hidden', '#hidden')

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

  // botões agora estão fora do container
  const btnPrev = section.querySelector('#prev-button');
  const btnNext = section.querySelector('#next-button');

  let current = slides.findIndex(s => s.classList.contains('active'));
  if (current === -1) {
    current = 0;
    if (slides[0]) slides[0].classList.add('active');
  }

  function show(index) {
    index = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    current = index;
  }

  btnPrev && btnPrev.addEventListener('click', () => show(current - 1));
  btnNext && btnNext.addEventListener('click', () => show(current + 1));

  sliderRoot.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
  sliderRoot.setAttribute('tabindex', '0');
});






