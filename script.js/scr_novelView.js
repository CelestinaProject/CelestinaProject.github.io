const carouselInner = document.getElementById('carousell-inner');

oldNovels.forEach(novel => {
    const novelElement = document.createElement('div');
    novelElement.classList.add('carousell-item');
    novelElement.innerHTML = `
        <a href="${novel.url}" target="_blank" style="text-decoration: none";>
            <img src="${novel.cover}" alt="${novel.title}">
            <h3>${novel.title}</h3>
        </a>
    `;
    carouselInner.appendChild(novelElement);
});

let slideIndex = 0;
const visibleItems = 3;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousell-item');
    const totalItems = slides.length;
    if (index >= totalItems / visibleItems) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = Math.ceil(totalItems / visibleItems) - 1;
    } else {
        slideIndex = index;
    }
    carouselInner.style.transform = `translateX(-${slideIndex * (100 / visibleItems)}%)`;
}

function nextSlide() {
    showSlide(slideIndex + 0.5);
}

function prevSlide() {
    showSlide(slideIndex - 0.5);
}

showSlide(slideIndex);

// Configura el movimiento automático del carrusel
setInterval(nextSlide, 3000); // 1000 = 1s