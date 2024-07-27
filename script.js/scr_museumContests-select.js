const contests = [
    {
        title: "Luces y Sombras",
        description: "Un concurso que destaca las mejores novelas del año 2020.",
        participants: 9,
        year: 2024,
        cover: "novels_covers/ADES (NL).png",
		bg: "assets/banners/banner_event-1.png",
		style: "color: yellow;",
        link: "concurso2020.html"
    },
    {
        title: "Sadomasoquismo Extremo de las Siete Lenguas",
        description: "Un concurso que destaca las mejores novelas del año 2021.",
        participants: 200,
        year: 2021,
        cover: "novels_covers/ADES (NL).png",
		bg: "assets/banners/banner_event-1.png",
        link: "concurso2021.html"
    },
    {
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
    }
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
