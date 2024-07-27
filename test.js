const novels = [
    {
        title: "Novela 1",
        author: "Autor 1",
        theme: "Temática 1",
        genre: "Género 1",
        score: 8.5,
        cover: "img/novela1.jpg",
        contentFile: "novels/novela1.txt",
        downloadLink: "novels/novela1.txt",
        reviews: "reviews/reviews-novela1.json"
    },
    {
        title: "Novela 2",
        author: "Autor 2",
        theme: "Temática 2",
        genre: "Género 2",
        score: 9.2,
        cover: "img/novela2.jpg",
        contentFile: "novels/novela2.txt",
        downloadLink: "novels/novela2.txt",
        reviews: "reviews/reviews-novela2.json"
    }
    // Añadir más novelas según sea necesario
];

function displayNovels() {
    const container = document.getElementById('novels-container');
    novels.forEach(novel => {
        const novelDiv = document.createElement('div');
        novelDiv.classList.add('novel');
        novelDiv.innerHTML = `
            <img src="${novel.cover}" alt="${novel.title}">
            <div class="novel-info">
                <h2>${novel.title}</h2>
                <p><strong>Autor:</strong> ${novel.author}</p>
                <p><strong>Temática:</strong> ${novel.theme}</p>
                <p><strong>Género:</strong> ${novel.genre}</p>
                <p><strong>Puntaje:</strong> ${novel.score}</p>
            </div>
        `;
        novelDiv.addEventListener('click', () => openModal(novel));
        container.appendChild(novelDiv);
    });
	
	lazyLoadImages();
}

function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('.lazy');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('lazy-loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        observer.observe(img);
    });
}

function openModal(novel) {
    const modal = document.getElementById('modal');
    document.getElementById('novel-title').innerText = novel.title;
    document.getElementById('novel-author').innerText = `Autor: ${novel.author}`;
    document.getElementById('novel-theme').innerText = `Temática: ${novel.theme}`;
    document.getElementById('novel-genre').innerText = `Género: ${novel.genre}`;
    document.getElementById('novel-score').innerText = `Puntaje: ${novel.score}`;
    document.getElementById('download-button').onclick = () => {
        window.location.href = novel.downloadLink;
    };
    
    fetch(novel.contentFile)
        .then(response => response.text())
        .then(content => {
            const wordCount = content.split(/\s+/).length;
            const charCount = content.length;
            const readingTime = Math.ceil(wordCount / 200); // Asumiendo una velocidad de lectura de 200 palabras por minuto

            document.getElementById('novel-words').innerText = `Número de palabras: ${wordCount}`;
            document.getElementById('novel-characters').innerText = `Número de caracteres: ${charCount}`;
            document.getElementById('novel-reading-time').innerText = `Tiempo estimado de lectura: ${readingTime} minutos`;

            // Fragmentar el contenido
            const contentDiv = document.getElementById('novel-content');
            contentDiv.innerHTML = content.substring(0, 1000); // Cargar solo los primeros 1000 caracteres
            let loadedContentLength = 1000;

            contentDiv.onscroll = () => {
                const totalHeight = contentDiv.scrollHeight - contentDiv.clientHeight;
                const scrollPosition = contentDiv.scrollTop;
                const scrollPercentage = (scrollPosition / totalHeight) * 100;
                progressBar.style.width = `${scrollPercentage}%`;

                if (scrollPercentage > 80 && loadedContentLength < content.length) {
                    // Cargar más contenido cuando se haya desplazado un 80%
                    const nextChunk = content.substring(loadedContentLength, loadedContentLength + 1000);
                    contentDiv.innerHTML += nextChunk;
                    loadedContentLength += 1000;
                }
            };
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
	
// Cargar críticas con AJAX
    fetch(novel.reviews)
        .then(response => response.json())
        .then(reviews => {
            const reviewsContainer = document.getElementById('reviews-container');
            reviewsContainer.innerHTML = '';
            reviews.forEach(review => {
                const reviewDiv = document.createElement('div');
                reviewDiv.classList.add('review');
                
                reviewDiv.innerHTML = `
                    <img src="${review.profilePic}" alt="${review.critic}">
                    <div class="review-content">
                        <h4>${review.critic}</h4>
                        <p>${review.reviewText}</p>
                        <p class="score">Puntaje: ${review.score}</p>
                    </div>
                `;
                
                reviewsContainer.appendChild(reviewDiv);
            });
        })
        .catch(error => console.error('Error al cargar las críticas:', error));

    modal.style.display = 'block';
}

    // Configurar el medidor de progreso
    const contentDiv = document.getElementById('novel-content');
    contentDiv.scrollTop = 0;
    const progressBar = document.getElementById('progress-bar');
    contentDiv.onscroll = () => {
        const totalHeight = contentDiv.scrollHeight - contentDiv.clientHeight;
        const scrollPosition = contentDiv.scrollTop;
        const scrollPercentage = (scrollPosition / totalHeight) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    };

document.getElementById('close-button').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

window.onclick = (event) => {
    if (event.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
};

displayNovels();
