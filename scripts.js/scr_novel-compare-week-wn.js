function compareNovels() {
    const novelSelect1 = document.getElementById('novel1');
    const novelSelect2 = document.getElementById('novel2');

    const novel1 = newNovels[novelSelect1.value];
    const novel2 = newNovels[novelSelect2.value];

    if (novel1.title === novel2.title) {
        alert('Por favor, selecciona dos novelas distintas.');
        return;
    }
	
    const collectionsDifference = Math.abs(novel1.collections - novel2.collections);
    const ratingDifference = Math.abs(novel1.rating - novel2.rating);

    let resultHTML = `
                <div class="novel-info">
                    <img src="../novels/covers/${novel1.title}.webp" alt="${novel1.title}">
                    <h2>${novel1.title}</h2>
                </div>
                <div class="comparison-details">
                    <h3>COMPARACIÓN</h3>
                    <p>Hay <strong>${collectionsDifference}</strong> colecciones de diferencia</p>
                    <p>Hay <strong>${ratingDifference}</strong> estrellas de diferencia</p>

					<p style="padding-top:21px">COLECCIONES</p>
					<p style="top: -7px; position: relative;"><strong>${novel1.collections}</strong>  ||  <strong>${novel2.collections}</strong></p>
					<p style="top: -9px; position: relative;">ESTRELLAS</p>
					<p style="top: -16px; position: relative;"><strong>${novel1.rating}</strong>  ||  <strong>${novel2.rating}</strong></p>
                </div>
                <div class="novel-info">
                    <img src="../novels/covers/${novel2.title}.webp" alt="${novel2.title}">
                    <h2>${novel2.title}</h2>
                </div>
            `;

    document.getElementById('comparisonResult').innerHTML = resultHTML;
	
	const comparisonResult = document.getElementById('comparisonResult');
	if (comparisonResult.style.display === 'none' || comparisonResult.style.display === '') {
    comparisonResult.style.display = 'flex';
	}
}