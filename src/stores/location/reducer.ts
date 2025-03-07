import { LocationInterim } from '@/types/common.types';
import { v4 as uuidv4 } from 'uuid';
import { LocationState } from '@/stores/location/types';
import { LocationAction, LocationActionTypes } from '@/stores/location/actions';

const initialLocationInterims: LocationInterim[] = [{ id: uuidv4() }, { id: uuidv4() }];

export const initialState: LocationState = {
  interims: initialLocationInterims,
};

export function locationReducer(state: LocationState, action: LocationAction): LocationState {
  switch (action.type) {
    case LocationActionTypes.ADD_INTERIM:
      return {
        ...state,
        interims: [...state.interims, { id: uuidv4() }],
      };

    case LocationActionTypes.REMOVE_INTERIM:
      return {
        ...state,
        interims: state.interims.filter((i) => i.id !== action.id),
      };

    case LocationActionTypes.SET_INTERIM_LOCATION:
      return {
        ...state,
        interims: state.interims.map((i: LocationInterim) =>
          i.id === action.id ? { ...i, location: { ...action.location } } : i,
        ),
      };

    default:
      return state;
  }
}
