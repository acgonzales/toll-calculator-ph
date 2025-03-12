import { createContext, useReducer } from 'react';
import { SearchBoxSuggestion } from '@mapbox/search-js-core';
import { SearchContextState } from '@/stores/search/types';
import { searchReducer, initialState } from '@/stores/search/reducer';
import { searchActions } from '@/stores/search/actions';
import { useLocation } from '@/stores/location/hooks';

export const SearchContext = createContext<SearchContextState | undefined>(undefined);
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const locationContext = useLocation();
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const setSearchQuery = (searchId: string, query: string) => {
    const interim = locationContext.interims.find((i) => i.id === searchId);
    if (interim) {
      dispatch(searchActions.setSearchQuery(searchId, query));
    }
  };

  const contextValue = {
    ...state,
    setSearchQuery,
    resetSession: () => dispatch(searchActions.resetSession()),
    setActiveSuggestion: (suggestion: SearchBoxSuggestion | undefined) =>
      dispatch(searchActions.setActiveSuggestion(suggestion)),
  };

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};
