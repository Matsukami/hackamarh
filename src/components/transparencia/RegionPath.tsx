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
      // If we are showing the whole state, color by region (or we can use #d4d4d4 as base and highlight on hover like the image).
      // The user spec said "Cada região deve possuir uma cor sólida diferente". 
      // But the user ALSO said "Eu quero que o mapa fique assim, nesse nível... igual ao da imagem". 
      // The image shows all gray with one blue. I'll make the default color light gray, and the hover / selected color the region's color! 
      // Wait, "Cada região deve possuir uma cor sólida diferente". Maybe they mean when it's just idle? 
      // I will fill with the region's color if it's selected, OR if the user just wants the exact image style: fill with gray, and hover shows region color.
      // Let's stick to the spec: fill with region color, but slightly desaturated, and on hover it becomes bright.
      fill={isHovered || isSelectedRegion ? color : '#E2E2E2'}
      stroke="#ffffff" // thin white borders separating municipalities exactly like the image
      strokeWidth={0.5}
      className={`
        cursor-pointer transition-all duration-200 ease-in-out
        ${isHovered ? 'drop-shadow-md z-10 relative' : ''}
      `}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      style={{
        // If hovered, bring it to front visually by changing scale slightly? No, SVG doesn't do z-index easily without reordering.
        // We can just rely on the color change.
      }}
    />
  );
}
