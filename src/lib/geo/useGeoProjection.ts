import { useMemo } from 'react';
import { geoMercator, geoPath } from 'd3-geo';

interface UseGeoProjectionProps {
  width: number;
  height: number;
  features: any[];
}

export function useGeoProjection({ width, height, features }: UseGeoProjectionProps) {
  return useMemo(() => {
    // 1. Create a Mercator projection
    const projection = geoMercator();
    
    // 2. Create a path generator
    const pathGenerator = geoPath().projection(projection);
    
    // 3. Fit the projection to our features (the state of Tocantins)
    const bounds = {
      type: 'FeatureCollection',
      features,
    } as any;
    
    projection.fitSize([width, height], bounds);

    return {
      projection,
      pathGenerator,
      // Helper to get bounding box of a specific feature
      getFeatureBounds: (feature: any) => pathGenerator.bounds(feature),
      // Helper to get centroid of a specific feature
      getFeatureCentroid: (feature: any) => pathGenerator.centroid(feature),
    };
  }, [width, height, features]);
}
