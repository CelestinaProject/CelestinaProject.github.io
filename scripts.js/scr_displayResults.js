function displayResults() {
    const celes = getCelesParam('celes').toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    const filteredNovelsSearch = novelsDataTotal.filter(novel => 
        novel.titleSearch.toLowerCase().includes(celes)
    );
	
	const filteredNovelsSearch2 = novelsDataTotal.filter(novel => 
        novel.author.toLowerCase().includes(celes)
    );

    if (filteredNovelsSearch.length > 0) {
        filteredNovelsSearch.forEach(novel => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';

            resultItem.innerHTML = `
				<div class="socialresults"><a href="${novel.url}" target="_blank" style="width: 25px;height: 25px;"><img src="../assets/platforms/${novel.platform}.webp" style="height:25px;width:25px;" title="Leer en ${novel.platform}"></a></div>
                <img src="../novels/covers/${novel.title}.webp" alt="${novel.title}" title="${novel.title}">
                <h2 style="text-transform: uppercase;">${novel.titleSearch}</h2>
                <p>Autor: ${novel.author}</p>
                <p>Capítulos: ∓${novel.chapters}</p>
                <p><a href="${novel.url}" target="_blank" style="text-decoration: none;color: rgb(var(--dark-skyblue-rgb));text-transform: uppercase;">&gt; Leer OnLine &lt;</a></p>
            `;

            resultsContainer.appendChild(resultItem);
        });
	} else if (filteredNovelsSearch2.length > 0) {
        filteredNovelsSearch2.forEach(novel => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';

            resultItem.innerHTML = `
				<div class="socialresults"><a <a href="${novel.url}" target="_blank" style="width: 25px;height: 25px;"><img src="../assets/platforms/${novel.platform}.webp" style="height:25px;width:25px;" title="Leer en ${novel.platform}"></a></div>
                <img src="../novels/covers/${novel.title}.webp" alt="${novel.title}" title="${novel.title}">
                <h2 style="text-transform: uppercase;">${novel.titleSearch}</h2>
                <p>Autor: ${novel.author}</p>
                <p>Capítulos: ∓${novel.chapters}</p>
                <p><a href="${novel.url}" target="_blank" style="text-decoration: none;color: rgb(var(--dark-skyblue-rgb));text-transform: uppercase;">&gt; Leer OnLine &lt;</a></p>
            `;

            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = '<p style="padding: 11.3px;text-align: center;text-size-adjust: auto;font-size: larger;text-transform: uppercase;color: rgb(var(--dark-rgb));font-weight: bold;display: flex;align-content: center;align-items: center;justify-content: center;flex-direction: row;flex-wrap: nowrap; cursor:url(../assets/cursor/miku1.cur), auto;"><img src="../assets/misc/miku.webp" alt="Aqua" title="No hay resultados. ＞﹏＜" style="height: 107px;margin-right:5px;transform: rotate3d(0, -1, 0, 180deg);">No se encontraron resultados...<img src="../assets/misc/miku.webp" alt="Aqua" title="No hay resultados. ＞﹏＜" style="height: 107px;margin-left:5px;"></p>';
    }
}

// Ejecutar la búsqueda cuando se cargue la página
document.addEventListener('DOMContentLoaded', displayResults);