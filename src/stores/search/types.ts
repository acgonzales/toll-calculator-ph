import { SearchBoxSearchSession } from '@/services/location.service';
import { Location, LocationInterim } from '@/types/common.types';
import { SearchBoxSuggestion } from '@mapbox/search-js-core';

export interface SearchState {
  session: SearchBoxSearchSession;
  locationInterims: LocationInterim[];
  searchQuery: string;
  searchId?: string;
  activeSuggestion: SearchBoxSuggestion | undefined;
}

export interface SearchContextState extends SearchState {
  setSearchQuery: (searchId: string, query: string) => void;
  resetSession: () => void;
  addInterim: () => void;
  removeInterim: (id: string) => void;
  setInterimLocation: (id: string, location: Location) => void;
  setActiveSuggestion: (suggestion: SearchBoxSuggestion | undefined) => void;
}
