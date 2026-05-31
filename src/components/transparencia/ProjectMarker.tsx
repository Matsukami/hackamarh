import React from 'react';
import { MockProject } from '@/lib/geo/mock-projects';

interface ProjectMarkerProps {
  project: MockProject;
  x: number;
  y: number;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export function ProjectMarker({ project, x, y, isSelected, onClick }: ProjectMarkerProps) {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      className={`cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        isSelected ? 'z-10 scale-125' : 'z-0 scale-100 hover:scale-110'
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
    >
      {/* Outer pulse effect for selected */}
      {isSelected && (
        <circle cx="0" cy="0" r="12" fill="#C8E063" className="animate-ping opacity-50" />
      )}

      {/* White border */}
      <circle cx="0" cy="0" r="8" fill="white" className="drop-shadow-md" />

      {/* Inner colored circle based on status */}
      <circle
        cx="0"
        cy="0"
        r="5"
        fill={
          project.status === 'Concluído'
            ? '#1A6B4A' // mata-alta
            : project.status === 'Em Execução'
              ? '#E8A020' // ouro-tocantins
              : '#6B7280' // gray-500
        }
      />
    </g>
  );
}
