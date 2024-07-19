const toTopBtn = document.getElementById("toTopBtn");

	window.onscroll = function() {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			toTopBtn.style.display = "flex";
			
		} else {
			toTopBtn.style.display = "none";
		}
	};

	toTopBtn.onclick = function() {
		window.scrollTo({ top: 0, behavior: 'smooth'});
	};