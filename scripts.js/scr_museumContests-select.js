const contests = [
    {
        title: "LUCES Y SOMBRAS",
        description: "Un concurso que enfrenta la luz y la oscuridad.",
        participants: 9,
        year: 2024,
		author: "M.J.Wolfrore",
        cover: "../assets/banners/events/24_lys-2.webp",
		bg: "../rules/museum/lucesysombras/banner_ganadores.webp",
		style: "color: yellow;",
        link: "museum/lucesysombras.html"
    },
    {
        title: "KEIM FICTION",
        description: "Un concurso de sci-fi.",
        participants: "10",
        year: 2024,
		author: "Bocchi",
        cover: "../assets/banners/events/24_kf-2.webp",
		bg: "../assets/banners/events/24_kf-1.webp",
		style: "color: red;",
        link: ""
    },
    /*{
        title: "Concurso de Novelas 2022",
        description: "Un concurso que destaca las mejores novelas del año 2022.",
        participants: 180,
        year: 2022,
        cover: "novels_covers/ADES (NL).png",
		bg: "assets/banners/banner_event-1.png",
        link: "concurso2022.html"
    },
    {
        title: "Concurso de Novelas 2023",
        description: "Un concurso que destaca las mejores novelas del año 2023.",
        participants: 220,
        year: 2023,
        cover: "novels_covers/ADES (NL).png",
		bg: "assets/banners/banner_event-1.png",
        link: "concurso2023.html"
    },
    {
        title: "Concurso de Novelas 2024",
        description: "Un concurso que destaca las mejores novelas del año 2024.",
        participants: 250,
        year: 2024,
        cover: "novels_covers/ADES (NL).png",
		bg: "novels_covers/ADES (NL).png",
        link: "concurso2024.html"
    }*/
];

function displayContests() {
    const container = document.getElementById('contests-container');
    contests.forEach(contest => {
        const contestDiv = document.createElement('a');
        contestDiv.classList.add('contest');
        contestDiv.href = contest.link;

        contestDiv.innerHTML = `
            <img src="${contest.cover}" alt="${contest.title}" class="contest-img">
			<div class="contest-prev">
				<h3>${contest.title}</h3>
			</div>
			<div class="contest-prevShadow" style="${contest.style}">
				<h3>${contest.title}</h3>
			</div>
            <div class="contest-info">
                <h2>${contest.title}</h2>
                <p>${contest.description}</p>
				<p><strong>Autor:</strong> ${contest.author}</p>
                <p><strong>Participantes:</strong> ${contest.participants}</p>
                <p><strong>Año:</strong> ${contest.year}</p>
            </div>
			<div class="contest-bg">
				<img src="${contest.bg}" alt="${contest.title}" class="contest-bg">
			</div>
        `;

        container.appendChild(contestDiv);
    });
}

document.addEventListener('DOMContentLoaded', displayContests);
