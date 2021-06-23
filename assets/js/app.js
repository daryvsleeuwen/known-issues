import Slider from '../js/slider.js';

window.addEventListener('load', () =>{
    let succesflash = document.querySelector('.succesfull-flash');

    if(succesflash !== null){
        succesflash.addEventListener('animationend', (e) =>{
            if(e.animationName === 'fade-scale-out'){
                succesflash.remove();
            }
        });

        setTimeout(() =>{
            // succesflash.classList.add('fade-scale-out');
            succesflash.remove();
        }, 2000);
    }
});

let loginscreen = document.querySelector('.login-screen');

if(loginscreen !== null){
    let registerlinker = loginscreen.querySelector('.register-linker');
    let loginarrow = loginscreen.querySelector('.login-back-arrow');

    let slider = new Slider({
        sliderparent: loginscreen.querySelector(".login-box"),
        slideables: loginscreen.querySelectorAll('.login-slider-box'),
        margins: 100,
    });

    registerlinker.addEventListener('click', () =>{
        slider.slideTo(1);
    });

    loginarrow.addEventListener('click', () =>{
        slider.slideTo(0);
    });
}
