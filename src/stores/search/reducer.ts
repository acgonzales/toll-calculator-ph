import { LocationInterim } from '@/types/common.types';
import { v4 as uuidv4 } from 'uuid';
import { SearchState } from '@/stores/search/types';
import { createSession } from '@/services/location.service';
import { SearchAction, SearchActionTypes } from '@/stores/search/actions';

const initialLocationInterims: LocationInterim[] = [{ id: uuidv4() }, { id: uuidv4() }];

export const initialState: SearchState = {
  session: createSession(),
  locationInterims: initialLocationInterims,
  searchQuery: '',
  searchId: undefined,
  activeSuggestion: undefined,
};

export function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case SearchActionTypes.SET_SEARCH_QUERY: {
      const interim = state.locationInterims.find((i) => i.id === action.searchId);
      if (!interim) return state;

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

    case SearchActionTypes.ADD_INTERIM:
      return {
        ...state,
        locationInterims: [...state.locationInterims, { id: uuidv4() }],
      };

    case SearchActionTypes.REMOVE_INTERIM:
      return {
        ...state,
        locationInterims: state.locationInterims.filter((i) => i.id !== action.id),
      };

    case SearchActionTypes.SET_INTERIM_LOCATION:
      return {
        ...state,
        locationInterims: state.locationInterims.map((i) =>
          i.id === action.id ? { ...i, location: { ...action.location } } : i,
        ),
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
