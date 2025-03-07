import { createContext, useReducer } from 'react';
import { SearchBoxSuggestion } from '@mapbox/search-js-core';
import { Location } from '@/types/common.types';
import { SearchContextState } from '@/stores/search/types';
import { searchReducer, initialState } from '@/stores/search/reducer';
import { searchActions } from '@/stores/search/actions';

export const SearchContext = createContext<SearchContextState | undefined>(undefined);
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const contextValue = {
    ...state,
    setSearchQuery: (searchId: string, query: string) =>
      dispatch(searchActions.setSearchQuery(searchId, query)),
    resetSession: () => dispatch(searchActions.resetSession()),
    addInterim: () => dispatch(searchActions.addInterim()),
    removeInterim: (id: string) => dispatch(searchActions.removeInterim(id)),
    setInterimLocation: (id: string, location: Location) =>
      dispatch(searchActions.setInterimLocation(id, location)),
    setActiveSuggestion: (suggestion: SearchBoxSuggestion | undefined) =>
      dispatch(searchActions.setActiveSuggestion(suggestion)),
  };

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};
