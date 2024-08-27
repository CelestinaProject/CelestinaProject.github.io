function toggleSidebar() {
	document.getElementById('sidebar').classList.toggle('open');
	
	document.getElementById('blurobject');
	blurobject.style.filter = blurobject.style.filter === '' || blurobject.style.filter === '' ? 'blur(2px)' : '';
	
	document.getElementById('blurobject2');
	blurobject2.style.filter = blurobject2.style.filter === '' || blurobject2.style.filter === '' ? 'blur(2px)' : '';
	
	document.getElementById('blurobject3');
	blurobject3.style.filter = blurobject3.style.filter === '' || blurobject3.style.filter === '' ? 'blur(2px)' : '';
	
	document.getElementById('blurobject4');
	blurobject4.style.filter = blurobject4.style.filter === '' || blurobject4.style.filter === '' ? 'blur(2px)' : '';
	
	document.getElementById('bgblur');
	bgblur.style.display = bgblur.style.display === 'none' || bgblur.style.display === 'none' ? 'flex' : 'none';
	
	document.getElementById('badi');
	badi.style.overflow = badi.style.overflow === '' || badi.style.overflow === '' ? 'hidden' : '';
}
window.onclick = (event) => {
		if (event.target === document.getElementById('close-btn')) {
			document.getElementById('close-btn').classList.toggle('open');
		}
};