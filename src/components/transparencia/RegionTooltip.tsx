import React from 'react';

interface RegionTooltipProps {
  x: number;
  y: number;
  name: string;
  projectsCount: number;
}

export function RegionTooltip({ x, y, name, projectsCount }: RegionTooltipProps) {
  return (
    <div
      className="pointer-events-none fixed z-50 flex flex-col gap-1 rounded-lg border border-gray-200 bg-white/95 p-3 text-sm shadow-xl backdrop-blur-sm transition-opacity duration-200"
      style={{
        left: x + 16,
        top: y + 16,
      }}
    >
      <span className="font-sora font-bold text-cerrado-profundo">{name}</span>
      <span className="font-dm-sans text-xs text-gray-600">
        <span className="font-bold text-mata-alta">{projectsCount}</span> projetos ativos
      </span>
    </div>
  );
}
