function autocompleteSearch() {
    const celes = document.getElementById('searchceles').value.toLowerCase();
    const autocompleteList = document.getElementById('autocomplete-list');
    autocompleteList.innerHTML = '';

    if (celes.length === 0) {
        return;
    }

    const filteredNovelsSearch = novelsDataTotal.filter(novel => 
        novel.titleSearch.toLowerCase().includes(celes)
    );
	
	const filteredNovelsSearch2 = novelsDataTotal.filter(novel => 
        novel.author.toLowerCase().includes(celes)
    );

    filteredNovelsSearch.forEach(novel => {
        const suggestion = document.createElement('div');
        suggestion.className = 'autocomplete-suggestion';
        suggestion.innerHTML = `
            <img src="../novels/covers/${novel.title}.webp" alt="${novel.title}" title="${novel.title}">
            <span>${novel.title}</span>
        `;
        suggestion.onclick = function() {
            document.getElementById('searchceles').value = novel.titleSearch;
            autocompleteList.innerHTML = '';
            window.location.href = `found.html?celes=${encodeURIComponent(novel.titleSearch)}`;
        };
        autocompleteList.appendChild(suggestion);
    });
	
	filteredNovelsSearch2.forEach(novel => {
        const suggestion2 = document.createElement('div');
        suggestion2.className = 'autocomplete-suggestion';
        suggestion2.innerHTML = `
            <img src="../novels/covers/${novel.title}.webp" alt="${novel.title}" title="${novel.title}">
            <span>${novel.title}</span>
        `;
        suggestion2.onclick = function() {
            document.getElementById('searchceles').value = novel.titleSearch;
			document.getElementById('searchceles').value = novel.author;
            autocompleteList.innerHTML = '';
            window.location.href = `found.html?celes=${encodeURIComponent(novel.author)}`;
        };
        autocompleteList.appendChild(suggestion2);
    });
}

// Ocultar lista de autocompletado al hacer clic fuera
document.addEventListener('click', function (e) {
    const autocompleteList = document.getElementById('autocomplete-list');
    if (e.target !== document.getElementById('searchceles')) {
        autocompleteList.innerHTML = '';
    }
});
