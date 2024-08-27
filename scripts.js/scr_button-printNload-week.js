function printFilteredNovels() {
	const filters = [];
    if (document.getElementById('statusActivo').checked) filters.push('Activo');
    if (document.getElementById('statusInactivo').checked) filters.push('Inactivo');
    if (document.getElementById('statusFinalizado').checked) filters.push('Finalizado');
    if (document.getElementById('statusEliminado').checked) filters.push('Eliminado');
    
    const filteredNovels = newNovels.filter(novel => filters.includes(novel.status));
    let output = '**TOP DE NOVELAS MÁS VISITADAS PUBLICADAS EN NIADD**\n\n';
    
    filteredNovels.forEach((novel, index) => {
        const oldNovel = oldNovels.find(n => n.title === novel.title);
        const oldViews = oldNovel ? oldNovel.views : 0;
        const oldFollowers = oldNovel ? oldNovel.followers : 0;
        const oldChapters = oldNovel ? oldNovel.chapters : 0;
        const countDifferenceViews = novel.views - oldViews;
		const countDifferenceChapters = novel.chapters - oldChapters;
		const countDifferenceFollowers = novel.followers - oldFollowers;
        
        output += `- Top ${index + 1}: ${novel.title}\n`;
        output += `Visitas: ${oldViews} → ${novel.views}\n`;
        output += `Seguidores: ${oldFollowers} → ${novel.followers}\n`;
        output += `Capítulos: ${oldChapters} → ${novel.chapters}\n\n`;
        output += `${novel.url}\n\n`;
        output += `**Obtuviste ${countDifferenceViews} visitas, ${countDifferenceFollowers} seguidores y subiste ${countDifferenceChapters} capítulos**\n\n`;
        output += `>———◇———<\n\n`;
    });
    
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Top_Novelas_Niadd.txt';
    a.click();
    URL.revokeObjectURL(url);
}
