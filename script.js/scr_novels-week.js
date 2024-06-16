const novels = [
                { title: "Tengo La Espada Sagrada (NL)", cover: "novels_covers/Tengo La Espada Sagrada (NL).png", followers: 4036, views: 2607, chapters: 20, genres: "AccióN, Aventuras, Comedia, Demonios, FantasíA, Shonen, Shounen, AccióN, , Aventuras, , Comedia, , Demonios, , FantasíA, , Shonen, , Shounen, AccióN, Aventuras, Comedia, Demonios, FantasíA, Shonen, Shounen, AccióN, Aventuras, Comedia, Demonios, FantasíA, Shonen, Shounen", author: "Eimon Q", artist: "Desconocido", date: 2021, status: "Inactivo", url: "https://es.niadd.com/original/10036678.html" },
                { title: "Renacer Sueños Vivos En Un Mundo Nuevo (NL)", cover: "novels_covers/Renacer Sueños Vivos En Un Mundo Nuevo (NL).png", followers: 3082, views: 4328, chapters: 31, genres: "Adventure, Aventuras, FantasíA, Slice Of Life, Shonen, Seinen, Adventure, , Aventuras, , FantasíA, , Slice Of Life, , Shonen, , Seinen, Adventure, Aventuras, FantasíA, Slice Of Life, Shonen, Seinen, Adventure, Aventuras, FantasíA, Slice Of Life, Shonen, Seinen", author: "M.J. Wolfrore", artist: "Moon (Lunita)", date: 2023, status: "Inactivo", url: "https://es.niadd.com/original/10061483.html" },
                { title: "Es Una Orden (NL)", cover: "novels_covers/Es Una Orden (NL).png", followers: 2863, views: 12697, chapters: 25, genres: "Comedia, Escolar, Shounen, Vida Escolar, Aventuras, Ciencia FiccióN, ReencarnacióN, RomáNtico, School Life, Seinen, Vampiros, Comedia, , Escolar, , Shounen, , Vida Escolar, , Aventuras, , Ciencia FiccióN, , ReencarnacióN, , RomáNtico, , School Life, , Seinen, , Vampiros, Comedia, Escolar, Shounen, Vida Escolar, Aventuras, Ciencia FiccióN, ReencarnacióN, RomáNtico, School Life, Seinen, Vampiros, Comedia, Escolar, Shounen, Vida Escolar, Aventuras, Ciencia FiccióN, ReencarnacióN, RomáNtico, School Life, Seinen, Vampiros", author: "Eimon Q", artist: "Desconocido", date: 2023, status: "Inactivo", url: "https://es.niadd.com/original/10056045.html" },
                { title: "Una Doctora Que Solo Quiere Pintar (NL)", cover: "novels_covers/Una Doctora Que Solo Quiere Pintar (NL).png", followers: 2720, views: 14493, chapters: 37, genres: "Comedia, Cotidiano, Drama, Romance, RomáNtico, Seinen, Shojo, Vida Cotidiana, Comedia, , Cotidiano, , Drama, , Romance, , RomáNtico, , Seinen, , Shojo, , Vida Cotidiana, Comedia, Cotidiano, Drama, Romance, RomáNtico, Seinen, Shojo, Vida Cotidiana, Comedia, Cotidiano, Drama, Romance, RomáNtico, Seinen, Shojo, Vida Cotidiana", author: "Eimon Q", artist: "Desconocido", date: 2023, status: "Inactivo", url: "https://es.niadd.com/original/10060549.html" },
                { title: "Cronos Tale Of The Dark Adventurer (novela)", cover: "novels_covers/Cronos Tale Of The Dark Adventurer (novela).png", followers: 2380, views: 7664, chapters: 40, genres: "Adventure, Aventuras, Cotidiano, FantasíA, Shonen, Shounen, Adventure, , Aventuras, , Cotidiano, , FantasíA, , Shonen, , Shounen, Adventure, Aventuras, Cotidiano, FantasíA, Shonen, Shounen, Adventure, Aventuras, Cotidiano, FantasíA, Shonen, Shounen", author: "Axoth", artist: "Axoth", date: 2023, status: "Activo", url: "https://es.niadd.com/original/10060752.html" },
                { title: "PORTADORES (NL)", cover: "novels_covers/PORTADORES (NL).png", followers: 1350, views: 3977, chapters: 23, genres: "AccióN, Adulto, ApocalíPtico, Demonios, FantasíA, Gore, Horror, Maduro, Shonen, AccióN, , Adulto, , ApocalíPtico, , Demonios, , FantasíA, , Gore, , Horror, , Maduro, , Shonen, AccióN, Adulto, ApocalíPtico, Demonios, FantasíA, Gore, Horror, Maduro, Shonen, AccióN, Adulto, ApocalíPtico, Demonios, FantasíA, Gore, Horror, Maduro, Shonen", author: "ElClaustro", artist: "Desconocido", date: 2024, status: "Activo", url: "https://es.niadd.com/original/10065140.html" },
                { title: "The Zodiacs Disasterology (NL)", cover: "novels_covers/The Zodiacs Disasterology (NL).png", followers: 521, views: 789, chapters: 9, genres: "AccióN, Ciencia FiccióN, Drama, FantasíA, Maduro, Seinen, Super Natural, Super Poderes, Tragedia, Tragedy, Shonen, AccióN, , Ciencia FiccióN, , Drama, , FantasíA, , Maduro, , Seinen, , Super Natural, , Super Poderes, , Tragedia, , Tragedy, , Shonen, AccióN, Ciencia FiccióN, Drama, FantasíA, Maduro, Seinen, Super Natural, Super Poderes, Tragedia, Tragedy, Shonen, AccióN, Ciencia FiccióN, Drama, FantasíA, Maduro, Seinen, Super Natural, Super Poderes, Tragedia, Tragedy, Shonen", author: "NightCrawler", artist: "NightCrawler, Tairitsu-Sama", date: 2024, status: "Inactivo", url: "https://es.niadd.com/original/10064674.html" },
                { title: "El Emperador", cover: "novels_covers/El Emperador.png", followers: 798, views: 1920, chapters: 12, genres: "FantasíA, FantasíA, FantasíA, FantasíA", author: "Lupdela Fink", artist: "Desconocido", date: 2023, status: "Activo", url: "https://es.niadd.com/original/10062911.html" },
                { title: "Génesis Mortal (Novela)", cover: "novels_covers/Génesis Mortal (Novela).png", followers: 87, views: 230, chapters: 4, genres: "AccióN, ApocalíPtico, Ciencia FiccióN, Demonios, Gore, Supervivencia, Terror, Thriller, Tragedia, AccióN, , ApocalíPtico, , Ciencia FiccióN, , Demonios, , Gore, , Supervivencia, , Terror, , Thriller, , Tragedia, AccióN, ApocalíPtico, Ciencia FiccióN, Demonios, Gore, Supervivencia, Terror, Thriller, Tragedia, AccióN, ApocalíPtico, Ciencia FiccióN, Demonios, Gore, Supervivencia, Terror, Thriller, Tragedia", author: "Omnisent", artist: "Desconocido", date: 2024, status: "Inactivo", url: "https://es.niadd.com/original/10066472.html" },
                { title: "Diamante De La Esperanza (Web Novel)", cover: "novels_covers/Diamante De La Esperanza (Web Novel).png", followers: 92, views: 539, chapters: 11, genres: "AccióN, Aventuras, Comedia, Escolar, Romance, Shonen, Super Poderes, Vida Cotidiana, Vida Escolar, AccióN, , Aventuras, , Comedia, , Escolar, , Romance, , Shonen, , Super Poderes, , Vida Cotidiana, , Vida Escolar, AccióN, Aventuras, Comedia, Escolar, Romance, Shonen, Super Poderes, Vida Cotidiana, Vida Escolar, AccióN, Aventuras, Comedia, Escolar, Romance, Shonen, Super Poderes, Vida Cotidiana, Vida Escolar", author: "Seido", artist: "Seido", date: 2024, status: "Activo", url: "https://es.niadd.com/original/10065879.html" },
                { title: "Mi Segunda Vida Junto A Hanae (Novela)", cover: "novels_covers/Mi Segunda Vida Junto A Hanae (Novela).png", followers: 1944, views: 5536, chapters: 20, genres: "Adulto, Adventure, Aventuras, FantasíA, Seinen, Adulto, , Adventure, , Aventuras, , FantasíA, , Seinen, Adulto, Adventure, Aventuras, FantasíA, Seinen, Adulto, Adventure, Aventuras, FantasíA, Seinen", author: "NanaNa", artist: "Desconocido", date: 2024, status: "Activo", url: "https://es.niadd.com/original/10065213.html" },
                { title: "Los Di(IX)ez Maestros De La Espada", cover: "novels_covers/Los Di(IX)ez Maestros De La Espada.png", followers: 1154, views: 1917, chapters: 13, genres: "AccióN, Adventure, Aventuras, Comedia, Demonios, Drama, FantasíA, Karate, Shonen, Shounen, Super Natural, Super Poderes, Suspense, AccióN, , Adventure, , Aventuras, , Comedia, , Demonios, , Drama, , FantasíA, , Karate, , Shonen, , Shounen, , Super Natural, , Super Poderes, , Suspense, AccióN, Adventure, Aventuras, Comedia, Demonios, Drama, FantasíA, Karate, Shonen, Shounen, Super Natural, Super Poderes, Suspense, AccióN, Adventure, Aventuras, Comedia, Demonios, Drama, FantasíA, Karate, Shonen, Shounen, Super Natural, Super Poderes, Suspense", author: "El bocchi/omnisent.", artist: "Yo, usando una IA.", date: 2023, status: "Inactivo", url: "https://es.niadd.com/original/10062460.html" },
                { title: "Hollow (Novela)", cover: "novels_covers/Hollow (Novela).png", followers: 1127, views: 4447, chapters: 28, genres: "AccióN, Adventure, ApocalíPtico, Aventuras, Ciencia FiccióN, Drama, FantasíA, Maduro, Militar, Mystery, Super Natural, Super Poderes, Supervivencia, Suspense, Thriller, AccióN, , Adventure, , ApocalíPtico, , Aventuras, , Ciencia FiccióN, , Drama, , FantasíA, , Maduro, , Militar, , Mystery, , Super Natural, , Super Poderes, , Supervivencia, , Suspense, , Thriller, AccióN, Adventure, ApocalíPtico, Aventuras, Ciencia FiccióN, Drama, FantasíA, Maduro, Militar, Mystery, Super Natural, Super Poderes, Supervivencia, Suspense, Thriller, AccióN, Adventure, ApocalíPtico, Aventuras, Ciencia FiccióN, Drama, FantasíA, Maduro, Militar, Mystery, Super Natural, Super Poderes, Supervivencia, Suspense, Thriller", author: "Kige", artist: "Enanan", date: 2023, status: "Finalizado", url: "https://es.niadd.com/original/10062869.html" },
                { title: "Inverse (novela)", cover: "novels_covers/Inverse (novela).png", followers: 179, views: 312, chapters: 3, genres: "AccióN, Adventure, Aventuras, Ciencia FiccióN, Comedia, Cotidiano, Delincuentes, Escolar, Maduro, Militar, Realidad Virtual, Romance, RomáNtico, School Life, Shonen, Tragedia, Shounen, Super Natural, Seinen, Mecha, Vida Escolar, AccióN, , Adventure, , Aventuras, , Ciencia FiccióN, , Comedia, , Cotidiano, , Delincuentes, , Escolar, , Maduro, , Militar, , Realidad Virtual, , Romance, , RomáNtico, , School Life, , Shonen, , Tragedia, , Shounen, , Super Natural, , Seinen, , Mecha, , Vida Escolar, AccióN, Adventure, Aventuras, Ciencia FiccióN, Comedia, Cotidiano, Delincuentes, Escolar, Maduro, Militar, Realidad Virtual, Romance, RomáNtico, School Life, Shonen, Tragedia, Shounen, Super Natural, Seinen, Mecha, Vida Escolar, AccióN, Adventure, Aventuras, Ciencia FiccióN, Comedia, Cotidiano, Delincuentes, Escolar, Maduro, Militar, Realidad Virtual, Romance, RomáNtico, School Life, Shonen, Tragedia, Shounen, Super Natural, Seinen, Mecha, Vida Escolar", author: "Bocchi/Omnisent", artist: "Bing", date: 2024, status: "Inactivo", url: "https://es.niadd.com/original/10063650.html" },
                { title: "Roptura Todo Se Quiebra", cover: "novels_covers/Roptura Todo Se Quiebra.png", followers: 135, views: 473, chapters: 5, genres: "Adulto, Aventuras, Drama, Gore, Maduro, Seinen, Thriller, Webcomic, Parodia, Adventure, FantasíA, Tragedia, Adulto, , Aventuras, , Drama, , Gore, , Maduro, , Seinen, , Thriller, , Webcomic, , Parodia, , Adventure, , FantasíA, , Tragedia, Adulto, Aventuras, Drama, Gore, Maduro, Seinen, Thriller, Webcomic, Parodia, Adventure, FantasíA, Tragedia, Adulto, Aventuras, Drama, Gore, Maduro, Seinen, Thriller, Webcomic, Parodia, Adventure, FantasíA, Tragedia", author: "Jhonatan novoa", artist: "Jhonnovo", date: 2023, status: "Inactivo", url: "https://es.niadd.com/original/10061990.html" },
                { title: "Prédias Maldad En Un Mundo De Dioses.", cover: "novels_covers/Prédias Maldad En Un Mundo De Dioses..png", followers: 116, views: 257, chapters: 4, genres: "AccióN, Adventure, ApocalíPtico, Aventuras, Cotidiano, Drama, FantasíA, Slice Of Life, Romance, Tragedia, AccióN, , Adventure, , ApocalíPtico, , Aventuras, , Cotidiano, , Drama, , FantasíA, , Slice Of Life, , Romance, , Tragedia, AccióN, Adventure, ApocalíPtico, Aventuras, Cotidiano, Drama, FantasíA, Slice Of Life, Romance, Tragedia, AccióN, Adventure, ApocalíPtico, Aventuras, Cotidiano, Drama, FantasíA, Slice Of Life, Romance, Tragedia", author: "Carius", artist: "Carius", date: 2023, status: "Inactivo", url: "https://es.niadd.com/original/10060950.html" },
                { title: "VirtudVicio", cover: "novels_covers/VirtudVicio.png", followers: 107, views: 497, chapters: 7, genres: "AccióN, Adulto, Adventure, Aventuras, Ciencia FiccióN, Comedia, Cotidiano, Demonios, Drama, Escolar, FantasíA, Gore, HaréN, HistóRico, Maduro, Mystery, Policial, RomáNtico, Samurai, School Life, Shonen, Shounen, Vida Cotidiana, Tragedy, Tragedia, Thriller, Suspense, Super Natural, AccióN, , Adulto, , Adventure, , Aventuras, , Ciencia FiccióN, , Comedia, , Cotidiano, , Demonios, , Drama, , Escolar, , FantasíA, , Gore, , HaréN, , HistóRico, , Maduro, , Mystery, , Policial, , RomáNtico, , Samurai, , School Life, , Shonen, , Shounen, , Vida Cotidiana, , Tragedy, , Tragedia, , Thriller, , Suspense, , Super Natural, AccióN, Adulto, Adventure, Aventuras, Ciencia FiccióN, Comedia, Cotidiano, Demonios, Drama, Escolar, FantasíA, Gore, HaréN, HistóRico, Maduro, Mystery, Policial, RomáNtico, Samurai, School Life, Shonen, Shounen, Vida Cotidiana, Tragedy, Tragedia, Thriller, Suspense, Super Natural, AccióN, Adulto, Adventure, Aventuras, Ciencia FiccióN, Comedia, Cotidiano, Demonios, Drama, Escolar, FantasíA, Gore, HaréN, HistóRico, Maduro, Mystery, Policial, RomáNtico, Samurai, School Life, Shonen, Shounen, Vida Cotidiana, Tragedy, Tragedia, Thriller, Suspense, Super Natural", author: "Omnisent (yo)", artist: "No hay presupuesto para uno.", date: 2023, status: "Inactivo", url: "https://es.niadd.com/original/10060448.html" },
                { title: "Black Garden (Novela)", cover: "novels_covers/Black Garden (Novela).png", followers: 510, views: 1274, chapters: 15, genres: "AccióN, Adulto, Adventure, Aventuras, Comedia, Demonios, Drama, FantasíA, Gore, Horror, Maduro, Mystery, Seinen, Super Natural, Suspense, Terror, Tragedia, Tragedy, Thriller, AccióN, , Adulto, , Adventure, , Aventuras, , Comedia, , Demonios, , Drama, , FantasíA, , Gore, , Horror, , Maduro, , Mystery, , Seinen, , Super Natural, , Suspense, , Terror, , Tragedia, , Tragedy, , Thriller, AccióN, Adulto, Adventure, Aventuras, Comedia, Demonios, Drama, FantasíA, Gore, Horror, Maduro, Mystery, Seinen, Super Natural, Suspense, Terror, Tragedia, Tragedy, Thriller, AccióN, Adulto, Adventure, Aventuras, Comedia, Demonios, Drama, FantasíA, Gore, Horror, Maduro, Mystery, Seinen, Super Natural, Suspense, Terror, Tragedia, Tragedy, Thriller", author: "Quibo Bobina", artist: "No alcanza la plata", date: 2023, status: "Activo", url: "https://es.niadd.com/original/10060424.html" },


                // ↓↓↓ Novelas Eliminadas ↓↓↓
                { title: "El Viaje De Arusai", cover: "novels_covers/El Viaje De Arusai.png", followers: 78, views: 416, chapters: 15, genres: "Desconocido", author: "Arusai", artist: "Desconocido", date: 2023, status: "Eliminado" },
                { title: "Dark Crimson", cover: "novels_covers/Dark Crimson.png", followers: 720, views: 2305, chapters: 19, genres: "Desconocido", author: "Reight", artist: "Desconocido", date: 2023, status: "Eliminado" },
                { title: "Maestros De Las Constelaciones", cover: "novels_covers/noCover.png", followers: 366, views: 310, chapters: 3, genres: "Desconocido", author: "Eimon Q", artist: "Desconocido", date: 2021, status: "Eliminado" },

                // ↓↓↓ Novelas con Problemas ↓↓↓
                { title: "El Susurro Del árbol (NL)", cover: "novels_covers/El Susurro Del árbol (NL).png", followers: 160, views: 371, chapters: 000, genres: "Adventure, FantasíA, Aventuras, Magia, Adventure, , FantasíA, , Aventuras, , Magia, Adventure, FantasíA, Aventuras, Magia, Adventure, FantasíA, Aventuras, Magia", author: "M.J. Wolfrore", artist: "Moon (lunita)", date: 2023, status: "Inactivo", url: "https://es.niadd.com/original/10062059.html" },
            ];

const sortCriteria = 'views'; // 'followers', 'views' o 'chapters'
const sortOrder = 'desc'; // 'asc' o 'desc'
const itemsPerPage = 10;
let currentPage = 1;
let filteredNovels = novels;
let totalPages = Math.ceil(novels.length / itemsPerPage);

function sortNovels() {
    novels.sort((a, b) => {
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
    const pageNovels = novels.slice(startIndex, endIndex);
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
                <div class="novel-header" onclick="toggleDetails(${currentIndex - 1})" style="cursor: url('assets/mouse/cursor_Miku-1/miku2.cur'), auto;">
                    <span>${currentIndex}</span>
                    <img src="${novel.cover}" alt="${novel.title} cover" class="novel-cover">
                    <div>
                        <div class="novel-title">${novel.title}</div>
                        <div>Autor: ${novel.author}</div>
                        <div>Visitas: ${novel.views}</div>
                        <div class="status-icon">Estado: ${novel.status} ${statusIcon}</div>
                    </div>
                </div>
                <div class="novel-details" id="details-${currentIndex - 1}" style="display: none; cursor: url('assets/mouse/cursor_Miku-1/miku1.cur'), auto;">
                    <div>Seguidores: ${novel.followers}</div>
                    <div>Capítulos: ${novel.chapters}</div>
                    <div>Artista: ${novel.artist}</div>
                    <div>Fecha: ${novel.date}</div>
                    <a href="${novel.url}" target="_blank"><img src="assets/platforms/niadd2.png" alt="${novel.title} cover" class="novel-cover" style="height: 40px; width: auto; cursor: url('assets/mouse/cursor_Miku-1/miku2.cur'), auto;"></a>
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

function printFilteredNovels() {
    const filters = [];
    if (document.getElementById('statusActivo').checked) filters.push('Activo');
    if (document.getElementById('statusInactivo').checked) filters.push('Inactivo');
    if (document.getElementById('statusFinalizado').checked) filters.push('Finalizado');
    if (document.getElementById('statusEliminado').checked) filters.push('Eliminado');
    const filteredNovels = novels.filter(novel => filters.includes(novel.status));
    let output = '**TOP DE NOVELAS MÁS SEGUIDAS PUBLICADAS EN NIADD**\n\n';
    filteredNovels.forEach((novel, index) => {
        output += `- Top ${index + 1}: ${novel.title}\nVisitas: 0000 → ${novel.views}\nSeguidores: 0000 → ${novel.followers}\nCapítulos: 0000 → ${novel.chapters}\n\n${novel.url}\n\n**Ganaste 000 seguidores**\n\n>———◇———<\n\n`;
    });
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Top_Novelas_Niadd.txt';
    a.click();
    URL.revokeObjectURL(url);
}

window.onload = function() {
    sortNovels();
    /*populateFilters();*/
    renderPagination(novels);
};
