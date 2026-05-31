import React from 'react';
import { TOCANTINS_REGIONS } from '@/lib/geo/tocantins-regions';

interface MapLegendProps {
  /** When true, renders a compact single-column legend for embedded views */
  compact?: boolean;
}

export function MapLegend({ compact = false }: MapLegendProps) {
  const regions = Object.values(TOCANTINS_REGIONS);

  if (compact) {
    return (
      <div className="pointer-events-auto absolute bottom-3 right-3 z-10 rounded-lg border border-gray-200 bg-white/90 px-3 py-2 shadow-md backdrop-blur-md">
        <h3 className="mb-1.5 font-sora text-[10px] font-bold uppercase tracking-wider text-cerrado-profundo">
          Regiões
        </h3>
        <div className="flex flex-col gap-1">
          {regions.map((region) => (
            <div key={region.id} className="flex items-center gap-1.5">
              <div
                className="h-2 w-2 shrink-0 rounded-full border border-black/10"
                style={{ backgroundColor: region.cor }}
              />
              <span className="font-dm-sans text-[10px] leading-tight text-gray-600">
                {region.nome}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-auto absolute bottom-6 left-6 z-10 rounded-xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur-md">
      <h3 className="mb-3 font-sora text-sm font-bold uppercase tracking-wider text-cerrado-profundo">
        Macro-Regiões JREDD+
      </h3>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {regions.map((region) => (
          <div key={region.id} className="flex items-center gap-2">
            <div
              className="h-3 w-3 shrink-0 rounded-full border border-black/10 shadow-inner"
              style={{ backgroundColor: region.cor }}
            />
            <span className="font-dm-sans text-xs font-medium text-gray-700">{region.nome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
