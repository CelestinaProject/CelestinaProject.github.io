function showTab(tabId) {
    // Ocultar todos los contenidos de las pestañas
    const contents = document.querySelectorAll('.panel-tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Desactivar todos los enlaces de pestañas
    const tabs = document.querySelectorAll('.panel-a');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Mostrar la pestaña correspondiente
    document.getElementById(tabId).classList.add('active');
    
    // Activar el enlace clicado (selecciona el enlace activo por referencia al evento)
    const activeLink = document.querySelector(`a[onclick="showTab('${tabId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// 1. Obtener géneros únicos
const getGenres = (novels) => {
    const genresSet = new Set();
    novels.forEach(novel => {
        let genres = novel.genres.split(',').map(g => g.trim().toLowerCase());
        genres.forEach(genre => genresSet.add(genre.charAt(0).toUpperCase() + genre.slice(1)));
    });
    return Array.from(genresSet);
};

// 2. Seleccionar géneros aleatorios
const getRandomGenres = (genres, limit = 3) => {
    const shuffled = genres.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);  // Selecciona un número limitado de géneros
};

// 3. Crear pestañas de géneros
const createGenreTabs = (genres) => {
    const genreTabs = document.getElementById('genreTabs');
    genres.forEach((genre, index) => {
        const tab = document.createElement('a');
        tab.textContent = genre;
        tab.classList.add('panel-a');
        if (index === 0) tab.classList.add('active');
        tab.addEventListener('click', () => {
            // Remover la clase 'active' solo de las pestañas dentro de #onlyTabs #genreTabs
            const tabsContainer = document.querySelector('#onlyTabs #genreTabs');
            tabsContainer.querySelectorAll('.panel-a').forEach(t => t.classList.remove('active'));

            // Añadir la clase 'active' a la pestaña actual
            tab.classList.add('active');

            // Mostrar el contenido del género seleccionado
            showGenreContent(genre);
        });
        genreTabs.appendChild(tab);
    });
};
//A
// 4. Mostrar contenido del género seleccionado con columnas si hay más de 7 novelas
const showGenreContent = (selectedGenre) => {
    const contentDiv = document.getElementById('genreContent');
    contentDiv.innerHTML = '';

    // Filtrar novelas por género y ordenarlas por visitas
    const filteredNovels = newNovels
        .filter(novel => novel.genres.toLowerCase().includes(selectedGenre.toLowerCase()))
        .sort((a, b) => b.views - a.views)
        .slice(0, 14);  // Mostrar hasta 14 novelas

    // Crear el contenedor para las columnas
    const columnsContainer = document.createElement('div');
    columnsContainer.classList.add('columns-container');
    
    // Crear las columnas
    const column1 = document.createElement('div');
    column1.classList.add('novel-column');
    const column2 = document.createElement('div');
    column2.classList.add('novel-column');
    
    // Dividir las novelas entre las dos columnas
    filteredNovels.forEach((novel, index) => {
        const novelItem = document.createElement('div');
        novelItem.classList.add('novel-item');

        // Definir el icono de la corona según el ranking
        let crown = '';
        if (index === 0) {
            crown = '👑 ';  // Corona de oro
        } else if (index === 1) {
            crown = '🥈';  // Corona de plata
        } else if (index === 2) {
            crown = '🥉';  // Corona de bronce
        }

        novelItem.innerHTML = `
            <div style="display: flex;align-items: center;margin: 0px 0px 10px 0px; border-bottom: 1px solid;border-color: #ddd;height: 70px;">
                <span style="font-size: 20px; margin-right: 10px; display: flex; flex-direction: column; width: 27px; align-items: center; justify-content: center;">
                    <span>${crown}</span>
                    <span>${index + 1}</span>
                </span>
                <div>
                    <h4><a href="${novel.url}" target="_blank" style="color: rgb(var(--light-skyblue-rgb));">${novel.title}</h4></a>
                    <p style="font-size: small;text-indent: 15px; text-transform: uppercase;">${novel.author}</p>
                </div>
            </div>
        `;

        // Añadir a la columna correspondiente
        if (index < 7) {
            column1.appendChild(novelItem);
        } else {
            column2.appendChild(novelItem);
        }
    });

    // Agregar las columnas al contenedor principal
    columnsContainer.appendChild(column1);
    if (filteredNovels.length > 7) {
        columnsContainer.appendChild(column2);
    }
    
    contentDiv.appendChild(columnsContainer);
};

// Inicializar pestañas y mostrar el contenido de la primera pestaña
const genres = getGenres(newNovels);
const randomGenres = getRandomGenres(genres, 3);  // Limitar géneros aleatorios
createGenreTabs(randomGenres);
showGenreContent(randomGenres[0]);

