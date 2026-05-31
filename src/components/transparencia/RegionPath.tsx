import React from 'react';

interface RegionPathProps {
  d: string;
  name: string;
  color: string;
  isHovered: boolean;
  isSelectedRegion: boolean;
  isAnyRegionSelected: boolean;
  onSelect: () => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
}

export function RegionPath({
  d,
  name,
  color,
  isHovered,
  isSelectedRegion,
  isAnyRegionSelected,
  onSelect,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
}: RegionPathProps) {
  // If a region is selected, only show municipalities of that region
  if (isAnyRegionSelected && !isSelectedRegion) return null;

  return (
    <path
      d={d}
      fill={color}
      stroke="#ffffff" // thin white borders separating municipalities
      strokeWidth={0.5}
      className={`cursor-pointer transition-all duration-200 ease-in-out ${isHovered ? 'relative z-10 brightness-110 drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]' : 'opacity-90 brightness-95'} `}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      style={
        {
          // If hovered, bring it to front visually by changing scale slightly? No, SVG doesn't do z-index easily without reordering.
          // We can just rely on the color change.
        }
      }
    />
  );
}
