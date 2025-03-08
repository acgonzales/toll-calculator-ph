import * as turf from '@turf/turf';

export const combineLineStrings = (geometries: GeoJSON.LineString[]): GeoJSON.FeatureCollection => {
  if (geometries.length === 0) {
    throw new Error('No geometries provided');
  }

  return turf.featureCollection(
    geometries.map((geometry) => turf.lineString(geometry.coordinates)),
  );
};
