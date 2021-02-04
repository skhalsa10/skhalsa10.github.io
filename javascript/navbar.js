//mobile menu

const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#navbar-menu-links');

burgerIcon.addEventListener('click', ()=>{
    navbarMenu.classList.toggle('is-active');
    burgerIcon.classList.toggle('is-active');
});
