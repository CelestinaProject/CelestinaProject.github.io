function compareNovels() {
    const novelSelect1 = document.getElementById('novel1');
    const novelSelect2 = document.getElementById('novel2');

    const novel1 = newNovels[novelSelect1.value];
    const novel2 = newNovels[novelSelect2.value];

    if (novel1.title === novel2.title) {
        alert('Por favor, selecciona dos novelas distintas.');
        return;
    }
	
    const chaptersDifference = Math.abs(novel1.chapters - novel2.chapters);
    const followersDifference = Math.abs(novel1.followers - novel2.followers);
    const viewsDifference = Math.abs(novel1.views - novel2.views);

    let resultHTML = `
                <div class="novel-info">
                    <img src="${novel1.cover}" alt="${novel1.title}">
                    <h2>${novel1.title}</h2>
                </div>
                <div class="comparison-details">
                    <h3>COMPARACIÓN</h3>
                    <p>Hay <strong>${chaptersDifference}</strong> capítulos de diferencia</p>
                    <p>Hay <strong>${followersDifference}</strong> seguidores de diferencia</p>
                    <p>Hay <strong>${viewsDifference}</strong> visitas de diferencia</p>

					<p style="padding-top:21px">CAPÍTULOS</p>
					<p style="top: -7px; position: relative;"><strong>${novel1.chapters}</strong>  ||  <strong>${novel2.chapters}</strong></p>
					<p style="top: -9px; position: relative;">SEGUIDORES</p>
					<p style="top: -16px; position: relative;"><strong>${novel1.followers}</strong>  ||  <strong>${novel2.followers}</strong></p>
					<p style="top: -17px; position: relative;">VISITAS</p>
					<p style="top: -23px; position: relative;"><strong>${novel1.views}</strong>  ||  <strong>${novel2.views}</strong></p>
                </div>
                <div class="novel-info">
                    <img src="${novel2.cover}" alt="${novel2.title}">
                    <h2>${novel2.title}</h2>
                </div>
            `;

    document.getElementById('comparisonResult').innerHTML = resultHTML;
	
	const comparisonResult = document.getElementById('comparisonResult');
	if (comparisonResult.style.display === 'none' || comparisonResult.style.display === '') {
    comparisonResult.style.display = 'flex';
	}
}