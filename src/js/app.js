const burgerButton = document.getElementById('burgerButton')
const mobileMenu = document.getElementById('mobileMenu')
const body = document.querySelector('body')

burgerButton.addEventListener('click', ()=>{
    mobileMenu.classList.toggle('header__nav_active')
    body.classList.toggle('body_active')
})
// var swiper = new Swiper('.swiper-container', {
//     slidesPerView: 'auto',
//     spaceBetween: 30,
//     pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//     },
//   });
let width = window.innerWidth
console.log(width)
var between;
if(width<375){
    between=230
}else if(width<420){
    between=180
}else if(width<500){
    between=150
}else if(width<550){
    between=100
}else if(width<600){
    between=30
}
else if(width>700){
    between=0
}
console.log(between)
var slides;

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween: between,
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });