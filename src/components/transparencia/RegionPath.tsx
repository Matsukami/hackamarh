import React from 'react';

interface RegionPathProps {
  d: string;
  name: string;
  color: string;
  isSelected: boolean;
  isVisible: boolean;
  onSelect: () => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
}

export function RegionPath({
  d,
  name,
  color,
  isSelected,
  isVisible,
  onSelect,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
}: RegionPathProps) {
  if (!isVisible) return null;

  return (
    <path
      d={d}
      fill={color}
      stroke="#F5F0E8" // areia-jalapao for separation
      strokeWidth={isSelected ? 1.5 : 0.5}
      className={`
        cursor-pointer transition-all duration-300 ease-in-out
        ${isSelected ? 'drop-shadow-xl' : 'hover:drop-shadow-lg hover:opacity-90'}
        ${!isSelected && 'opacity-100'}
      `}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      style={{
        filter: isSelected ? 'brightness(1.05)' : 'none',
      }}
    />
  );
}
