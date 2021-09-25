let main = document.querySelector('.tl-rp-main-container');
let mainopen = false;

let hamburger =  document.querySelector('.tl-navi-bar-responsive').onclick = () => {
    if(mainopen) {
        main.style.display = 'block';
    } else {
        main.style.display = 'none';
    }
    mainopen = !mainopen;
};