document.addEventListener('DOMContentLoaded', () => {
    const tablesContainer = document.getElementById('tables-container');
    if (!tablesContainer) {
        console.error('El contenedor "tables-container" no se encuentra en el HTML.');
        return;
    }

    if (!data || !Array.isArray(data)) {
        console.error('Datos no disponibles o incorrectos.');
        return;
    }

    // Mapeo para los números ordinales
    const ordinalMap = {
        'primer': 1, 'segundo': 2, 'tercer': 3, 'cuarto': 4, 'quinto': 5, 'sexto': 6, 'séptimo': 7, 'septimo': 7, 'octavo': 8, 'noveno': 9, 'décimo': 10,
        'undécimo': 11, 'duodécimo': 12, 'décimo tercer': 13, 'décimo cuarto': 14, 'décimo quinto': 15, 'décimo sexto': 16, 
        'décimo séptimo': 17, 'décimo octavo': 18, 'décimo noveno': 19, 'vigésimo': 20, 'vigésimo primer': 21, 'vigésimo segundo': 22,
        'vigésimo tercer': 23, 'vigésimo cuarto': 24, 'vigésimo quinto': 25, 'vigésimo sexto': 26, 'vigésimo séptimo': 27, 
        'vigésimo octavo': 28, 'vigésimo noveno': 29, 'trigésimo': 30, 'trigésimo primer': 31, 'trigésimo segundo': 32, 
        'trigésimo tercer': 33, 'trigésimo cuarto': 34, 'trigésimo quinto': 35, 'trigésimo sexto': 36, 'trigésimo séptimo': 37, 
        'trigésimo octavo': 38, 'trigésimo noveno': 39, 'cuadragésimo': 40, 'cuadragésimo primer': 41, 'cuadragésimo segundo': 42,
        'cuadragésimo tercer': 43, 'cuadragésimo cuarto': 44, 'cuadragésimo quinto': 45, 'cuadragésimo sexto': 46, 
        'cuadragésimo séptimo': 47, 'cuadragésimo octavo': 48, 'cuadragésimo noveno': 49, 'quincuagésimo': 50, 'quincuagésimo primer': 51, 
        'quincuagésimo segundo': 52, 'quincuagésimo tercer': 53, 'quincuagésimo cuarto': 54, 'quincuagésimo quinto': 55, 
        'quincuagésimo sexto': 56, 'quincuagésimo séptimo': 57, 'quincuagésimo octavo': 58, 'quincuagésimo noveno': 59, 
        'sexagésimo': 60, 'sexagésimo primer': 61, 'sexagésimo segundo': 62, 'sexagésimo tercer': 63, 'sexagésimo cuarto': 64, 
        'sexagésimo quinto': 65, 'sexagésimo sexto': 66, 'sexagésimo séptimo': 67, 'sexagésimo octavo': 68, 'sexagésimo noveno': 69, 
        'septuagésimo': 70, 'septuagésimo primer': 71, 'septuagésimo segundo': 72, 'septuagésimo tercer': 73, 'septuagésimo cuarto': 74, 
        'septuagésimo quinto': 75, 'septuagésimo sexto': 76, 'septuagésimo séptimo': 77, 'septuagésimo octavo': 78, 
        'septuagésimo noveno': 79, 'octogésimo': 80, 'octogésimo primer': 81, 'octogésimo segundo': 82, 'octogésimo tercer': 83, 
        'octogésimo cuarto': 84, 'octogésimo quinto': 85, 'octogésimo sexto': 86, 'octogésimo séptimo': 87, 'octogésimo octavo': 88, 
        'octogésimo noveno': 89, 'nonagésimo': 90
    };

    // Función para convertir números romanos a arábigos
    function romanToArabic(roman) {
        const romanNumerals = {
            'I': 1, 'IV': 4, 'V': 5, 'IX': 9, 'X': 10,
            'XL': 40, 'L': 50, 'XC': 90, 'C': 100,
            'CD': 400, 'D': 500, 'CM': 900, 'M': 1000
        };

        roman = roman.toUpperCase(); // Convertir a mayúsculas
        let arabic = 0;
        let i = 0;

        while (i < roman.length) {
            const twoChar = roman.slice(i, i + 2);
            if (romanNumerals[twoChar]) {
                arabic += romanNumerals[twoChar];
                i += 2;
            } else {
                arabic += romanNumerals[roman[i]];
                i += 1;
            }
        }

        return arabic;
    }

    // Función para extraer números romanos de una cadena
    function extractRomanNumber(title) {
        const romanPattern = /(?:día|dia)\s*([IVXLCDM]+)/i;
        const match = title.match(romanPattern);
        if (match && match[1]) {
            return match[1].toUpperCase(); // Devuelve el número romano en mayúsculas
        }
        return null;
    }

    // Función para extraer el número del día desde el título
    function extractDayNumber(title) {
        let normalizedTitle = title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        // Buscar números romanos en el título
        const romanNumber = extractRomanNumber(normalizedTitle);
        if (romanNumber) {
            return romanToArabic(romanNumber);
        }

        // Buscar el número en el mapeo de ordinales
        for (let key in ordinalMap) {
            const regex = new RegExp(`\\b${key}\\b`, 'g');
            if (regex.test(normalizedTitle)) {
                return ordinalMap[key];
            }
        }

        // Buscar números cardinales en el título (e.g., Día 1, Dia 2, etc.)
        const cardinalMatch = normalizedTitle.match(/(?:día|dia)\s*(\d+)/i);
        if (cardinalMatch && cardinalMatch[1]) {
            return parseInt(cardinalMatch[1], 10);
        }

        return null;
    }

    // Función para extraer el número base del título
    function extractBaseNumber(title) {
        const normalizedTitle = title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        const baseMatch = normalizedTitle.match(/(?:día|dia)\s*(\d+)/i);
        if (baseMatch && baseMatch[1]) {
            return parseInt(baseMatch[1], 10);
        }
        return null;
    }

    // Agrupa los datos por usuario y versión
    const groupedData = data.reduce((acc, item) => {
        if (!item || !item.author || !item.title || !item.date) return acc;

        const day = extractDayNumber(item.title);

        const versionPattern = /v\s*\.?\s*(\d+)/i;
        let version = 'Versión 1'; // Por defecto
        const versionMatch = item.title.match(versionPattern);
        if (versionMatch) {
            version = `Versión ${versionMatch[1]}`;
        }

        if (!acc[version]) {
            acc[version] = {};
        }
        if (!acc[version][item.author]) {
            acc[version][item.author] = {};
        }

        if (day) {
            acc[version][item.author][day] = '💚'; // Marca el día como completado
        }

        return acc;
    }, {});

    // Ordena las versiones de menor a mayor
    const sortedVersions = Object.keys(groupedData).sort((a, b) => {
        const versionOrder = {
            'Versión 1': 1,
            'Versión 2': 2,
            'Versión 3': 3,
            'Versión 4': 4,
            'Versión 5': 5,
            'Versión 6': 6,
            'Versión 7': 7,
            'Versión 8': 8,
            'Versión 9': 9,
            'Versión 10': 10,
            'Versión 11': 11
        };
        return versionOrder[a] - versionOrder[b];
    });

    // Crea las tablas y añádelas al contenedor
    sortedVersions.forEach(version => {
        const section = document.createElement('section');
        const heading = document.createElement('h2');
        heading.textContent = `Tabla de Progreso - ${version}`;
        section.appendChild(heading);

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Crea la cabecera de la tabla
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>Usuario</th>' + Array.from({ length: 90 }, (_, i) => `<th>${i + 1}</th>`).join('');
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Crea el cuerpo de la tabla
        const users = Object.keys(groupedData[version]);
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `<td title="@${user}">@${user}</td>` +
                Array.from({ length: 90 }, (_, i) => {
                    const dayNumber = i + 1;
                    const completed = groupedData[version][user][dayNumber] || '❌';
                    return `<td title="@${user}, día ${dayNumber} ${version}">${completed}</td>`;
                }).join('');
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        section.appendChild(table);
        tablesContainer.appendChild(section);
    });
});
