function togglePrintMenu() {
    const printMenu = document.getElementById('printMenu');
    printMenu.style.display = printMenu.style.display === 'none' || printMenu.style.display === '' ? 'block' : 'none';
	
	filterMenu.style.display = filterMenu.style.display === 'block' || filterMenu.style.display === '' ? 'none' : 'none';
	
	filterToggleImg.style.rotate = filterToggleImg.style.rotate === '0deg' || filterToggleImg.style.rotate === '180deg' ? '0deg' : '0deg';
}

function toggleFilterMenu() {
    const filterMenu = document.getElementById('filterMenu');
    filterMenu.style.display = filterMenu.style.display === 'none' || filterMenu.style.display === '' ? 'block' : 'none';
	
	printMenu.style.display = printMenu.style.display === 'block' || printMenu.style.display === '' ? 'none' : 'none';
	
	const filterToggleImg = document.getElementById('filterToggleImg');
	filterToggleImg.style.rotate = filterToggleImg.style.rotate === '180deg' || filterToggleImg.style.rotate === '180deg' ? '0deg' : '180deg';
}

function toggleCompareMenu() {
	const compareForm = document.getElementById('compareForm');
    compareForm.style.display = compareForm.style.display === '' || compareForm.style.display === 'none' ? 'flex' : 'none';
	const comparisonResult = document.getElementById('comparisonResult');
    comparisonResult.style.display = comparisonResult.style.display === '' || comparisonResult.style.display === 'none' ? 'flex' : 'none';
	const compareToggleImg = document.getElementById('compareToggleImg');
	compareToggleImg.style.rotate = compareToggleImg.style.rotate === '0deg' || compareToggleImg.style.rotate === '0deg' ? '45deg' : '0deg';
	compareToggleImg.title = compareToggleImg.title === 'Cerrar Comparador' || compareToggleImg.title === 'Cerrar Comparador' ? 'Abrir Comparador' : 'Cerrar Comparador';
}

function togglePagination() {
	const pagination = document.getElementById('pagination');
	pagination.style.display = pagination.style.display === 'none' || pagination.style.rotate === '' ? 'none' : 'none';
}