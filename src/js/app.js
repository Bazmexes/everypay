const burgerButton = document.getElementById('burgerButton')
const mobileMenu = document.getElementById('mobileMenu')
const body = document.querySelector('body')

burgerButton.addEventListener('click', ()=>{
    mobileMenu.classList.toggle('header__nav_active')
    body.classList.toggle('body_active')
})