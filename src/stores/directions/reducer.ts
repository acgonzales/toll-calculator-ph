import { DirectionsState } from '@/stores/directions/types';
import { DirectionsAction, DirectionsActionTypes } from '@/stores/directions/actions';

export const initialState: DirectionsState = {
  activeRoute: undefined,
};

export function directionsReducer(
  state: DirectionsState,
  action: DirectionsAction,
): DirectionsState {
  switch (action.type) {
    case DirectionsActionTypes.SET_ACTIVE_ROUTE:
      return {
        ...state,
        activeRoute: action.route,
      };

    case DirectionsActionTypes.CLEAR_ACTIVE_ROUTE:
      return {
        ...state,
        activeRoute: undefined,
      };

    default:
      return state;
  }
}
