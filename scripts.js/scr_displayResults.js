let currentPage = 1; // Página actual
const resultsPerPage = 12; // Número de resultados por página

function displayResults() {
    const celes = getCelesParam('celes').toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    // Filtrar las novelas basadas en el valor de celes o mostrar todas si está vacío
    const filteredNovels = celes.length === 0
        ? novelsDataTotal
        : novelsDataTotal.filter(novel => 
            novel.title.toLowerCase().includes(celes) ||
			novel.titleSearch.toLowerCase().includes(celes) || 
            novel.author.toLowerCase().includes(celes) ||
			novel.platform.toLowerCase().includes(celes)
        );

    if (filteredNovels.length > 0) {
        // Ordenar alfabéticamente por título
        filteredNovels.sort((a, b) => a.titleSearch.localeCompare(b.titleSearch));

        // Calcular el número total de páginas
        const totalPages = Math.ceil(filteredNovels.length / resultsPerPage);

        // Limitar los resultados a los de la página actual
        const paginatedResults = filteredNovels.slice(
            (currentPage - 1) * resultsPerPage, 
            currentPage * resultsPerPage
        );

        // Mostrar los resultados de la página actual
        paginatedResults.forEach(novel => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';

            resultItem.innerHTML = `
                <div class="socialresults">
                    <a href="${novel.url}" target="_blank" style="width: 25px; height: 25px;">
                        <img src="../assets/platforms/${novel.platform}.webp" 
                             style="height:25px; width:25px;" 
                             alt="Leer en ${novel.platform}" 
                             title="Leer en ${novel.platform}">
                    </a>
                </div>
                <img src="../novels/covers/${novel.title}.webp" 
                     alt="${novel.title}" 
                     title="${novel.title}">
                <h2 style="text-transform: uppercase;">${novel.title}</h2>
                <p>Autor: ${novel.author}</p>
                <p>Capítulos: ∓${novel.chapters}</p>
                <p>
                    <a href="${novel.url}" target="_blank" 
                       style="text-decoration: none; color: rgb(var(--dark-skyblue-rgb)); text-transform: uppercase;">
                       &gt; Leer OnLine &lt;
                    </a>
                </p>
            `;

            resultsContainer.appendChild(resultItem);
        });

        // Crear los controles de paginación
        displayPagination(totalPages);
    } else {
        // Mostrar mensaje cuando no se encuentran resultados
        resultsContainer.innerHTML = `
            <p style="
                padding: 11.3px;
                text-align: center;
                font-size: larger;
                text-transform: uppercase;
                color: rgb(var(--dark-rgb));
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: row;
                flex-wrap: nowrap;
                cursor: url(../assets/cursor/miku1.cur), auto;">
                <img src="../assets/misc/miku.webp" alt="Aqua" title="No hay resultados. ＞﹏＜" 
                     style="height: 107px; margin-right:5px; transform: rotate3d(0, -1, 0, 180deg);">
                No se encontraron resultados...
                <img src="../assets/misc/miku.webp" alt="Aqua" title="No hay resultados. ＞﹏＜" 
                     style="height: 107px; margin-left:5px;">
            </p>
        `;
    }
}

// Función para mostrar los controles de paginación
function displayPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) {
        console.error("Elemento de paginación no encontrado.");
        return;
    }

    paginationContainer.innerHTML = ''; // Limpiar paginación anterior

    // Crear botones de paginación
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.className = 'pagination-button';
        if (i === currentPage) {
            pageButton.classList.add('active'); // Resaltar la página actual
        }

        pageButton.onclick = function() {
            currentPage = i;
            displayResults(); // Actualizar los resultados para la nueva página
        };

        paginationContainer.appendChild(pageButton);
    }
}


// Ejecutar la búsqueda cuando se cargue la página
document.addEventListener('DOMContentLoaded', displayResults);
