import { Route } from '@/types/common.types';

export interface DirectionsState {
  activeRoute: Route | undefined;
}

export interface DirectionsContextState extends DirectionsState {
  setActiveRoute: (route: Route) => void;
  clearActiveRoute: () => void;
}
