function responsiveMenu() {
    document.getElementById("menu").classList.remove('unactive');
    document.getElementById("menu").classList.toggle('active');
}

function closeMenu() {
    if(window.screen.width <= 400){
        document.getElementById("menu").classList.remove('active');
        document.getElementById("menu").classList.toggle('unactive');   
    }
}

