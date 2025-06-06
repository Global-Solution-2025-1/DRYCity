// Paleta de cores moderna para enchentes
    const colorPalette = {
      low: '#4dac26',    // Verde - risco baixo
      medium: '#f1b6da', // Rosa claro - risco moderado
      high: '#d01c8b',   // Rosa escuro - risco alto
      extreme: '#b8e186', // Verde claro - risco extremo
      flood: '#1b9e77'   // Verde água - área alagada
    };

    // Inicializa o mapa
    const map = L.map('map').setView([-23.5505, -46.6333], 11);

    // Mapa base - Light Mode
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Grupo de camadas para áreas de enchente
    const floodLayer = L.layerGroup().addTo(map);

    // Dados de exemplo (substituir por API real)
    const floodData = [
      { lat: -23.540, lng: -46.640, radius: 800, level: 'high', name: "Alagamento Marginal Tietê" },
      { lat: -23.560, lng: -46.620, radius: 500, level: 'medium', name: "Inundação Vila Leopoldina" },
      { lat: -23.530, lng: -46.650, radius: 300, level: 'low', name: "Alagamento Ponte do Limão" },
      { lat: -23.550, lng: -46.600, radius: 1200, level: 'extreme', name: "Enchente Rio Pinheiros" },
      { lat: -23.520, lng: -46.630, radius: 600, level: 'flood', name: "Área Alagada Centro" }
    ];

    // Adiciona círculos ao mapa
    floodData.forEach(area => {
      const color = colorPalette[area.level];
      const fillOpacity = area.level === 'extreme' ? 0.7 : 0.5;

      L.circle([area.lat, area.lng], {
        radius: area.radius,
        color: color,
        fillColor: color,
        fillOpacity: fillOpacity,
        weight: 1
      })
      .addTo(floodLayer)
      .bindPopup(`
        <b>${area.name}</b><br>
        <span style="color:${color}">●</span> Nível: ${getLevelName(area.level)}<br>
        Área aproximada: ${(Math.PI * Math.pow(area.radius/1000, 2)).toFixed(2)} km²
      `);
    });

    // Função para traduzir níveis
    function getLevelName(level) {
      const levels = {
        'low': 'Baixo',
        'medium': 'Moderado',
        'high': 'Alto',
        'extreme': 'Extremo',
        'flood': 'Alagamento Ativo'
      };
      return levels[level] || level;
    }

    // Legenda personalizada
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function(map) {
      const div = L.DomUtil.create('div', 'legend');
      div.innerHTML = `
        <h4>Níveis de Risco</h4>
        <div class="legend-item">
          <span class="legend-color" style="background:${colorPalette.extreme}"></span>
          <span>Extremo</span>
        </div>
        <div class="legend-item">
          <span class="legend-color" style="background:${colorPalette.high}"></span>
          <span>Alto</span>
        </div>
        <div class="legend-item">
          <span class="legend-color" style="background:${colorPalette.medium}"></span>
          <span>Moderado</span>
        </div>
        <div class="legend-item">
          <span class="legend-color" style="background:${colorPalette.low}"></span>
          <span>Baixo</span>
        </div>
        <div class="legend-item">
          <span class="legend-color" style="background:${colorPalette.flood}"></span>
          <span>Alagamento Ativo</span>
        </div>
      `;
      return div;
    };

    legend.addTo(map);

    // Funções para controle das camadas
    window.toggleLayer = function(level) {
      floodLayer.eachLayer(layer => {
        if (layer.options.fillColor === colorPalette[level]) {
          if (map.hasLayer(layer)) {
            map.removeLayer(layer);
          } else {
            map.addLayer(layer);
          }
        }
      });
    };

    window.showAll = function() {
      floodLayer.eachLayer(layer => {
        map.addLayer(layer);
      });
    };

    // Adiciona busca por endereço
    L.Control.geocoder({
      position: 'topleft',
      placeholder: 'Buscar endereço...',
      errorMessage: 'Endereço não encontrado.',
      collapsed: false
    }).addTo(map);