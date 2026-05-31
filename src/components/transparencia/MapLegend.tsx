import React from 'react';
import { TOCANTINS_REGIONS } from '@/lib/geo/tocantins-regions';

export function MapLegend() {
  const regions = Object.values(TOCANTINS_REGIONS);

  return (
    <div className="pointer-events-auto absolute bottom-6 right-6 z-10 rounded-xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur-md">
      <h3 className="mb-3 font-sora text-sm font-bold text-cerrado-profundo uppercase tracking-wider">
        Macro-Regiões JREDD+
      </h3>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {regions.map((region) => (
          <div key={region.id} className="flex items-center gap-2">
            <div 
              className="h-3 w-3 rounded-full border border-black/10 shadow-inner" 
              style={{ backgroundColor: region.cor }} 
            />
            <span className="font-dm-sans text-xs font-medium text-gray-700">
              {region.nome}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
