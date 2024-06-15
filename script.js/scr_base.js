function toggleSidebar() {
                document.getElementById('sidebar').classList.toggle('open');
            }

            let currentIndex = 0;
            const items = document.querySelectorAll('.carousel-item');
            function showSlide(index) {
                items.forEach((item, i) => {
                    item.classList.remove('active');
                    if (i === index) {
                        item.classList.add('active');
                    }
                });
                const offset = -index * 100;
                document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
            }
            function nextSlide() {
                currentIndex = (currentIndex + 1) % items.length;
                showSlide(currentIndex);
            }
            setInterval(nextSlide, 5000);