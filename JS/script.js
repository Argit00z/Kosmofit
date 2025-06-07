// === Инициализация слайдера ===
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevArrow = document.querySelector('.slider-arrow.prev');
const nextArrow = document.querySelector('.slider-arrow.next');
const dotsContainer = document.querySelector('.slider-nav');
let dots = document.querySelectorAll('.slider-dot');
const slideCount = slides.length;
let currentSlide = 0;
let isAnimating = false;
let autoSlideInterval;
let touchStartX = 0;
let touchEndX = 0;

// === Функциональность выбора клуба ===
document.addEventListener('DOMContentLoaded', function() {
    const clubSelector = document.querySelector('.club-selector');
    const clubToggle = document.querySelector('.club-selector-toggle');
    const currentClubName = document.querySelector('.current-club-name');
    const currentClubAddress = document.querySelector('.current-club-address');
    const clubOptions = document.querySelectorAll('.club-option');

    // Инициализация активного клуба на основе текущей страницы
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageToClubMap = {
        'index.html': 'gagarina',
        'index2.html': 'navigator'
    };
    const activeClub = pageToClubMap[currentPage] || 'gagarina';

    clubOptions.forEach(opt => opt.classList.remove('active'));
    const activeOption = document.querySelector(`.club-option[data-club="${activeClub}"]`);
    if (activeOption) {
        activeOption.classList.add('active');
        const clubName = activeOption.querySelector('.club-name').textContent;
        const clubAddress = activeOption.querySelector('.club-address').textContent;
        currentClubName.textContent = clubName;
        currentClubAddress.textContent = clubAddress;
    }

    // Открытие/закрытие меню
    clubToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        clubSelector.classList.toggle('active');
    });

    // Выбор клуба
    clubOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedClub = this.getAttribute('data-club');
            clubOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const clubName = this.querySelector('.club-name').textContent;
            const clubAddress = this.querySelector('.club-address').textContent;
            currentClubName.textContent = clubName;
            currentClubAddress.textContent = clubAddress;
            clubSelector.classList.remove('active');
            console.log('Выбран клуб:', selectedClub);
            updateClubInfo(selectedClub);
        });
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', function(e) {
        if (!clubSelector.contains(e.target)) {
            clubSelector.classList.remove('active');
        }
    });

    // Функция для обновления информации о клубе
    function updateClubInfo(clubId) {
        if (clubId === 'gagarina') {
            console.log('Загружаем данные для ул. Гагарина');
        } else if (clubId === 'navigator') {
            console.log('Загружаем данные для ТЦ Навигатор');
        }
    }
});

// === Функции слайдера ===
function showSlide(index, direction = 1) {
    console.log('Вызвана функция showSlide с индексом:', index);
    if (isAnimating) return;
    isAnimating = true;
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (index + slideCount) % slideCount;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    const isMobile = window.innerWidth <= 576;
    slider.style.transition = isMobile ? 'transform 0.5s ease' : 'transform 0.8s ease-in-out';
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    setTimeout(() => {
        slides[currentSlide].classList.add('active');
        updateDots();
        isAnimating = false;
    }, 50);
    console.log('Вызвана функция resetAutoSlide');
    resetAutoSlide();
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function startAutoSlide() {
    console.log('Запущен таймер автоматического перелистывания');
    autoSlideInterval = setInterval(() => {
        console.log('Автоматическое перелистывание: вызван showSlide');
        showSlide(currentSlide + 1);
    }, 5000);
}

function resetAutoSlide() {
    console.log('Сброс таймера: clearInterval');
    clearInterval(autoSlideInterval);
    console.log('Запуск нового таймера: startAutoSlide');
    startAutoSlide();
}

function addTouchEvents() {
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoSlideInterval);
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resetAutoSlide();
    }, { passive: true });
    
    slider.addEventListener('touchmove', (e) => {
        if (Math.abs(e.touches[0].screenX - touchStartX) > 10) {
            e.preventDefault();
        }
    }, { passive: false });
}

function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
        showSlide(currentSlide + 1);
    } else if (touchEndX > touchStartX + threshold) {
        showSlide(currentSlide - 1);
    }
}

// === Обработчики событий слайдера ===
if (prevArrow) {
    prevArrow.addEventListener('click', () => {
        console.log('Нажата предыдущая стрелка');
        showSlide(currentSlide - 1);
    });
} else {
    console.error('Элемент .slider-arrow.prev не найден');
}

if (nextArrow) {
    nextArrow.addEventListener('click', () => {
        console.log('Нажата следующая стрелка');
        showSlide(currentSlide + 1);
    });
} else {
    console.error('Элемент .slider-arrow.next не найден');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(autoSlideInterval);
    } else {
        resetAutoSlide();
    }
});

// === Функциональность модального окна ===
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

// === Плавная прокрутка ===
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

// === Эффект тени заголовка при прокрутке ===
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

// === Инициализация слайдера ===
setTimeout(() => {
    showSlide(0);
}, 100);
addTouchEvents();
startAutoSlide();

// === Прелоадер ===
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('preloader--hidden');
    setTimeout(() => {
        preloader.remove();
    }, 500);
});

// === Функциональность бургер-меню ===
const burgerMenu = document.querySelector('.burger-menu');
const nav = document.querySelector('nav ul');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    nav.classList.toggle('active');
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            burgerMenu.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// === Разное ===
document.getElementById('f675605').contentWindow.document.head.insertAdjacentHTML(
    'beforeend',
    '<style>element.style {background-color: rgb(63, 106, 190);}</style>'
);