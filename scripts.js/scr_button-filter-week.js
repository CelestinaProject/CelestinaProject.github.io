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
		"Iván Silvera": [
			"Iván Manuel Silvera Machado",
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
    const status = document.getElementById('status').value;
    const genre = document.getElementById('genre').value;
    const date = document.getElementById('date').value;
    
	let filteredNovels = newNovels;

    console.log('Filtros aplicados:', { author, status, genre, date });

    if (author && author !== 'Todos') {
        filteredNovels = filteredNovels.filter(novel => normalizeAuthorName(novel.author) === author);
    }
    if (status && status !== 'Todos') {
        filteredNovels = filteredNovels.filter(novel => novel.status === status);
    }
    if (genre && genre !== 'Todos') {
        filteredNovels = filteredNovels.filter(novel => novel.genres.split(',').map(g => g.trim()).includes(genre));
    }
    if (date && date !== 'Todos') {
        filteredNovels = filteredNovels.filter(novel => novel.date.toString() === date);
    }

    console.log('Novelas filtradas:', filteredNovels);

    currentPage = 1;
	const currentIndex = 0;
    totalPages = Math.ceil(filteredNovels.length / itemsPerPage);
	renderNovels(filteredNovels, currentIndex, totalPages);
    renderPagination(filteredNovels);
	togglePagination();
	
	updateURLWithFilters(author, status, genre, date);
}

// Actualizar URL
function updateURLWithFilters(author, status, genre, date) {
    const params = new URLSearchParams();
    if (author && author !== 'Todos') params.set('author', author);
    if (status && status !== 'Todos') params.set('status', status);
    if (genre && genre !== 'Todos') params.set('genre', genre);
    if (date && date !== 'Todos') params.set('date', date);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
}

// Aplicar filtros desde la URL solo si hay parámetros
function applyFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);
	
    if (params.has('author') || params.has('status') || params.has('genre') || params.has('date')) {
        const author = params.get('author') || 'Todos';
        const status = params.get('status') || 'Todos';
        const genre = params.get('genre') || 'Todos';
        const date = params.get('date') || 'Todos';

        document.getElementById('author').value = author;
        document.getElementById('status').value = status;
        document.getElementById('genre').value = genre;
        document.getElementById('date').value = date;

        applyFilters();
    } else {
        // Si no hay parámetros en la URL, carga todos los datos
		renderPagination(newNovels);
		populateFilters(filteredNovels);
		renderNovels(newNovels, currentIndex);
		console.log('No se encontraron filtros en la url.');
    }
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
    const statusSelect = document.getElementById('status');
    const genreSelect = document.getElementById('genre');
    const dateSelect = document.getElementById('date');

    // Limpiar opciones anteriores
    authorSelect.innerHTML = `<option value="Todos">Todos</option>`;
    statusSelect.innerHTML = `<option value="Todos">Todos</option>`;
    genreSelect.innerHTML = `<option value="Todos">Todos</option>`;
    dateSelect.innerHTML = `<option value="Todos">Todos</option>`;

    const authors = extractUniqueValues('author').sort();
    const statuses = extractUniqueValues('status').sort();
    const dates = extractUniqueValues('date').sort((a, b) => a - b);
    
    const genres = [...new Set(newNovels.flatMap(novel => novel.genres.split(',').map(genre => genre.trim())))].filter(genre => genre !== '').sort();

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

console.log('Novelas actualizadas:', newNovels);