'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { IconArrowLeft } from '@tabler/icons-react';
import { TOCANTINS_REGIONS, Region } from '@/lib/geo/tocantins-regions';
import { MOCK_PROJECTS, MockProject } from '@/lib/geo/mock-projects';
import { useGeoProjection } from '@/lib/geo/useGeoProjection';
import { RegionPath } from './RegionPath';
import { RegionTooltip } from './RegionTooltip';
import { ProjectMarker } from './ProjectMarker';
import { ProjectCard } from './ProjectCard';

// Using the detailed IBGE malha containing 139 municipalities grouped by their 8 macro-regions
import tocantinsMalha from '@/lib/geo/tocantins-malha.json';

export function TocantinsMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredFeature, setHoveredFeature] = useState<{ id: string; name: string; regionId: string; regionName: string; x: number; y: number } | null>(null);
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

  const features = tocantinsMalha.features as any[];

  const { projection, pathGenerator, getFeatureBounds } = useGeoProjection({
    width: dimensions.width,
    height: dimensions.height,
    features: features,
  });

  // Calculate transform for zoom
  const [transform, setTransform] = useState('translate(0,0) scale(1)');

  useEffect(() => {
    if (selectedRegionId) {
      // Find all municipalities that belong to the selected region
      const regionFeatures = features.filter(f => f.properties.regionId === selectedRegionId);
      
      if (regionFeatures.length > 0) {
        // Create a temporary FeatureCollection to get the bounding box of the entire region
        const bounds = getFeatureBounds({
          type: 'FeatureCollection',
          features: regionFeatures
        });
        
        const dx = bounds[1][0] - bounds[0][0];
        const dy = bounds[1][1] - bounds[0][1];
        const x = (bounds[0][0] + bounds[1][0]) / 2;
        const y = (bounds[0][1] + bounds[1][1]) / 2;
        
        // Calculate scale to fit the region with padding
        const scale = Math.max(1, Math.min(8, 0.75 / Math.max(dx / dimensions.width, dy / dimensions.height)));
        const translate = [dimensions.width / 2 - scale * x, dimensions.height / 2 - scale * y];
        
        setTransform(`translate(${translate[0]}px, ${translate[1]}px) scale(${scale})`);
      }
    } else {
      setTransform('translate(0,0) scale(1)');
      setSelectedProject(null);
    }
  }, [selectedRegionId, dimensions, getFeatureBounds, features]);

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegionId(regionId);
    setHoveredFeature(null);
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
      className="relative h-full w-full overflow-hidden rounded-xl bg-[#F9F9F9] border border-gray-200"
    >
      {/* Header controls when zoomed in */}
      <div 
        className={`absolute left-6 top-6 z-10 transition-opacity duration-300 ${
          selectedRegionId ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          onClick={handleBackToState}
          className="mb-3 flex items-center gap-2 rounded bg-white px-4 py-2 text-sm font-bold text-cerrado-profundo shadow-sm border border-gray-200 transition-colors hover:bg-gray-50"
        >
          <IconArrowLeft size={16} />
          Voltar
        </button>
        
        {activeRegionData && (
          <div className="rounded bg-white/95 p-4 shadow-sm border border-gray-200 backdrop-blur-md">
            <h2 className="font-sora text-xl font-bold uppercase" style={{ color: activeRegionData.cor }}>
              {activeRegionData.nome}
            </h2>
            <p className="font-dm-sans text-sm text-gray-600 mt-1">
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
          {features.map((feature) => {
            const id = feature.properties.id;
            const regionId = feature.properties.regionId;
            const regionData = TOCANTINS_REGIONS[regionId];
            
            const d = pathGenerator(feature as any) || '';
            const isSelectedRegion = regionId === selectedRegionId;
            const isHovered = hoveredFeature?.id === id;

            return (
              <RegionPath
                key={id}
                d={d}
                name={feature.properties.name}
                color={regionData?.cor || '#004A8F'}
                isHovered={isHovered}
                isSelectedRegion={isSelectedRegion}
                isAnyRegionSelected={!!selectedRegionId}
                onSelect={() => handleRegionSelect(regionId)}
                onMouseEnter={(e) => {
                  if (!selectedRegionId) {
                    setHoveredFeature({
                      id,
                      name: feature.properties.name,
                      regionId,
                      regionName: feature.properties.regionName,
                      x: e.clientX,
                      y: e.clientY
                    });
                  }
                }}
                onMouseLeave={() => setHoveredFeature(null)}
                onMouseMove={(e) => {
                  if (!selectedRegionId && hoveredFeature?.id === id) {
                    setHoveredFeature(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
                  }
                }}
              />
            );
          })}

          {/* Project Markers (only visible when zoomed in) */}
          {selectedRegionId && regionProjects.map((project) => {
            const [x, y] = projection([project.longitude, project.latitude]) || [0, 0];
            const isSelected = selectedProject?.id === project.id;
            
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
      {hoveredFeature && !selectedRegionId && (
        <RegionTooltip
          x={hoveredFeature.x}
          y={hoveredFeature.y}
          municipioNome={hoveredFeature.name}
          regiaoNome={hoveredFeature.regionName}
          projectsCount={MOCK_PROJECTS.filter(p => p.regiao_id === hoveredFeature.regionId).length}
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
