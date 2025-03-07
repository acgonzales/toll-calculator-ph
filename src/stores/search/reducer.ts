import { SearchState } from '@/stores/search/types';
import { createSession } from '@/services/location.service';
import { SearchAction, SearchActionTypes } from '@/stores/search/actions';

export const initialState: SearchState = {
  session: createSession(),
  searchQuery: '',
  searchId: undefined,
  activeSuggestion: undefined,
};

export function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case SearchActionTypes.SET_SEARCH_QUERY: {
      return {
        ...state,
        searchId: action.searchId,
        searchQuery: action.query,
      };
    }

    case SearchActionTypes.RESET_SESSION:
      return {
        ...state,
        session: createSession(),
        searchId: undefined,
        searchQuery: '',
        activeSuggestion: undefined,
      };

    case SearchActionTypes.SET_ACTIVE_SUGGESTION:
      return {
        ...state,
        activeSuggestion: action.suggestion,
      };

    default:
      return state;
  }
}
