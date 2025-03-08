import { Coordinates } from '@/types/common.types';
import { LngLatBoundsLike } from 'react-map-gl/mapbox';

export const getCenter = (coordinates: Coordinates[]): Coordinates => {
  if (coordinates.length === 0) {
    throw new Error('Coordinates array cannot be empty');
  }

  const lat = coordinates.reduce((sum, coord) => sum + coord.latitude, 0) / coordinates.length;
  const lon = coordinates.reduce((sum, coord) => sum + coord.longitude, 0) / coordinates.length;

  return {
    latitude: lat,
    longitude: lon,
  };
};

export const getMapBounds = (coordinates: Coordinates[]): LngLatBoundsLike => {
  if (coordinates.length === 0) {
    throw new Error('Coordinates array cannot be empty');
  }

  const longitudes = coordinates.map((coord) => coord.longitude);
  const latitudes = coordinates.map((coord) => coord.latitude);

  return [
    [Math.min(...longitudes), Math.min(...latitudes)], // Southwest corner
    [Math.max(...longitudes), Math.max(...latitudes)], // Northeast corner
  ];
};
