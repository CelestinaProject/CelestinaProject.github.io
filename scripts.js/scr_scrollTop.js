const toTopBtn = document.getElementById("toTopBtn");

	window.onscroll = function() {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			toTopBtn.style.opacity = "100%";
			
		} else {
			toTopBtn.style.opacity = "0%";
		}
	};

	toTopBtn.onclick = function() {
		window.scrollTo({ top: 0, behavior: 'smooth'});
	};