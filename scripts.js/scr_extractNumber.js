// Ordenar los datos por fecha
data.sort((a, b) => new Date(a.date) - new Date(b.date));

// Crear un objeto para agrupar los datos por versión
const groupedData = {};

// Filtrar y agrupar los datos
data.forEach(entry => {
    // Convertir el título a minúsculas y eliminar tildes
    const normalizedTitle = entry.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

	// Expresión regular para detectar la versión con espacios, guiones o puntos opcionales
	const versionMatch = normalizedTitle.match(/v[\s\-\.]*?(\d+)/i);
    
    if (versionMatch) {
        const version = `v${versionMatch[1]}`; // Ejemplo: "v2", "v3", etc.

        if (!groupedData[version]) {
            groupedData[version] = {};
        }

        // Expresión regular para obtener el número del día
        const dayMatch = normalizedTitle.match(/(?:dia|día)\s*(\d+)/);
        const day = dayMatch ? dayMatch[1] : null;

        if (day) {
            const date = new Date(entry.date);
            if (!groupedData[version][entry.author]) {
                groupedData[version][entry.author] = {
                    days: Array(90).fill(null), // Inicializa como null para las celdas
                    lastPublication: null // Guardar la última publicación
                };
            }

            // Verificar condiciones para marcar el día
            const authorData = groupedData[version][entry.author];
            authorData.days[day - 1] = { date: entry.date, dateObj: date }; // Guarda la fecha y el objeto de fecha
            
            // Verificar si la última publicación es la misma
            if (authorData.lastPublication) {
                const lastDate = authorData.lastPublication.dateObj; // Usar el objeto de fecha de la última publicación

                // Solo marcar con "💀" si están en el mismo día y hay menos de 24 horas
                const sameDay = date.toDateString() === lastDate.toDateString();
                const timeDifference = date - lastDate;

                if (sameDay && timeDifference < 24 * 60 * 60 * 1000) {
                    authorData.days[day - 1].status = "💀"; // Marca el día con "💀"
                }
            }

            // Condición para marcar con "❌" si ha pasado más de una semana desde la última publicación
            if (authorData.lastPublication) {
                const weekDifference = (date - authorData.lastPublication.dateObj) / (1000 * 60 * 60 * 24);
                if (weekDifference > 8) {
                    authorData.days[day - 1].status = "❌"; // Marca el día con "❌"
                }
            }

            // Actualizar la última publicación
            authorData.lastPublication = { date: entry.date, dateObj: date, day: day };
        }
    }
});

// Función para crear y mostrar las tablas en el HTML
function displayTables() {
    const container = document.getElementById("tablesContainer");

    for (const version in groupedData) {
        const table = document.createElement("table");
        const header = table.createTHead();
        const headerRow = header.insertRow();
        
        headerRow.insertCell().outerHTML = `<th>Usuario</th>`;
        
        for (let i = 1; i <= 90; i++) {
            headerRow.insertCell().outerHTML = `<th>${i}</th>`;
        }

        const body = table.createTBody();

        for (const author in groupedData[version]) {
            const row = body.insertRow();
            row.insertCell().textContent = author;

            groupedData[version][author].days.forEach((dayInfo, index) => {
                const cell = row.insertCell();
                if (dayInfo) {
                    cell.textContent = dayInfo.status || "✅"; // Muestra el estado o marca por defecto
                    cell.style.cursor = "pointer"; // Cambia el cursor para indicar que es clickeable

                    // Añadir evento de clic
                    cell.addEventListener("click", () => {
                        const prevDayInfo = groupedData[version][author].days[index - 1];
                        const participationStatus = checkParticipationStatus(groupedData[version][author]);
                        let message = `${author}\nDía seleccionado: ${index + 1} - Fecha: ${dayInfo.date}`;
                        if (prevDayInfo) {
                            const dayDifference = Math.abs(new Date(dayInfo.date) - new Date(prevDayInfo.date)) / (1000 * 60 * 60 * 24);
                            message += `
                                \nDía anterior: ${index} - Fecha: ${prevDayInfo.date}
                                \nDiferencia: ${dayDifference} días`;
                        }
                        message += `\nEstado de participación: ${participationStatus}`;
                        alert(message);
                    });
                } else {
                    cell.textContent = "➖"; // Muestra "➖" si no hay publicación
                }
            });
        }

        container.appendChild(table);
    }
}

// Función para verificar el estado de participación del usuario
function checkParticipationStatus(authorData) {
    const statuses = authorData.days.map(dayInfo => dayInfo ? dayInfo.status : null);
    if (statuses.includes("❌")) {
        return "Perdió por falta de participación (más de una semana sin publicar).";
    } else {
        return "Sigue participando.";
    }
}

// Función para obtener el mensaje de participación
function getParticipationMessage(authorData) {
    const statuses = authorData.days.map(dayInfo => dayInfo ? dayInfo.status : null);
    if (statuses.includes("❌")) {
        return "Perdió por falta de participación (más de una semana sin publicar).";
    }
    if (statuses.includes("💀")) {
        return "Publicó en menos de 24 horas desde la última publicación.";
    }
    return "Sigue participando.";
}

// Llama a la función para mostrar las tablas
displayTables();