function togglePrintMenu() {
                const printMenu = document.getElementById('printMenu');
                printMenu.style.display = printMenu.style.display === 'none' || printMenu.style.display === '' ? 'block' : 'none';
            }

function applyFilters() {
    const author = document.getElementById('author').value;
    const status = document.getElementById('status').value;
    const genre = document.getElementById('genre').value;
    const date = document.getElementById('date').value;
    let filteredNovels = novels;
    if (author) {
        filteredNovels = filteredNovels.filter(novel => novel.author === author);
    }
    if (status) {
        filteredNovels = filteredNovels.filter(novel => novel.status === status);
    }
    if (genre) {
        filteredNovels = filteredNovels.filter(novel => novel.genres.split(',').map(g => g.trim()).includes(genre));
    }
    if (date) {
        filteredNovels = filteredNovels.filter(novel => novel.date.toString() === date);
    }
currentPage = 1;
    totalPages = Math.ceil(filteredNovels.length / itemsPerPage);
    renderNovels(filteredNovels, currentPage, totalPages);
    renderPagination(filteredNovels);
    toggleFilterMenu();
}

function extractUniqueValues(property) {
    const values = novels.map(novel => novel[property]);
    return [...new Set(values)];
}

function populateFilters() {
    const authorSelect = document.getElementById('author');
    const statusSelect = document.getElementById('status');
    const genreSelect = document.getElementById('genre');
    const dateSelect = document.getElementById('date');

    const authors = extractUniqueValues('author');
    const statuses = extractUniqueValues('status');
    const dates = extractUniqueValues('date');
    
    const genres = [...new Set(novels.flatMap(novel => novel.genres.split(',').map(genre => genre.trim())))];

    authors.forEach(author => {
        authorSelect.innerHTML += `<option value="${author}">${author}</option>`;
    });
    statuses.forEach(status => {
        statusSelect.innerHTML += `<option value="${status}">${status}</option>`;
    });
    genres.forEach(genre => {
        genreSelect.innerHTML += `<option value="${genre}">${genre}</option>`;
    });
    dates.forEach(date => {
        dateSelect.innerHTML += `<option value="${date}">${date}</option>`;
    });
}

function resetFilters() {
    document.getElementById('author').value = '';
    document.getElementById('status').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('year').value = '';
    
    renderNovels(novels);
    renderPagination(novels);
}