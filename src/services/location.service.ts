import env from '@/config/env';
import { Coordinates, Suggestion, Location, Directions } from '@/types/common.types';
import {
  SearchBoxCore,
  SearchSession,
  SearchBoxOptions,
  SearchBoxSuggestion,
  SearchBoxSuggestionResponse,
  SearchBoxRetrieveResponse,
} from '@mapbox/search-js-core';
import mbDirections from '@mapbox/mapbox-sdk/services/directions';

const searchBoxCore = new SearchBoxCore({
  accessToken: env.MAPBOX_API_KEY,
});

const directionsApi = mbDirections({
  accessToken: env.MAPBOX_API_KEY,
});

export const getLocationFromCoordinates = async (
  coordinates: Coordinates,
): Promise<Location | null> => {
  const response = await searchBoxCore.reverse(
    {
      lat: coordinates.latitude,
      lon: coordinates.longitude,
    },
    { limit: 1, country: 'ph' },
  );

  const feature = response.features.at(0);
  if (!feature) {
    return null;
  }

  return {
    id: feature.properties.mapbox_id,
    name: feature.properties.name,
    address: feature.properties.full_address,
    coordinates: {
      latitude: feature.geometry.coordinates[1],
      longitude: feature.geometry.coordinates[0],
    },
    feature,
  };
};

export const getDirections = async (
  origin: Location,
  destination: Location,
): Promise<Directions> => {
  const request = directionsApi.getDirections({
    profile: 'driving',
    alternatives: false,
    steps: true,
    bannerInstructions: true,
    geometries: 'geojson',
    waypoints: [
      {
        waypointName: origin.name,
        coordinates: [origin.coordinates.longitude, origin.coordinates.latitude],
      },
      {
        waypointName: destination.name,
        coordinates: [destination.coordinates.longitude, destination.coordinates.latitude],
      },
    ],
  });
  const response = (await request.send()).body;
  const route = response.routes[0];
  const leg = route.legs[0];
  return {
    origin,
    destination,
    geometry: route.geometry,
    steps: leg.steps.map((step) => ({
      name: step.name,
      coordinates: {
        longitude: step.maneuver.location[0],
        latitude: step.maneuver.location[1],
      },
      geometry: step.geometry,
    })),
  };
};

type SearchBoxSearchSession = SearchSession<
  SearchBoxOptions,
  SearchBoxSuggestion,
  SearchBoxSuggestionResponse,
  SearchBoxRetrieveResponse
>;

export const createSession = (): SearchBoxSearchSession => {
  return new SearchSession(searchBoxCore, 1000);
};

export const getSuggestions = async (
  searchSession: SearchBoxSearchSession,
  query: string,
): Promise<Suggestion[]> => {
  const response = await searchSession.suggest(query, {
    limit: 3,
    country: 'ph',
  });
  return response.suggestions.map((suggestion) => ({
    id: suggestion.mapbox_id,
    name: suggestion.name,
    address: suggestion.full_address,
    _mbSuggestion: suggestion,
  }));
};

export const getLocationFromSuggestion = async (
  searchSession: SearchBoxSearchSession,
  suggestion: Suggestion,
): Promise<Location | null> => {
  const response = await searchSession.retrieve(suggestion._mbSuggestion, {
    country: 'ph',
  });

  const feature = response.features.at(0);
  if (!feature) {
    return null;
  }

  return {
    id: feature.properties.mapbox_id,
    name: feature.properties.name,
    address: feature.properties.full_address,
    coordinates: {
      latitude: feature.geometry.coordinates[1],
      longitude: feature.geometry.coordinates[0],
    },
    feature,
  };
};
