import env from '@/config/env';
import {
  Coordinates,
  Location,
  DirectionsResponse,
  TollGateGeoJsonType,
} from '@/types/common.types';
import {
  SearchBoxCore,
  SearchSession,
  SearchBoxOptions,
  SearchBoxSuggestion,
  SearchBoxSuggestionResponse,
  SearchBoxRetrieveResponse,
} from '@mapbox/search-js-core';
import mbDirections from '@mapbox/mapbox-sdk/services/directions';
import { combineLineStrings } from '@/util/geojson.util';
import { getRouteTollPrices } from '@/services/toll.service';

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
  tollGates: TollGateGeoJsonType,
  locations: Location[],
): Promise<DirectionsResponse> => {
  const request = directionsApi.getDirections({
    profile: 'driving',
    alternatives: true,
    steps: true,
    geometries: 'geojson',
    overview: 'full',
    waypoints: locations.map((location) => ({
      waypointName: location.name,
      coordinates: [location.coordinates.longitude, location.coordinates.latitude],
    })),
  });
  const response = (await request.send()).body;
  const responseId = response.uuid;
  return {
    id: responseId,
    locations,
    routes: response.routes.map((route, index) => {
      const routeId = responseId + '-' + index;

      const legs = route.legs.map((leg, lIndex) => {
        const legId = routeId + '-' + lIndex;
        return {
          id: legId,
          summary: leg.summary,
          duration: leg.duration,
          geometry: combineLineStrings(
            leg.steps.map((step) => step.geometry as GeoJSON.LineString),
          ),
          steps: leg.steps.map((step, sIndex) => {
            const stepId = legId + '-' + sIndex;
            return {
              id: stepId,
              summary: step.maneuver.instruction,
              geometry: step.geometry as GeoJSON.LineString,
            };
          }),
        };
      });

      const steps = legs.flatMap((leg) => leg.steps);
      const tollPrices = getRouteTollPrices(tollGates, steps);

      return {
        id: routeId,
        duration: route.duration,
        distance: route.distance,
        geometry: route.geometry as GeoJSON.LineString,
        tollPrices,
        legs,
      };
    }),
  };
};

export type SearchBoxSearchSession = SearchSession<
  SearchBoxOptions,
  SearchBoxSuggestion,
  SearchBoxSuggestionResponse,
  SearchBoxRetrieveResponse
>;

export const createSession = (): SearchBoxSearchSession => {
  return new SearchSession(searchBoxCore);
};

export const getSuggestions = async (
  searchSession: SearchBoxSearchSession,
  query: string,
): Promise<SearchBoxSuggestion[]> => {
  const response = await searchSession.suggest(query, {
    limit: 5,
    country: 'ph',
  });
  return response.suggestions;
};

export const getLocationFromSuggestion = async (
  searchSession: SearchBoxSearchSession,
  suggestion: SearchBoxSuggestion,
): Promise<Location | null> => {
  const response = await searchSession.retrieve(suggestion, {
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
