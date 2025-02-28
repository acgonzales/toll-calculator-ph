import { Coordinates } from '@/types/common.types';
import { LngLatBoundsLike } from 'react-map-gl/mapbox';

export const getCenter = (origin: Coordinates, destination: Coordinates): Coordinates => {
  const lat = (origin.latitude + destination.latitude) / 2;
  const lon = (origin.longitude + destination.longitude) / 2;
  return {
    latitude: lat,
    longitude: lon,
  };
};

export const getZoom = (origin: Coordinates, destination: Coordinates): number => {
  const R = 6371; // Earth's radius in km
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  // Haversine formula to calculate the great-circle distance
  const dLat = toRad(destination.latitude - origin.latitude);
  const dLon = toRad(destination.longitude - origin.longitude);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(origin.latitude)) *
      Math.cos(toRad(destination.latitude)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km

  // Convert distance to zoom level (approximate)
  const zoom = Math.max(1, Math.min(20, 8 - Math.log2(distance)));

  return Math.round(zoom);
};

export const getMapBounds = (origin: Coordinates, destination: Coordinates): LngLatBoundsLike => {
  return [
    [
      Math.min(origin.longitude, destination.longitude),
      Math.min(origin.latitude, destination.latitude),
    ], // Southwest corner
    [
      Math.max(origin.longitude, destination.longitude),
      Math.max(origin.latitude, destination.latitude),
    ], // Northeast corner
  ];
};
