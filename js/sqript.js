const images = ['ofp_b.jpg', 'trenajer.jpg', 'logo.jpg'];

let activeImage = 0;
const sliderPlace = document.querySelector('.slider-line');
const widthOffset = document.querySelector('.slider').offsetWidth;
sliderPlace.style.width = 3 * widthOffset + 'px';
sliderPlace.style.height = widthOffset + 'px';
sliderPlace.style.left = '-' + widthOffset + 'px';
let flag = true;

const initSlider = () => {
    const img = document.createElement('img');
    img.alt = '';
    img.src = './photo/' + images[activeImage];
    sliderPlace.append(img);
    nextImageGenerator();
    prevImageGenerator();
    
};

const nextImageGenerator = () => {
    let nextImage = activeImage + 1;
    if (nextImage >= images.length) {
        nextImage = 0;
    } 
    const img = document.createElement('img');
    img.alt = '';
    img.src = './photo/' + images[nextImage];
    sliderPlace.append(img);
};
const prevImageGenerator = () => {
    let prevImage = activeImage - 1;
    if (prevImage < 0) {
        prevImage = images.length - 1;
    }
    const img = document.createElement('img');
    img.alt = '';
    img.src = './photo/' + images[prevImage];
    sliderPlace.prepend(img);
};
const nextSlide = () => {
    activeImage++;
    if (activeImage >= images.length) {
        activeImage = 0;
    }
    //document.querySelector('.slider-line img').remove();
    nextImageGenerator();
    animate({
        duration: 1000,
        draw: function(progress) {
            document.querySelector('.slider-line img').style.width = (widthOffset * (1 - progress)) + 'px'
        },
        removeElement: document.querySelector('.slider-line img')
    });

};

const prevSlide = () => {
    activeImage--;
    if (activeImage < 0) {
        activeImage = images.length - 1;
    }
    document.querySelector('.slider-line img:last-child').remove();
    prevImageGenerator();

};

initSlider();

document.querySelector('.next-button').addEventListener('click', nextSlide);
document.querySelector('.prev-button').addEventListener('click', prevSlide);

const animate = ({duration, draw, removeElement}) => {
    const start = performance.now();

    requestAnimationFrame(function animate(time) {
        let step = (time - start) / duration;
        if (step > 1) {
            step = 1;
        }
        draw(step);
        if (step < 1){
            requestAnimationFrame(animate);
        } else {
            removeElement.remove();
        }   
    });
}