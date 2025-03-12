import { SearchBoxSearchSession } from '@/services/location.service';
import { SearchBoxSuggestion } from '@mapbox/search-js-core';

export interface SearchState {
  session: SearchBoxSearchSession;
  searchQuery: string;
  searchId?: string;
  activeSuggestion: SearchBoxSuggestion | undefined;
}

export interface SearchContextState extends SearchState {
  setSearchQuery: (searchId: string, query: string) => void;
  resetSession: () => void;
  setActiveSuggestion: (suggestion: SearchBoxSuggestion | undefined) => void;
}
