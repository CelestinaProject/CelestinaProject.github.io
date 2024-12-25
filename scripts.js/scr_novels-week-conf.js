const sortCriteria = 'followers'; // 'followers', 'views' o 'chapters'
const sortOrder = 'desc'; // 'asc' (menor a mayor) o 'desc' (mayor a menor)
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

function getStatusIcon(status) {
    switch(status) {
        case 'Activo':
            return '🟢';
        case 'Finalizado':
            return '🔴';
        case 'Inactivo':
            return '💤';
        case 'Eliminado':
            return '⛔';
        default:
            return '';
    }
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
        const statusIcon = getStatusIcon(novel.status);
        const currentIndex = startIndex + index + 1;
        novelsList.innerHTML += `
            <div class="novel-container">
                <div class="novel-header" onclick="toggleDetails(${currentIndex - 1})" style="cursor: url('../assets/cursor/miku2.cur'), auto;" title="${novel.title}">
                    <span>${currentIndex}</span>
					<a href="${novel.cover}" target="_blank" class="novel-cover">
						<img src="${novel.cover}" alt="${novel.title} cover" class="novel-cover">
					</a>
                    <div>
                        <div class="novel-title">${novel.title}</div>
                        <div>Autor: ${novel.author}</div>
						<div>Seguidores: ${novel.followers}</div>
                        <div class="status-icon">Estado: ${novel.status} ${statusIcon}</div>
                    </div>
                </div>
                <div class="novel-details" id="details-${currentIndex - 1}">
                    <div>Capítulos: ${novel.chapters}</div>
					<div>Visitas: ${novel.views}</div>
                    <div>Artista: ${novel.artist}</div>
                    <div>Fecha: ${novel.date}</div>
                    <a href="${novel.url}" target="_blank"><img src="../assets/platforms/niadd-2.webp" alt="${novel.title} cover" class="novel-cover" style="height: 40px; width: auto; cursor: url('../assets/cursor/miku2.cur'), auto;"></a>
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
	applyFiltersFromURL();
};
