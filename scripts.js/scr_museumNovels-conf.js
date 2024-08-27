document.addEventListener('DOMContentLoaded', () => {
novels
	// Definición de displayNovels
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
					<p><strong>Puntaje:</strong> ${novel.score}</p>
					<p><strong>Top:</strong> ${novel.top}</p>
				</div>
			`;
			novelDiv.addEventListener('click', () => openModal(novel));
			container.appendChild(novelDiv);
		});
	}

	function openModal(novel) {
			const boddy = document.getElementById('boddy');
			boddy.style.overflow = 'hidden';
			const modal = document.getElementById('modal');
			const modalContent = document.getElementById('modal-content');
			window.location.href = `#${encodeURIComponent(novel.title)}`;
			
			document.getElementById('novel-title').innerText = novel.titlereal;
			document.getElementById('novel-author').innerText = `Autor: ${novel.author}`;
			document.getElementById('novel-theme').innerText = `Temática: ${novel.theme}`;
			document.getElementById('novel-genre').innerText = `Género: ${novel.genre}`;
			document.getElementById('novel-score').innerText = `Puntaje: ${novel.score}`;
			document.getElementById('novel-synopsis').innerText = `Sinopsis: ${novel.synopsis}`;

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
			
			// Renderizar el contenido de la novela
			const contentDiv = document.getElementById('novel-content');
			contentDiv.innerHTML = '';
			novel.content.forEach(paragraph => {
				const p = document.createElement('p');
				p.innerHTML = paragraph.text;
				if (paragraph.styles.includes("bold")) p.style.fontWeight = "bold";
				if (paragraph.styles.includes("italic")) p.style.fontStyle = "italic";
				if (paragraph.styles.includes("color")) p.style.color = paragraph.styles.match(/color:\s*(.*?);/)[1];
				if (paragraph.styles.includes("right")) p.classList.add('right');
				if (paragraph.styles.includes("cross")) p.classList.add('cross');
				if (paragraph.styles.includes("center")) p.classList.add('center');
				if (paragraph.styles.includes("underline")) p.classList.add('underline');
				if (paragraph.styles.includes("uppercase")) p.classList.add('uppercase');
				if (paragraph.styles.includes("highlight")) p.classList.add('highlight');
				if (paragraph.styles.includes("shadow")) p.classList.add('shadow');
				if (paragraph.styles.includes("large")) p.classList.add('large');
				if (paragraph.styles.includes("small")) p.classList.add('small');
				if (paragraph.styles.includes("indent")) p.classList.add('indent');
				if (paragraph.styles.includes("monospace")) p.classList.add('monospace');
				if (paragraph.styles.includes("serif")) p.classList.add('serif');
				if (paragraph.styles.includes("sans-serif")) p.classList.add('sans-serif');
				if (paragraph.styles.includes("spacing")) p.classList.add('spacing');
				if (paragraph.styles.includes("line-height")) p.classList.add('line-height');
				if (paragraph.styles.includes("quote")) p.classList.add('quote');
				if (paragraph.styles.includes("title")) p.classList.add('title');
				if (paragraph.styles.includes("rose")) p.classList.add('rose');
				contentDiv.appendChild(p);
			});

			// Sección de enlaces de descarga
			document.getElementById('download-button').onclick = () => {
				window.location.href = novel.downloadLinks;
			};
			
			document.getElementById('downloadepub-button').onclick = () => {
				window.location.href = novel.downloadLinkEpub;
			};
			
			// Calcular estadísticas de la novela
			const wordCount = novel.content.reduce((acc, paragraph) => acc + paragraph.text.split(/\s+/).length, 0);
			const charCount = novel.content.reduce((acc, paragraph) => acc + paragraph.text.length, 0);
			const readingTime = Math.ceil(wordCount / 200);

			document.getElementById('novel-words').innerText = `Número de palabras: ${wordCount}`;
			document.getElementById('novel-characters').innerText = `Número de caracteres: ${charCount}`;
			document.getElementById('novel-reading-time').innerText = `Tiempo estimado de lectura: ${readingTime} minutos`;
			
			// Configuración del botón de compartir
const shareButton = document.getElementById("share-button");
shareButton.onclick = function() {
    const shareText = `Título: ${novel.title}\nAutor: ${novel.author}\nGénero: ${novel.genre}\nSinopsis: ${novel.synopsis}`;
    const shareUrl = window.location.href;
    const shareTitle = `${novel.museumname}`;

    if (navigator.share) {
        navigator.share({
            title: shareTitle,
            text: shareText,
            url: shareUrl
        }).catch(error => console.log('Error al compartir:', error));
    } else {
        // Si no está soportado, mostrar opciones de compartir manual
        const encodedText = encodeURIComponent(shareText);
        const encodedUrl = encodeURIComponent(shareUrl);

        // WhatsApp
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText} ${encodedUrl}`;

        // Twitter
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=LucesySombras,Novela`;

        // Facebook
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

        // LinkedIn
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

        // Crear un modal o dropdown con opciones
        const shareOptionsModal = document.createElement('div');
        shareOptionsModal.classList.add('share-options-modal');

        shareOptionsModal.innerHTML = `
            <h3>Compartir en:</h3>
            <ul>
                <li><a href="${whatsappUrl}" target="_blank">WhatsApp</a></li>
                <li><a href="${twitterUrl}" target="_blank">Twitter</a></li>
                <li><a href="${facebookUrl}" target="_blank">Facebook</a></li>
                <li><a href="${linkedinUrl}" target="_blank">LinkedIn</a></li>
                <li><a href="#" id="copy-link">Copiar enlace</a></li>
            </ul>
        `;

        document.body.appendChild(shareOptionsModal);

        // Copiar enlace al portapapeles
        document.getElementById('copy-link').onclick = function() {
            navigator.clipboard.writeText(shareUrl).then(() => {
                alert('Enlace copiado al portapapeles');
            }).catch(err => {
                console.log('Error al copiar enlace: ', err);
            });
        };

        // Cerrar el modal después de elegir una opción
        shareOptionsModal.addEventListener('click', () => {
            shareOptionsModal.remove();
        });
    }
};

			// Mostrar críticas
			const reviewsContainer = document.getElementById('reviews-container');
			reviewsContainer.innerHTML = '';
			novel.reviews.forEach(review => {
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
			
			modal.style.display = 'flex';

			// Configurar el medidor de progreso
			const progressBar = document.getElementById('progress-bar');
			contentDiv.onscroll = () => {
				const totalHeight = contentDiv.scrollHeight - contentDiv.clientHeight;
				const scrollPosition = contentDiv.scrollTop;
				const scrollPercentage = (scrollPosition / totalHeight) * 100;
				progressBar.style.width = `${scrollPercentage}%`;
			};
		}

	// Cerrar el modal
	document.getElementById('close-button').addEventListener('click', () => {
		document.getElementById('modal').style.display = 'none';
		boddy.style.overflow = boddy.style.overflow === 'hidden' || boddy.style.overflow === 'hidden' ? 'visible' : 'hidden';
	});

	// Cerrar el modal al hacer clic fuera de él
	window.onclick = (event) => {
		if (event.target === document.getElementById('modal')) {
			document.getElementById('modal').style.display = 'none';
			boddy.style.overflow = boddy.style.overflow === 'hidden' || boddy.style.overflow === 'hidden' ? 'visible' : 'hidden';
		}
	};

	displayNovels();
});