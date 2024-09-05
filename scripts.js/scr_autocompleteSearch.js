function autocompleteSearch() {
    const celes = document.getElementById('searchceles').value.toLowerCase();
    const autocompleteList = document.getElementById('autocomplete-list');
    autocompleteList.innerHTML = '';

    if (celes.length === 0) {
        return;
    }

    // Filtrar por título y autor
    const filteredNovelsSearch = novelsDataTotal.filter(novel => 
        novel.titleSearch.toLowerCase().includes(celes) ||
        novel.author.toLowerCase().includes(celes)
    );

    // Ordenar alfabéticamente por título
    filteredNovelsSearch.sort((a, b) => a.titleSearch.localeCompare(b.titleSearch));

    // Mostrar sugerencias
    filteredNovelsSearch.forEach(novel => {
        const suggestion = document.createElement('div');
        suggestion.className = 'autocomplete-suggestion';
        suggestion.innerHTML = `
            <img src="novels/covers/${novel.title}.webp" alt="${novel.title}" title="${novel.title}">
            <span>${novel.title}</span>
        `;
        suggestion.onclick = function() {
            document.getElementById('searchceles').value = novel.titleSearch;
            autocompleteList.innerHTML = '';
            window.location.href = `rules/found.html?celes=${encodeURIComponent(novel.titleSearch)}`;
        };
        autocompleteList.appendChild(suggestion);
    });
}

// Ocultar lista de autocompletado al hacer clic fuera
document.addEventListener('click', function (e) {
    const autocompleteList = document.getElementById('autocomplete-list');
    if (e.target !== document.getElementById('searchceles')) {
        autocompleteList.innerHTML = '';
    }
});
