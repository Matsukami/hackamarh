'use client';

import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix leaflet icon issues with next.js
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function InteractiveMap() {
  const polygon: [number, number][] = [
    [-10.1833, -48.3333],
    [-10.2833, -48.2333],
    [-10.2833, -48.4333],
  ];

  return (
    <div className="relative z-0 h-full w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <MapContainer
        center={[-10.1833, -48.3333]}
        zoom={8}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-10.1833, -48.3333]} icon={customIcon}>
          <Popup>
            <div className="font-dm-sans">
              <strong className="mb-1 block font-sora text-cerrado-profundo">
                Projeto ECO-2024-089
              </strong>
              <p className="mb-1 text-sm text-gray-600">Restauração de Nascentes</p>
              <span className="rounded bg-mata-alta/10 px-2 py-0.5 text-xs font-bold text-mata-alta">
                Em Execução
              </span>
            </div>
          </Popup>
        </Marker>
        <Polygon
          pathOptions={{ color: '#1a6b4a', fillColor: '#a5f3c9', fillOpacity: 0.5 }}
          positions={polygon}
        />
      </MapContainer>
    </div>
  );
}
