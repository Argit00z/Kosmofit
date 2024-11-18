let lastScroll = 0;
const header = document.querySelector('header');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;

window.addEventListener('scroll', () => {
    if (scrollPosition() === 0) {
        // Если мы находимся в самом верху
        header.classList.remove('hide');
    } else if (scrollPosition() > lastScroll) {
        // Прокрутка вниз
        header.classList.add('hide');
    } 

    lastScroll = scrollPosition();
});

