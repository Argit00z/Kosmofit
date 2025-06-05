// Slider functionality
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
const prevArrow = document.querySelector('.slider-arrow.prev');
const nextArrow = document.querySelector('.slider-arrow.next');

let currentSlide = 0;
let isAnimating = false;
const slideCount = slides.length;

function showSlide(index) {
    if (isAnimating) return;
    
    isAnimating = true;
    
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Calculate the new slide index
    currentSlide = index;
    
    // Handle looping
    if (currentSlide < 0) {
        currentSlide = slideCount - 1;
    } else if (currentSlide >= slideCount) {
        currentSlide = 0;
    }
    
    // Update slider position
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Add active class to current slide
    slides[currentSlide].classList.add('active');
    
    // Update active dot
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
    
    isAnimating = false;
}

// Initialize slider
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Arrow navigation
prevArrow.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

nextArrow.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Auto slide
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Modal functionality
const modal = document.getElementById('qr-modal');
const closeBtn = document.querySelector('.close');
const showQrButtons = document.querySelectorAll('.show-qr');
const membershipName = document.getElementById('membership-name');

showQrButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = button.closest('.card');
        const title = card.querySelector('h2').textContent;
        membershipName.textContent = title;
        modal.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Initialize first slide
setTimeout(() => {
    showSlide(0);
}, 100);