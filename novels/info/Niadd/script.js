// Declarar las novelas
const novelas = [];

function cargarDatos(datosSemana, nombreSemana) {
    datosSemana.forEach(novela => {
        if (!novela.title) {
            console.warn(`Título no válido para la novela en la ${nombreSemana}`);
            return; // Si no tiene título, saltar esta novela
        }

        let novelaExistente = novelas.find(n => n.url === novela.url);
        if (!novelaExistente) {
            // Si no existe, agregarla como nueva
            novelas.push({
                titulo: novela.title,
				cover: novela.cover,
                url: novela.url,
                semanas: [nombreSemana],
                capitulos: [novela.chapters],
                seguidores: [novela.followers],
                visitas: [novela.views]
            });
        } else {
            // Si ya existe, actualizar sus datos
            novelaExistente.semanas.push(nombreSemana);
            novelaExistente.capitulos.push(novela.chapters);
            novelaExistente.seguidores.push(novela.followers);
            novelaExistente.visitas.push(novela.views);
        }
    });
}

// Función para desplazarse hacia un elemento
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    element.scrollIntoView({ behavior: 'smooth' });
}

// Función para mostrar/ocultar el botón "Volver arriba"
function toggleBackToTopButton() {
    const backToTopButton = document.getElementById('backToTop');
    backToTopButton.style.display = window.scrollY > 0 ? 'block' : 'none';
}

// Cargar datos de todas las semanas
cargarDatos(week31, 'Semana 31');
cargarDatos(week32, 'Semana 32');
cargarDatos(week33, 'Semana 33');
cargarDatos(week34, 'Semana 34');
cargarDatos(week35, 'Semana 35');
cargarDatos(week36, 'Semana 36');
cargarDatos(week37, 'Semana 37');
cargarDatos(week38, 'Semana 38');
cargarDatos(week39, 'Semana 39');
cargarDatos(week40, 'Semana 40');
cargarDatos(week41, 'Semana 41');
cargarDatos(week42, 'Semana 42');
cargarDatos(week43, 'Semana 43');
cargarDatos(week44, 'Semana 44');
cargarDatos(week45, 'Semana 45');
cargarDatos(week46, 'Semana 46');
cargarDatos(week47, 'Semana 47');
cargarDatos(week48, 'Semana 48');
cargarDatos(week49, 'Semana 49');
cargarDatos(week50, 'Semana 50');
cargarDatos(week51, 'Semana 51');
cargarDatos(week53, 'Semana 53');
cargarDatos(week55, 'Semana 55');
cargarDatos(week56, 'Semana 56');
cargarDatos(week57, 'Semana 57');
cargarDatos(week58, 'Semana 58');
cargarDatos(week59, 'Semana 59');
cargarDatos(week59, 'Semana 60');

// Modificar cargarNovela para desplazarse hacia los gráficos
function cargarNovela(index) {
    const chartsContainer = document.getElementById('chartsContainer');
    chartsContainer.style.display = chartsContainer.style.display === '' || chartsContainer.style.display === 'block' ? 'block' : 'block';
	
	const novela = novelas[index];
    const semanas = novela.semanas;

    // Actualizar datos de los gráficos
    capitulosChart.data.labels = semanas;
    capitulosChart.data.datasets = [{
        label: novela.titulo,
        data: novela.capitulos,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
    }];
    capitulosChart.update();

    seguidoresChart.data.labels = semanas;
    seguidoresChart.data.datasets = [{
        label: novela.titulo,
        data: novela.seguidores,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1,
    }];
    seguidoresChart.update();

    visitasChart.data.labels = semanas;
    visitasChart.data.datasets = [{
        label: novela.titulo,
        data: novela.visitas,
        borderColor: 'rgba(255, 159, 64, 1)',
        tension: 0.1,
    }];
    visitasChart.update();

    // Mostrar el gráfico de visitas por defecto
    mostrarGrafico('visitasChart');

    // Desplazar hacia los gráficos
    scrollToElement('chartsContainer');
}

// Crear los gráficos
let capitulosChart, seguidoresChart, visitasChart;

function crearGraficos() {
    const ctxCapitulos = document.getElementById('capitulosChart').getContext('2d');
    const ctxSeguidores = document.getElementById('seguidoresChart').getContext('2d');
    const ctxVisitas = document.getElementById('visitasChart').getContext('2d');

    capitulosChart = new Chart(ctxCapitulos, {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            plugins: { tooltip: { mode: 'index', intersect: false } },
            scales: {
                x: { title: { display: true, text: 'Semanas' } },
                y: { title: { display: true, text: 'Capítulos' } },
            },
        },
    });

    seguidoresChart = new Chart(ctxSeguidores, {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            plugins: { tooltip: { mode: 'index', intersect: false } },
            scales: {
                x: { title: { display: true, text: 'Semanas' } },
                y: { title: { display: true, text: 'Seguidores' } },
            },
        },
    });

    visitasChart = new Chart(ctxVisitas, {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            plugins: { tooltip: { mode: 'index', intersect: false } },
            scales: {
                x: { title: { display: true, text: 'Semanas' } },
                y: { title: { display: true, text: 'Visitas' } },
            },
        },
    });
}

// Mostrar/ocultar gráficos según el botón seleccionado
function mostrarGrafico(id) {
    document.getElementById('capitulosChart').style.display = 'none';
    document.getElementById('seguidoresChart').style.display = 'none';
    document.getElementById('visitasChart').style.display = 'none';

    document.getElementById(id).style.display = 'block';

    document.querySelectorAll('.buttons button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(`btn${id.charAt(0).toUpperCase() + id.slice(1, -5)}`).classList.add('active');
}

// Crear la galería de novelas
function crearGaleria() {
    const gallery = document.getElementById('novelasGallery');
    gallery.innerHTML = '';

	novelas.sort((a, b) => a.titulo.localeCompare(b.titulo));

    novelas.forEach((novela, index) => {
        const novelaElement = document.createElement('div');
        novelaElement.className = 'novela';
        novelaElement.innerHTML = `
            <img src="../../covers/${encodeURIComponent(novela.titulo)}.webp" alt="${novela.titulo}" class="novel-cover">
            <h3>${novela.titulo}</h3>
            <a href="${novela.url}" target="_blank">Ver en la web</a>
        `;
        novelaElement.addEventListener('click', () => cargarNovela(index));
        gallery.appendChild(novelaElement);
    });
}


// Escuchar el evento de scroll para mostrar/ocultar el botón "Volver arriba"
window.addEventListener('scroll', toggleBackToTopButton);

// Inicializar galería y gráficos
crearGraficos();
crearGaleria();
mostrarGrafico('visitasChart');

// Asignar eventos a los botones
document.getElementById('btnCapitulos').addEventListener('click', () => mostrarGrafico('capitulosChart'));
document.getElementById('btnSeguidores').addEventListener('click', () => mostrarGrafico('seguidoresChart'));
document.getElementById('btnVisitas').addEventListener('click', () => mostrarGrafico('visitasChart'));

// Funcionalidad del botón "Volver arriba"
const backToTop = document.getElementById("backToTop");
	backToTop.onclick = function() {
		window.scrollTo({ top: 0, behavior: 'smooth'});
	};