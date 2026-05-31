'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IconArrowLeft } from '@tabler/icons-react';
import { tocantinsGeoJSON, TOCANTINS_REGIONS, Region } from '@/lib/geo/tocantins-regions';
import { MOCK_PROJECTS, MockProject } from '@/lib/geo/mock-projects';
import { useGeoProjection } from '@/lib/geo/useGeoProjection';
import { RegionPath } from './RegionPath';
import { RegionTooltip } from './RegionTooltip';
import { ProjectMarker } from './ProjectMarker';
import { ProjectCard } from './ProjectCard';

export function TocantinsMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredRegion, setHoveredRegion] = useState<{ id: string; x: number; y: number } | null>(null);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<MockProject | null>(null);

  // Resize observer to keep SVG responsive
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const { projection, pathGenerator, getFeatureBounds, getFeatureCentroid } = useGeoProjection({
    width: dimensions.width,
    height: dimensions.height,
    features: tocantinsGeoJSON.features,
  });

  // Calculate transform for zoom
  const [transform, setTransform] = useState('translate(0,0) scale(1)');

  useEffect(() => {
    if (selectedRegionId) {
      const feature = tocantinsGeoJSON.features.find((f) => f.id === selectedRegionId);
      if (feature) {
        const bounds = getFeatureBounds(feature);
        const dx = bounds[1][0] - bounds[0][0];
        const dy = bounds[1][1] - bounds[0][1];
        const x = (bounds[0][0] + bounds[1][0]) / 2;
        const y = (bounds[0][1] + bounds[1][1]) / 2;
        
        // Calculate scale to fit the region with some padding
        const scale = Math.max(1, Math.min(8, 0.75 / Math.max(dx / dimensions.width, dy / dimensions.height)));
        const translate = [dimensions.width / 2 - scale * x, dimensions.height / 2 - scale * y];
        
        setTransform(`translate(${translate[0]}px, ${translate[1]}px) scale(${scale})`);
      }
    } else {
      setTransform('translate(0,0) scale(1)');
      setSelectedProject(null);
    }
  }, [selectedRegionId, dimensions, getFeatureBounds]);

  const handleRegionSelect = (id: string) => {
    setSelectedRegionId(id);
    setHoveredRegion(null);
  };

  const handleBackToState = () => {
    setSelectedRegionId(null);
    setSelectedProject(null);
  };

  const activeRegionData = selectedRegionId ? TOCANTINS_REGIONS[selectedRegionId] : null;
  const regionProjects = selectedRegionId 
    ? MOCK_PROJECTS.filter(p => p.regiao_id === selectedRegionId)
    : [];

  return (
    <div 
      ref={containerRef} 
      className="relative h-full w-full overflow-hidden rounded-xl bg-[#F5F0E8] border border-gray-200"
    >
      {/* Header controls when zoomed in */}
      <div 
        className={`absolute left-6 top-6 z-10 transition-opacity duration-300 ${
          selectedRegionId ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          onClick={handleBackToState}
          className="mb-3 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-cerrado-profundo shadow-md transition-colors hover:bg-gray-50"
        >
          <IconArrowLeft size={16} />
          Voltar para o mapa do Tocantins
        </button>
        
        {activeRegionData && (
          <div className="rounded-xl bg-white/90 p-4 shadow-lg backdrop-blur-md">
            <h2 className="font-sora text-2xl font-bold" style={{ color: activeRegionData.cor }}>
              Região {activeRegionData.nome}
            </h2>
            <p className="font-dm-sans text-sm text-gray-600">
              {regionProjects.length} projetos em execução/concluídos
            </p>
          </div>
        )}
      </div>

      {/* The Map SVG */}
      <svg 
        width="100%" 
        height="100%" 
        className="block"
        onClick={() => {
          if (selectedProject) setSelectedProject(null);
        }}
      >
        <g 
          style={{ 
            transform, 
            transition: 'transform 750ms cubic-bezier(0.34, 1.56, 0.64, 1)' 
          }}
        >
          {tocantinsGeoJSON.features.map((feature) => {
            const id = feature.id as string;
            const regionData = TOCANTINS_REGIONS[id];
            const d = pathGenerator(feature as any) || '';
            const isSelected = id === selectedRegionId;
            const isVisible = !selectedRegionId || isSelected;

            return (
              <RegionPath
                key={id}
                d={d}
                name={regionData?.nome || id}
                color={regionData?.cor || '#CCC'}
                isSelected={isSelected}
                isVisible={isVisible}
                onSelect={() => handleRegionSelect(id)}
                onMouseEnter={(e) => {
                  if (!selectedRegionId) {
                    setHoveredRegion({ id, x: e.clientX, y: e.clientY });
                  }
                }}
                onMouseLeave={() => setHoveredRegion(null)}
                onMouseMove={(e) => {
                  if (!selectedRegionId && hoveredRegion?.id === id) {
                    setHoveredRegion({ id, x: e.clientX, y: e.clientY });
                  }
                }}
              />
            );
          })}

          {/* Project Markers (only visible when zoomed in) */}
          {selectedRegionId && regionProjects.map((project) => {
            const [x, y] = projection([project.longitude, project.latitude]) || [0, 0];
            const isSelected = selectedProject?.id === project.id;
            
            // Fix: SVG transform scales everything including strokes. To keep markers consistent size,
            // we could inverse-scale them, but since we are transforming the <g>, they will grow. 
            // For a simpler approach without inverse scaling, we'll draw them inside the <g> and 
            // they will appear larger, which is acceptable for a zoom effect.
            return (
              <ProjectMarker
                key={project.id}
                project={project}
                x={x}
                y={y}
                isSelected={isSelected}
                onClick={() => setSelectedProject(project)}
              />
            );
          })}
        </g>
      </svg>

      {/* Tooltip for hover state */}
      {hoveredRegion && !selectedRegionId && (
        <RegionTooltip
          x={hoveredRegion.x}
          y={hoveredRegion.y}
          name={TOCANTINS_REGIONS[hoveredRegion.id]?.nome || hoveredRegion.id}
          projectsCount={MOCK_PROJECTS.filter(p => p.regiao_id === hoveredRegion.id).length}
        />
      )}

      {/* Project Detail Card */}
      {selectedProject && selectedRegionId && (
        <ProjectCard 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}
