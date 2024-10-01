const sortCriteria = 'collections';
const sortOrder = 'desc';
const itemsPerPage = 10;
let currentPage = 1;
let filteredNovels = newNovels;
let totalPages = Math.ceil(newNovels.length / itemsPerPage);

function sortNovels() {
    newNovels.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a[sortCriteria] - b[sortCriteria];
        } else {
            return b[sortCriteria] - a[sortCriteria];
        }
    });
    renderPage(currentPage);
}

function getStatusIcon(rating) {
    const roundedRating = Math.round(rating * 2) / 2;
    let fullStars = Math.floor(roundedRating); // Estrellas llenas
    let halfStar = (roundedRating % 1 !== 0) ? 1 : 0; // Media estrella si hay decimales
    let emptyStars = 5 - fullStars - halfStar; // Estrellas vacías restantes

    let stars = '';

    // Añadir estrellas llenas
    for (let i = 0; i < fullStars; i++) {
        stars += '<img src="../assets/ui/fullStar.png" alt="Estrella llena" class="star-icon">';
    }

    // Añadir media estrella
    if (halfStar) {
        stars += '<img src="../assets/ui/halfStar.png" alt="Media estrella" class="star-icon">';
    }

    // Añadir estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
        stars += '<img src="../assets/ui/emptyStar.png" alt="Estrella vacía" class="star-icon">';
    }

    return stars;
}

function toggleDetails(index) {
    const details = document.getElementById('details-' + index);
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
}

function renderPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageNovels = newNovels.slice(startIndex, endIndex);
    renderNovels(pageNovels, startIndex);
}

function renderNovels(novelsToRender, startIndex) {
    const novelsList = document.getElementById('novelsList');
    novelsList.innerHTML = '';
    novelsToRender.forEach((novel, index) => {
        const statusIcon = getStatusIcon(novel.rating);
        const currentIndex = startIndex + index + 1;
        novelsList.innerHTML += `
            <div class="novel-container">
                <div class="novel-header" onclick="window.location.href='${novel.url}'" style="cursor: url('../assets/cursor/miku2.cur'), auto;" title="${novel.title}">
                    <span>${currentIndex}</span>
					<a href="../novels/covers/${novel.title}.webp" target="_blank" class="novel-cover">
						<img src="../novels/covers/${novel.title}.webp" alt="${novel.title} cover" class="novel-cover">
					</a>
                    <div>
                        <div class="novel-title">${novel.title}</div>
                        <div>Autor: ${novel.author}</div>
                        <div>Colecciones: ${novel.collections} ❤</div>
						<div class="status-icon">Calificación: ${novel.rating} <div style="margin-left: 10px;">${statusIcon}</div></div>
                    </div>
                </div>
            </div>
        `;
    });
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const prevButton = `<button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Anterior</button>`;
    const nextButton = `<button onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Siguiente</button>`;
    pagination.innerHTML = `${prevButton} ${currentPage} / ${totalPages} ${nextButton}`;
}

function goToPage(page) {
    if (page < 1 || page > totalPages) {
        return;
    }
    currentPage = page;
    renderPage(currentPage);
    renderPagination();
}

window.onload = function() {
    sortNovels();
	populateFilters(filteredNovels);
    renderPagination(newNovels);
	populateNovelSelects();
};
