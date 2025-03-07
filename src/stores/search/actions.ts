import { Location } from '@/types/common.types';
import { SearchBoxSuggestion } from '@mapbox/search-js-core';

export const SearchActionTypes = {
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  RESET_SESSION: 'RESET_SESSION',
  ADD_INTERIM: 'ADD_INTERIM',
  REMOVE_INTERIM: 'REMOVE_INTERIM',
  SET_INTERIM_LOCATION: 'SET_INTERIM_LOCATION',
  SET_ACTIVE_SUGGESTION: 'SET_ACTIVE_SUGGESTION',
} as const;

export type SearchAction =
  | { type: typeof SearchActionTypes.SET_SEARCH_QUERY; searchId: string; query: string }
  | { type: typeof SearchActionTypes.RESET_SESSION }
  | { type: typeof SearchActionTypes.ADD_INTERIM }
  | { type: typeof SearchActionTypes.REMOVE_INTERIM; id: string }
  | { type: typeof SearchActionTypes.SET_INTERIM_LOCATION; id: string; location: Location }
  | {
      type: typeof SearchActionTypes.SET_ACTIVE_SUGGESTION;
      suggestion: SearchBoxSuggestion | undefined;
    };

export const searchActions = {
  setSearchQuery: (searchId: string, query: string): SearchAction => ({
    type: SearchActionTypes.SET_SEARCH_QUERY,
    searchId,
    query,
  }),

  resetSession: (): SearchAction => ({
    type: SearchActionTypes.RESET_SESSION,
  }),

  addInterim: (): SearchAction => ({
    type: SearchActionTypes.ADD_INTERIM,
  }),

  removeInterim: (id: string): SearchAction => ({
    type: SearchActionTypes.REMOVE_INTERIM,
    id,
  }),

  setInterimLocation: (id: string, location: Location): SearchAction => ({
    type: SearchActionTypes.SET_INTERIM_LOCATION,
    id,
    location,
  }),

  setActiveSuggestion: (suggestion: SearchBoxSuggestion | undefined): SearchAction => ({
    type: SearchActionTypes.SET_ACTIVE_SUGGESTION,
    suggestion,
  }),
};
