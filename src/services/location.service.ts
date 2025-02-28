import env from '@/config/env';
import { Coordinates, Suggestion, Location } from '@/types/common.types';
import {
  SearchBoxCore,
  SearchSession,
  SearchBoxOptions,
  SearchBoxSuggestion,
  SearchBoxSuggestionResponse,
  SearchBoxRetrieveResponse,
} from '@mapbox/search-js-core';

const searchBoxCore = new SearchBoxCore({
  accessToken: env.MAPBOX_API_KEY,
});

const reverse = async (coordinates: Coordinates): Promise<Location | null> => {
  const response = await searchBoxCore.reverse(
    {
      lat: coordinates.latitude,
      lon: coordinates.longitude,
    },
    { limit: 1 },
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

type SearchBoxSearchSession = SearchSession<
  SearchBoxOptions,
  SearchBoxSuggestion,
  SearchBoxSuggestionResponse,
  SearchBoxRetrieveResponse
>;

class LocationService {
  private searchSession: SearchBoxSearchSession;

  constructor() {
    this.searchSession = new SearchSession(searchBoxCore, 1000);
  }

  async suggest(query: string): Promise<Suggestion[]> {
    const response = await this.searchSession.suggest(query, {
      limit: 3,
    });
    return response.suggestions.map((suggestion) => ({
      id: suggestion.mapbox_id,
      name: suggestion.name,
      address: suggestion.full_address,
      _mbSuggestion: suggestion,
    }));
  }

  async retrieve(suggestion: Suggestion): Promise<Location | null> {
    const response = await this.searchSession.retrieve(suggestion._mbSuggestion, {});

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
  }
}

export { LocationService, reverse };
