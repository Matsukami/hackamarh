'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { IconArrowLeft, IconChartPie, IconChartPieOff } from '@tabler/icons-react';
import { TOCANTINS_REGIONS, Region } from '@/lib/geo/tocantins-regions';
import { MOCK_PROJECTS, MockProject } from '@/lib/geo/mock-projects';
import { useGeoProjection } from '@/lib/geo/useGeoProjection';
import { RegionPath } from './RegionPath';
import { RegionTooltip } from './RegionTooltip';
import { ProjectMarker } from './ProjectMarker';
import { ProjectCard } from './ProjectCard';
import { MapLegend } from './MapLegend';

// Using the detailed IBGE malha containing 139 municipalities grouped by their 8 macro-regions
import tocantinsMalha from '@/lib/geo/tocantins-malha.json';

// Porcentagem fixa do orçamento alocado (mock para demonstração JREDD+)
const REGION_BUDGET_PERCENTAGES: Record<string, string> = {
  '17001': '12%', // Bico
  '17002': '18%', // Araguaína
  '17003': '15%', // Miracema
  '17004': '22%', // Rio Formoso (Palmas)
  '17005': '10%', // Gurupi
  '17006': '9%', // Porto Nacional
  '17007': '8%', // Jalapão
  '17008': '6%', // Dianópolis
};

interface TocantinsMapProps {
  /** When true, legend is shown in full size and positioned to not cover the map */
  fullscreen?: boolean;
}

export function TocantinsMap({ fullscreen = false }: TocantinsMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredFeature, setHoveredFeature] = useState<{
    id: string;
    name: string;
    regionId: string;
    regionName: string;
    x: number;
    y: number;
  } | null>(null);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<MockProject | null>(null);
  const [showPercentages, setShowPercentages] = useState(false);

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

  const { projection, pathGenerator, getFeatureBounds, getFeatureCentroid } = useGeoProjection({
    width: dimensions.width,
    height: dimensions.height,
    features: features,
  });

  // Calculate region centroids for text overlay
  const regionCentroids = useMemo(() => {
    const centroids: Record<string, [number, number]> = {};
    const regionIds = Object.keys(TOCANTINS_REGIONS);

    regionIds.forEach((regionId) => {
      const regionFeatures = features.filter((f) => f.properties.regionId === regionId);
      if (regionFeatures.length > 0) {
        centroids[regionId] = getFeatureCentroid({
          type: 'FeatureCollection',
          features: regionFeatures,
        });
      }
    });
    return centroids;
  }, [features, getFeatureCentroid]);

  // Calculate transform for zoom
  const [transform, setTransform] = useState('translate(0,0) scale(1)');

  useEffect(() => {
    if (selectedRegionId) {
      // Find all municipalities that belong to the selected region
      const regionFeatures = features.filter((f) => f.properties.regionId === selectedRegionId);

      if (regionFeatures.length > 0) {
        // Create a temporary FeatureCollection to get the bounding box of the entire region
        const bounds = getFeatureBounds({
          type: 'FeatureCollection',
          features: regionFeatures,
        });

        const dx = bounds[1][0] - bounds[0][0];
        const dy = bounds[1][1] - bounds[0][1];
        const x = (bounds[0][0] + bounds[1][0]) / 2;
        const y = (bounds[0][1] + bounds[1][1]) / 2;

        // Calculate scale to fit the region with padding
        const scale = Math.max(
          1,
          Math.min(8, 0.75 / Math.max(dx / dimensions.width, dy / dimensions.height)),
        );
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
    ? MOCK_PROJECTS.filter((p) => p.regiao_id === selectedRegionId)
    : [];

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-[#F9F9F9]"
    >
      {/* Header controls when zoomed in */}
      <div
        className={`absolute left-6 top-6 z-10 transition-opacity duration-300 ${
          selectedRegionId ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          onClick={handleBackToState}
          className="mb-3 flex items-center gap-2 rounded border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-cerrado-profundo shadow-sm transition-colors hover:bg-gray-50"
        >
          <IconArrowLeft size={16} />
          Voltar
        </button>

        {activeRegionData && (
          <div className="rounded border border-gray-200 bg-white/95 p-4 shadow-sm backdrop-blur-md">
            <h2
              className="font-sora text-xl font-bold uppercase"
              style={{ color: activeRegionData.cor }}
            >
              {activeRegionData.nome}
            </h2>
            <p className="mt-1 font-dm-sans text-sm text-gray-600">
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
            transition: 'transform 750ms cubic-bezier(0.34, 1.56, 0.64, 1)',
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
                      y: e.clientY,
                    });
                  }
                }}
                onMouseLeave={() => setHoveredFeature(null)}
                onMouseMove={(e) => {
                  if (!selectedRegionId && hoveredFeature?.id === id) {
                    setHoveredFeature((prev) =>
                      prev ? { ...prev, x: e.clientX, y: e.clientY } : null,
                    );
                  }
                }}
              />
            );
          })}

          {/* Region Overlays (Percentages) - Only visible when toggled ON and NO region is selected */}
          {showPercentages &&
            !selectedRegionId &&
            Object.entries(regionCentroids).map(([regionId, [x, y]]) => {
              // Apply small manual offsets if some centroids are visually off
              let dx = 0;
              let dy = 0;
              if (regionId === '17001') dy = -10; // Bico up
              if (regionId === '17007') dx = 10; // Jalapão right

              return (
                <g
                  key={`overlay-${regionId}`}
                  className="pointer-events-none"
                  transform={`translate(${x + dx}, ${y + dy})`}
                >
                  <rect
                    x="-20"
                    y="-12"
                    width="40"
                    height="24"
                    rx="4"
                    fill="rgba(255,255,255,0.9)"
                    className="drop-shadow-sm"
                  />
                  <text
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    className="font-sora text-xs font-bold text-cerrado-profundo"
                    y="1"
                  >
                    {REGION_BUDGET_PERCENTAGES[regionId]}
                  </text>
                </g>
              );
            })}

          {/* Project Markers (only visible when zoomed in) */}
          {selectedRegionId &&
            regionProjects.map((project) => {
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
          projectsCount={
            MOCK_PROJECTS.filter((p) => p.regiao_id === hoveredFeature.regionId).length
          }
        />
      )}

      {/* Project Detail Card */}
      {selectedProject && selectedRegionId && (
        <ProjectCard project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {/* Toggle for percentage overlay */}
      {!selectedRegionId && (
        <button
          onClick={() => setShowPercentages((prev) => !prev)}
          title={showPercentages ? 'Ocultar % do orçamento' : 'Exibir % do orçamento'}
          className={`absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold shadow-sm backdrop-blur-md transition-all duration-200 ${
            showPercentages
              ? 'border-mata-alta/30 bg-mata-alta/10 text-mata-alta hover:bg-mata-alta/20'
              : 'border-gray-200 bg-white/90 text-gray-500 hover:bg-gray-50 hover:text-cerrado-profundo'
          }`}
        >
          {showPercentages ? (
            <>
              <IconChartPieOff size={14} />
              <span className="hidden sm:inline">Ocultar %</span>
            </>
          ) : (
            <>
              <IconChartPie size={14} />
              <span className="hidden sm:inline">Orçamento %</span>
            </>
          )}
        </button>
      )}

      {/* Map Legend */}
      {!selectedRegionId && <MapLegend compact={!fullscreen} />}
    </div>
  );
}
