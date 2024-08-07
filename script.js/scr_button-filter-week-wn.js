// Normalizar todos los nombres, aparte del cabrón de Bocchi ❤
function normalizeAuthorName(author) {
    const authorMappings = {
        "Bocchi Omnisentus": [
            "El bocchi/omnisent.",
            "Omnisent (yo)",
            "Bocchi/Omnisent",
            "Omnisent",
            "Omnisentus",
            "yo",
			"bocchi",
			"Desconocido",
        ],
        "NightCrawler": [
            "NightCrawlerGLX",
            "NightCrawler"
        ],
    };

    for (const normalized in authorMappings) {
        if (authorMappings[normalized].includes(author)) {
            return normalized;
        }
    }
    return author;
}
// Aplicar filtros
function applyFilters() {
    const author = document.getElementById('author').value;
    const rating = document.getElementById('rating').value;
    /*const genre = document.getElementById('genre').value;
    const date = document.getElementById('date').value;*/
    let filteredNovels = newNovels;

    if (author) {
        filteredNovels = filteredNovels.filter(novel => normalizeAuthorName(novel.author) === author);
    }
    if (rating) {
        filteredNovels = filteredNovels.filter(novel => novel.rating === rating);
    }
    /*if (genre) {
        filteredNovels = filteredNovels.filter(novel => novel.genres.split(',').map(g => g.trim()).includes(genre));
    }
    if (date) {
        filteredNovels = filteredNovels.filter(novel => novel.date.toString() === date);
    }*/

    currentPage = 0;
    totalPages = Math.ceil(filteredNovels.length / itemsPerPage);
    renderNovels(filteredNovels, currentPage, totalPages);
    renderPagination(filteredNovels);
    togglePagination();
}
// Extraer propiedades
function extractUniqueValues(property) {
    const values = newNovels.map(novel => {
        if (property === 'author') {
            return normalizeAuthorName(novel[property]);
        }
        return novel[property];
    });
    return [...new Set(values)];
}
// Filtro
function populateFilters() {
    const authorSelect = document.getElementById('author');
    const statusSelect = document.getElementById('rating');
    /*const genreSelect = document.getElementById('genre');
    const dateSelect = document.getElementById('date');*/

    const authors = extractUniqueValues('author').sort();
    const statuses = extractUniqueValues('rating').sort();
    /*const dates = extractUniqueValues('date').sort((a, b) => a - b);
    
    const genres = [...new Set(newNovels.flatMap(novel => novel.genres.split(',').map(genre => genre.trim())))].filter(genre => genre !== '').sort();*/

    authors.forEach(author => {
        authorSelect.innerHTML += `<option value="${author}">${author}</option>`;
    });
    statuses.forEach(rating => {
        statusSelect.innerHTML += `<option value="${rating}">${rating}</option>`;
    });
    /*genres.forEach(genre => {
        genreSelect.innerHTML += `<option value="${genre}">${genre}</option>`;
    });
    dates.forEach(date => {
        dateSelect.innerHTML += `<option value="${date}">${date}</option>`;
    });*/
}
// Reiniciar Filtros
function resetFilters() {
    document.getElementById('author').value = 'Todos';
    document.getElementById('rating').value = 'Todos';
    /*document.getElementById('genre').value = 'Todos';
    document.getElementById('year').value = 'Todos';*/
    renderNovels(newNovels);
    renderPagination(newNovels);
}