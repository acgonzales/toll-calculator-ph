import { SearchBoxSuggestion } from '@mapbox/search-js-core';

export const SearchActionTypes = {
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  RESET_SESSION: 'RESET_SESSION',
  SET_ACTIVE_SUGGESTION: 'SET_ACTIVE_SUGGESTION',
} as const;

export type SearchAction =
  | { type: typeof SearchActionTypes.SET_SEARCH_QUERY; searchId: string; query: string }
  | { type: typeof SearchActionTypes.RESET_SESSION }
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

  setActiveSuggestion: (suggestion: SearchBoxSuggestion | undefined): SearchAction => ({
    type: SearchActionTypes.SET_ACTIVE_SUGGESTION,
    suggestion,
  }),
};
