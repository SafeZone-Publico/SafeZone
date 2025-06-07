const incidentTypeNamesPT = {
    'fallen_tree': 'Árvore Caída',
    'heat_wave': 'Calor Intenso',
    'fire': 'Fogo',
    'high_waves': 'Ondas Grandes',
    'storm': 'Tempestade',
    'tornado': 'Tornado'
};

const severityNamesPT = {
    'low': 'Baixo',
    'medium': 'Médio',
    'high': 'Alto',
    'critical': 'Crítico'
};

function createOccurrenceElement(type, description, severity) {
    const occurrenceDiv = document.createElement('div');
    occurrenceDiv.className = 'faq-item';

    const typePT = incidentTypeNamesPT[type] || 'Desconhecido';
    const severityPT = severityNamesPT[severity] || 'Desconhecido';

    occurrenceDiv.innerHTML = `
        <h3>${typePT}</h3>
        <p><strong>Descrição:</strong> ${description}</p>
        <p><strong>Nível de Severidade:</strong> ${severityPT}</p>
    `;

    return occurrenceDiv;
}

function updateOccurrencesList() {
    const container = document.getElementById('occurrences-container');
    container.innerHTML = '';

    const occurrences = JSON.parse(localStorage.getItem('occurrences') || '[]');

    if (occurrences.length === 0) {
        container.innerHTML = '<p class="no-occurrences">Nenhuma ocorrência registrada no momento.</p>';
        return;
    }

    occurrences.sort((a, b) => {
        const severityOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };
        return severityOrder[a.severity] - severityOrder[b.severity];
    });

    occurrences.forEach(occurrence => {
        const occurrenceElement = createOccurrenceElement(
            occurrence.type,
            occurrence.description,
            occurrence.severity
        );
        container.appendChild(occurrenceElement);
    });
}

document.addEventListener('DOMContentLoaded', updateOccurrencesList);

setInterval(updateOccurrencesList, 30000); 