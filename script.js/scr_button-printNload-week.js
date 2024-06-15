            function toggleFilterMenu() {
                const filterMenu = document.getElementById('filterMenu');
                filterMenu.style.display = filterMenu.style.display === 'none' || filterMenu.style.display === '' ? 'block' : 'none';
            }
            function printFilteredNovels() {
                const filters = [];
                if (document.getElementById('statusActivo').checked) filters.push('Activo');
                if (document.getElementById('statusInactivo').checked) filters.push('Inactivo');
                if (document.getElementById('statusFinalizado').checked) filters.push('Finalizado');
                if (document.getElementById('statusEliminado').checked) filters.push('Eliminado');
                const filteredNovels = novels.filter(novel => filters.includes(novel.status));
                let output = '**TOP DE NOVELAS MÁS SEGUIDAS PUBLICADAS EN NIADD**\n\n';
                filteredNovels.forEach((novel, index) => {
                    output += `- Top ${index + 1}: ${novel.title}\nVisitas: 0000 → ${novel.views}\nSeguidores: 0000 → ${novel.followers}\nCapítulos: 0000 → ${novel.chapters}\n\n${novel.url}\n\n**Ganaste 000 seguidores**\n\n>———◇———<\n\n`;
                });
                const blob = new Blob([output], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Top_Novelas_Niadd.txt';
                a.click();
                URL.revokeObjectURL(url);
            }