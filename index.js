
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





