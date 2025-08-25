window,addEventListener("scroll", function() {
    let header = this.document.querySelector('#menu')
    header.classList.toggle('rolagem',window.scrollY > 300)
})





