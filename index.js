
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



