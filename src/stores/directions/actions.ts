import { Route } from '@/types/common.types';

export const DirectionsActionTypes = {
  SET_ACTIVE_ROUTE: 'SET_ACTIVE_ROUTE',
  CLEAR_ACTIVE_ROUTE: 'CLEAR_ACTIVE_ROUTE',
} as const;

export type DirectionsAction =
  | { type: typeof DirectionsActionTypes.SET_ACTIVE_ROUTE; route: Route }
  | { type: typeof DirectionsActionTypes.CLEAR_ACTIVE_ROUTE };

export const directionsActions = {
  setActiveRoute: (route: Route): DirectionsAction => ({
    type: DirectionsActionTypes.SET_ACTIVE_ROUTE,
    route,
  }),

  clearActiveRoute: (): DirectionsAction => ({
    type: DirectionsActionTypes.CLEAR_ACTIVE_ROUTE,
  }),
};
