const particleContainer = document.getElementById('particle-container');

		// Definición de emojis de Halloween y colores
		const halloweenEmojis = ["🎃", "👻", "🕸️", "🦇", "🍂"];
		const colors = ["#ff7518", "#e9b44c", "#f8d49d", "#c13b00", "#d67d3e"];

		function createParticle() {
			const particle = document.createElement("span");
			particle.classList.add("particle");
			particle.textContent = halloweenEmojis[Math.floor(Math.random() * halloweenEmojis.length)];

			// Estilos aleatorios
			particle.style.left = Math.random() * 100 + "vw";
			particle.style.fontSize = Math.random() * 15 + 20 + "px";
			particle.style.color = colors[Math.floor(Math.random() * colors.length)];
			particle.style.animationDuration = Math.random() * 3 + 4 + "s"; // Duración entre 4-7s
			particle.style.opacity = Math.random() * 0.5 + 0.5; // Opacidad entre 0.5-1

			particleContainer.appendChild(particle);

			// Elimina la partícula después de la animación
			particle.addEventListener("animationend", () => {
				particle.remove();
			});
		}

		// Ajustar el número de partículas activas en pantalla
		const maxParticles = 20;
		let activeParticles = 0;

		function generateParticles() {
			if (activeParticles < maxParticles) {
				createParticle();
				activeParticles++;
				setTimeout(() => activeParticles--, Math.random() * 3000 + 4000); // Controla el número de partículas activas
			}
		}

		// Crear partículas de forma continua
		setInterval(generateParticles, 200);