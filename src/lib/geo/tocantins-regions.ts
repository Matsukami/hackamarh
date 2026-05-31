export interface Region {
  id: string;
  nome: string;
  cor: string;
  centroide: [number, number]; // [longitude, latitude]
}

export const TOCANTINS_REGIONS: Record<string, Region> = {
  'bico-do-papagaio': {
    id: 'bico-do-papagaio',
    nome: 'Bico do Papagaio',
    cor: '#0B3D2E', // Cerrado Profundo
    centroide: [-47.9, -6.0],
  },
  'araguaina': {
    id: 'araguaina',
    nome: 'Araguaína',
    cor: '#1A6B4A', // Mata Alta
    centroide: [-48.6, -7.5],
  },
  'miracema': {
    id: 'miracema',
    nome: 'Miracema do Tocantins',
    cor: '#4A7C59', // Verde oliva adaptado
    centroide: [-48.9, -9.5],
  },
  'palmas': {
    id: 'palmas',
    nome: 'Palmas',
    cor: '#7BA05B', // Verde limão adaptado
    centroide: [-48.2, -10.2],
  },
  'porto-nacional': {
    id: 'porto-nacional',
    nome: 'Porto Nacional',
    cor: '#E8A020', // Ouro do Tocantins
    centroide: [-48.5, -11.5],
  },
  'jalapao': {
    id: 'jalapao',
    nome: 'Jalapão',
    cor: '#C8E063', // Buriti Vivo
    centroide: [-46.5, -10.5],
  },
  'gurupi': {
    id: 'gurupi',
    nome: 'Gurupi',
    cor: '#B8763E', // Terracota adaptado
    centroide: [-49.2, -12.0],
  },
  'dianopolis': {
    id: 'dianopolis',
    nome: 'Dianópolis',
    cor: '#2D5A3D', // Verde escuro adaptado
    centroide: [-46.8, -12.5],
  },
};

// Simplified GeoJSON paths for the 8 regions of Tocantins
// In a real application, you would load a detailed GeoJSON file.
// For this MVP, we provide simplified polygon features.
export const tocantinsGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'bico-do-papagaio',
      properties: { name: 'Bico do Papagaio' },
      geometry: {
        type: 'Polygon',
        coordinates: [[[-48.2, -5.2], [-47.5, -5.5], [-47.3, -6.5], [-48.5, -6.8], [-48.8, -5.8], [-48.2, -5.2]]]
      }
    },
    {
      type: 'Feature',
      id: 'araguaina',
      properties: { name: 'Araguaína' },
      geometry: {
        type: 'Polygon',
        coordinates: [[[-48.5, -6.8], [-47.3, -6.5], [-47.5, -8.5], [-49.2, -8.2], [-48.5, -6.8]]]
      }
    },
    {
      type: 'Feature',
      id: 'miracema',
      properties: { name: 'Miracema do Tocantins' },
      geometry: {
        type: 'Polygon',
        coordinates: [[[-49.2, -8.2], [-48.0, -8.5], [-48.2, -10.0], [-49.8, -10.5], [-50.5, -9.0], [-49.2, -8.2]]]
      }
    },
    {
      type: 'Feature',
      id: 'palmas',
      properties: { name: 'Palmas' },
      geometry: {
        type: 'Polygon',
        coordinates: [[[-48.0, -8.5], [-47.2, -8.8], [-47.5, -10.8], [-48.5, -10.5], [-48.2, -10.0], [-48.0, -8.5]]]
      }
    },
    {
      type: 'Feature',
      id: 'jalapao',
      properties: { name: 'Jalapão' },
      geometry: {
        type: 'Polygon',
        coordinates: [[[-47.2, -8.8], [-45.8, -9.5], [-46.2, -11.5], [-47.5, -10.8], [-47.2, -8.8]]]
      }
    },
    {
      type: 'Feature',
      id: 'porto-nacional',
      properties: { name: 'Porto Nacional' },
      geometry: {
        type: 'Polygon',
        coordinates: [[[-48.5, -10.5], [-47.5, -10.8], [-47.8, -12.5], [-49.0, -12.2], [-48.5, -10.5]]]
      }
    },
    {
      type: 'Feature',
      id: 'gurupi',
      properties: { name: 'Gurupi' },
      geometry: {
        type: 'Polygon',
        coordinates: [[[-49.8, -10.5], [-48.5, -10.5], [-49.0, -12.2], [-49.5, -13.5], [-50.8, -12.0], [-49.8, -10.5]]]
      }
    },
    {
      type: 'Feature',
      id: 'dianopolis',
      properties: { name: 'Dianópolis' },
      geometry: {
        type: 'Polygon',
        coordinates: [[[-47.5, -10.8], [-46.2, -11.5], [-45.8, -13.5], [-47.2, -13.2], [-47.8, -12.5], [-47.5, -10.8]]]
      }
    }
  ]
};
