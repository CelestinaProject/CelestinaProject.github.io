function printFilteredNovels() {
	const filters = [];
    let output = '**TOP DE NOVELAS CON MÁS COLECCIONES EN WEBNOVEL**\n\n';
    
    filteredNovels.forEach((novel, index) => {
        const oldNovel = oldNovels.find(n => n.title === novel.title);
        const oldRating = oldNovel ? oldNovel.rating : 0;
        const oldCollections = oldNovel ? oldNovel.collections : 0;
        const oldChapters = oldNovel ? oldNovel.chapters : 0;
        const countDifferenceRating = novel.rating - oldRating;
		const countDifferenceChapters = novel.chapters - oldChapters;
		const countDifferenceCollectionss = novel.collections - oldCollections;
        
        output += `- Top ${index + 1}: ${novel.title}\n`;
        output += `Colecciones: ${oldCollections} → ${novel.collections}\n`;
        output += `Capítulos: ${oldChapters} → ${novel.chapters}\n`;
		output += `Calificación: ${oldRating} → ${novel.rating}\n\n`;
        output += `${novel.url}\n\n`;
        output += `**Obtuviste ${countDifferenceCollectionss} colecciones, ${countDifferenceRating} estrellas y subiste ${countDifferenceChapters} capítulos**\n\n`;
        output += `>———◇———<\n\n`;
    });
    
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Top_Novelas_WebNovel.txt';
    a.click();
    URL.revokeObjectURL(url);
}
