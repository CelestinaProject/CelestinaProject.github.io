document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.particle-container');

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const duration = Math.random() * 3 + 2;
        particle.style.animationDuration = `${duration}s`;

        const translateX = (Math.random()  - 0.5) * 200;
        const translateY = (Math.random() - 0.5) * 200;
        const translateZ = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--translate-x', `${translateX}px`);
        particle.style.setProperty('--translate-y', `${translateY}px`);
        particle.style.setProperty('--translate-z', `${translateY}px`);

        const shapes = ['50%', '0%'];
        particle.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    setInterval(createParticle, 100);
});
