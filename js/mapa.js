const map = L.map('map').setView([-23.5505, -46.6333], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const incidentIcons = {
    fallen_tree: L.icon({
        iconUrl: 'img/icones/arvore caida.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
    heat_wave: L.icon({
        iconUrl: 'img/icones/calor intenso.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
    fire: L.icon({
        iconUrl: 'img/icones/fogo.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
    high_waves: L.icon({
        iconUrl: 'img/icones/ondas grandes.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
    storm: L.icon({
        iconUrl: 'img/icones/tempestade.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
    tornado: L.icon({
        iconUrl: 'img/icones/tornado.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    })
};

let markers = [];

function addMarker(lat, lng, type, description, severity) {
    const marker = L.marker([lat, lng], { 
        icon: incidentIcons[type],
        draggable: true
    })
    .bindPopup(`
        <div class="popup-content">
            <div class="popup-info">
                <strong>Tipo:</strong>${incidentTypeNamesPT[type]}<br>
                <strong>Descrição:</strong>${description}<br>
                <strong>Severidade:</strong>${severityNamesPT[severity]}
            </div>
            <button class="delete-marker" onclick="confirmDeleteMarker(${markers.length})">excluir</button>
        </div>
    `, {
        maxWidth: 250,
        className: 'custom-popup'
    });

    marker.on('dragend', function(event) {
        const marker = event.target;
        const position = marker.getLatLng();
        console.log('Marcador movido para:', position);
    });

    markers.push(marker);
    marker.addTo(map);

    const occurrences = JSON.parse(localStorage.getItem('occurrences') || '[]');
    occurrences.push({
        type,
        description,
        severity,
        lat,
        lng
    });
    localStorage.setItem('occurrences', JSON.stringify(occurrences));

    return marker;
}

window.confirmDeleteMarker = function(index) {
    if (confirm('Tem certeza que deseja excluir esta notificação cadastrada por você?')) {
        markers[index].remove();
        markers.splice(index, 1);
    }
};

const iconContainer = document.createElement('div');
iconContainer.className = 'draggable-icons';
document.querySelector('.map-controls').appendChild(iconContainer);

const iconFileNames = {
    'fallen_tree': 'arvore caida.png',
    'heat_wave': 'calor intenso.png',
    'fire': 'fogo.png',
    'high_waves': 'ondas grandes.png',
    'storm': 'tempestade.png',
    'tornado': 'tornado.png'
};

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

let selectedIncidentType = null;
let selectedFilterType = null;

Object.keys(incidentIcons).forEach(type => {
    const iconDiv = document.createElement('div');
    iconDiv.className = 'draggable-icon';
    iconDiv.innerHTML = `<img src="img/icones/${iconFileNames[type]}" alt="${type}">`;
    iconDiv.dataset.type = type;
    iconContainer.appendChild(iconDiv);

    iconDiv.addEventListener('click', function(e) {
        document.querySelectorAll('.draggable-icon.selected').forEach(el => {
            el.classList.remove('selected');
        });

        e.currentTarget.classList.add('selected');
        selectedIncidentType = e.currentTarget.dataset.type;
        console.log('Ícone selecionado:', selectedIncidentType);
    });
});

const filterIconsContainer = document.querySelector('.filter-icons-container');
const filterIconsDiv = document.createElement('div');
filterIconsDiv.className = 'filter-icons';
filterIconsContainer.appendChild(filterIconsDiv);

Object.keys(incidentIcons).forEach(type => {
    const filterIconDiv = document.createElement('div');
    filterIconDiv.className = 'filter-icon';
    filterIconDiv.innerHTML = `<img src="img/icones/${iconFileNames[type]}" alt="${type}">`;
    filterIconDiv.dataset.type = type;
    filterIconsDiv.appendChild(filterIconDiv);

    filterIconDiv.addEventListener('click', function(e) {
        const clickedType = e.currentTarget.dataset.type;

        if (selectedFilterType === clickedType) {
            selectedFilterType = null;
            e.currentTarget.classList.remove('selected-filter');
             console.log('Filtro desativado.');
        } else {
            document.querySelectorAll('.filter-icon.selected-filter').forEach(el => {
                el.classList.remove('selected-filter');
            });

            selectedFilterType = clickedType;
            e.currentTarget.classList.add('selected-filter');
             console.log('Filtro ativado para tipo:', selectedFilterType);
        }

        updateMarkerVisibility();
    });
});

function updateMarkerVisibility() {
    markers.forEach(marker => {
        const iconFileName = marker.options.icon.options.iconUrl.split('/').pop().replace('.png', '');
        
        const fileNameToTypeMap = {
            'arvore caida': 'fallen_tree',
            'calor intenso': 'heat_wave',
            'fogo': 'fire',
            'ondas grandes': 'high_waves',
            'tempestade': 'storm',
            'tornado': 'tornado'
        };
        
        const markerType = fileNameToTypeMap[iconFileName] || 'unknown';

        if (selectedFilterType === null || markerType === selectedFilterType) {
            marker.addTo(map);
        } else {
            marker.remove();
        }
    });
}

map.on('click', function(e) {
    if (selectedIncidentType) {
        const point = e.latlng;

        const reportModal = document.getElementById('report-modal');
        reportModal.style.display = 'flex';

        reportModal.dataset.lat = point.lat;
        reportModal.dataset.lng = point.lng;
        reportModal.dataset.type = selectedIncidentType;

        const incidentTypeSelect = document.getElementById('incident-type');
        incidentTypeSelect.value = selectedIncidentType;

        document.querySelectorAll('.draggable-icon.selected').forEach(el => {
            el.classList.remove('selected');
        });
        selectedIncidentType = null;
         console.log('Ícone colocado e deselecionado.');
    } else {
         console.log('Nenhum ícone selecionado para colocar no mapa.');
    }
});

const reportModal = document.getElementById('report-modal');
const reportCloseButton = reportModal.querySelector('.close-button');
const reportForm = document.getElementById('report-form');

const confirmDeleteModal = document.getElementById('confirm-delete-modal');
const confirmDeleteCloseButton = confirmDeleteModal.querySelector('.close-button');
const confirmDeleteYesButton = document.getElementById('confirm-delete-yes');
const confirmDeleteNoButton = document.getElementById('confirm-delete-no');
let markerToDeleteIndex = -1;

reportCloseButton.addEventListener('click', function() {
    reportModal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === reportModal) {
        reportModal.style.display = 'none';
    }
});

reportForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const type = reportModal.dataset.type || document.getElementById('incident-type').value;
    const description = document.getElementById('incident-description').value;
    const severity = document.getElementById('incident-severity').value;

    const lat = reportModal.dataset.lat || map.getCenter().lat;
    const lng = reportModal.dataset.lng || map.getCenter().lng;

    addMarker(lat, lng, type, description, severity);

    delete reportModal.dataset.lat;
    delete reportModal.dataset.lng;
    delete reportModal.dataset.type;

    reportModal.style.display = 'none';
    reportForm.reset();
});

window.confirmDeleteMarker = function(index) {
    markerToDeleteIndex = index;
    confirmDeleteModal.classList.add('is-visible');
};

confirmDeleteYesButton.addEventListener('click', function() {
    if (markerToDeleteIndex !== -1) {
        markers[markerToDeleteIndex].remove();
        markers.splice(markerToDeleteIndex, 1);
        
        const occurrences = JSON.parse(localStorage.getItem('occurrences') || '[]');
        occurrences.splice(markerToDeleteIndex, 1);
        localStorage.setItem('occurrences', JSON.stringify(occurrences));
        
        markers.forEach((marker, i) => {
            marker.getPopup().setContent(`
                <div class="popup-content">
                    <div class="popup-info">
                        <strong>Tipo:</strong>${incidentTypeNamesPT[marker.options.icon.options.iconUrl.split('/').pop().replace('.png', '').replace('arvore caida', 'fallen_tree').replace('calor intenso', 'heat_wave').replace('ondas grandes', 'high_waves')] || 'Desconhecido'}<br>
                        <strong>Descrição:</strong>${marker.getPopup().getContent().split('Descrição:</strong>')[1].split('<br>')[0]}<br>
                        <strong>Severidade:</strong>${severityNamesPT[marker.getPopup().getContent().split('Severidade:</strong>')[1].split('</div>')[0]] || 'Desconhecido'}
                    </div>
                    <button class="delete-marker" onclick="confirmDeleteMarker(${i})">excluir</button>
                </div>
            `);
        });
        
        markerToDeleteIndex = -1;
    }
    confirmDeleteModal.classList.remove('is-visible');
});

confirmDeleteNoButton.addEventListener('click', function() {
    markerToDeleteIndex = -1;
    confirmDeleteModal.classList.remove('is-visible');
});

confirmDeleteCloseButton.addEventListener('click', function() {
    markerToDeleteIndex = -1;
    confirmDeleteModal.classList.remove('is-visible');
});

window.addEventListener('click', function(event) {
    if (event.target === confirmDeleteModal) {
        markerToDeleteIndex = -1;
        confirmDeleteModal.classList.remove('is-visible');
    }
});

const locationButton = document.getElementById('my-location');
locationButton.addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            map.setView([lat, lng], 15);
            
            L.marker([lat, lng], {
                icon: L.icon({
                    iconUrl: 'img/icones/localizacao.png',
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32]
                })
            })
            .bindPopup('Sua localização atual')
            .addTo(map);
        });
    } else {
        alert('Geolocalização não é suportada pelo seu navegador.');
    }
});

const clearButton = document.getElementById('clear-markers');
clearButton.addEventListener('click', function() {
    markers.forEach(marker => {
        marker.remove();
    });
    markers = [];
    localStorage.removeItem('occurrences');
});

document.addEventListener('DOMContentLoaded', () => {
    const savedMarkers = JSON.parse(localStorage.getItem('occurrences') || '[]');
    
    savedMarkers.forEach(markerData => {
        const marker = L.marker([markerData.lat, markerData.lng], { 
            icon: incidentIcons[markerData.type],
            draggable: true
        })
        .bindPopup(`
            <div class="popup-content">
                <div class="popup-info">
                    <strong>Tipo:</strong>${incidentTypeNamesPT[markerData.type]}<br>
                    <strong>Descrição:</strong>${markerData.description}<br>
                    <strong>Severidade:</strong>${severityNamesPT[markerData.severity]}
                </div>
                <button class="delete-marker" onclick="confirmDeleteMarker(${markers.length})">excluir</button>
            </div>
        `, {
            maxWidth: 250,
            className: 'custom-popup'
        });

        marker.on('dragend', function(event) {
            const marker = event.target;
            const position = marker.getLatLng();
            console.log('Marcador movido para:', position);
        });

        markers.push(marker);
        marker.addTo(map);
    });
}); 