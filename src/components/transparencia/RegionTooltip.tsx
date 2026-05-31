import React from 'react';

interface RegionTooltipProps {
  x: number;
  y: number;
  municipioNome: string;
  regiaoNome: string;
  projectsCount: number;
}

export function RegionTooltip({
  x,
  y,
  municipioNome,
  regiaoNome,
  projectsCount,
}: RegionTooltipProps) {
  return (
    <div
      className="pointer-events-none fixed z-50 flex flex-col gap-1 rounded border border-gray-100 bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-none transition-opacity duration-200"
      style={{
        left: x + 16,
        top: y + 16,
        minWidth: '200px',
      }}
    >
      <span className="font-sora text-sm uppercase tracking-wide text-gray-700">
        {municipioNome}
      </span>
      <span className="mt-1 font-dm-sans text-[13px] text-gray-500">Região: {regiaoNome}</span>
      <span className="mt-1 font-dm-sans text-[13px] text-gray-700">Projetos: {projectsCount}</span>
    </div>
  );
}
