const carouselInner = document.getElementById('carousell-inner');

novelsDataTotal.forEach(novel => {
    const novelElement = document.createElement('div');
    novelElement.classList.add('carousell-item');
    novelElement.innerHTML = `
        <a href="${novel.url}" target="_blank" style="text-decoration: none;">
            <img src="novels/covers/${novel.title}.webp" alt="${novel.title}">
        </a>
    `;
    carouselInner.appendChild(novelElement);
});

let slideIndex = 0;
const visibleItems = 4;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousell-item');
    const totalItems = slides.length;

    // Ajustar el índice para que se desplace correctamente
    if (index >= Math.ceil(totalItems / visibleItems)) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = Math.ceil(totalItems / visibleItems) - 1;
    } else {
        slideIndex = index;
    }

    // Calcular el desplazamiento para el número correcto de elementos
    carouselInner.style.transform = `translateX(-${slideIndex * (100 / visibleItems)}%)`;
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

function prevSlide() {
    showSlide(slideIndex - 0.5);
}

showSlide(slideIndex);

// Configura el movimiento automático del carrusel
setInterval(nextSlide, 3000); // 1000 ms = 1 segundo


const carouselInner2 = document.getElementById('carousell-inner2');

novels.forEach(novel => {
    const novelElement = document.createElement('div');
    novelElement.classList.add('carousell-item-2');
    novelElement.innerHTML = `
        <a href="rules/museum/lucesysombras.html" style="text-decoration: none;width: 230px;height: 350px;max-width: 230px;max-height: 350px;display: flex;">
            <img src="rules/museum/${novel.cover}" alt="${novel.titlereal}">
        </a>
    `;
    carouselInner2.appendChild(novelElement);
});

let slideIndex2 = 0;
const visibleItems2 = 1; // Ajusta el número de elementos visibles

function showSlide2(index) {
    const slides = document.querySelectorAll('#carousell-inner2 .carousell-item-2');
    const totalItems2 = slides.length;

    if (index >= Math.ceil(totalItems2 / visibleItems2)) {
        slideIndex2 = 0;
    } else if (index < 0) {
        slideIndex2 = Math.ceil(totalItems2 / visibleItems2) - 1;
    } else {
        slideIndex2 = index;
    }

    // Calcular el desplazamiento para mostrar correctamente los elementos
    carouselInner2.style.transform = `translateX(-${slideIndex2 * (100 / visibleItems2)}%)`;
}

function nextSlide2() {
    showSlide2(slideIndex2 + 1);
}

function prevSlide2() {
    showSlide2(slideIndex2 - 1);
}

showSlide2(slideIndex2);

// Configura el movimiento automático del segundo carrusel
setInterval(nextSlide2, 5200); // 1000 ms = 1 segundo