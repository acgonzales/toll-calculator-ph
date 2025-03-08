import { createContext, useReducer } from 'react';
import { DirectionsContextState } from '@/stores/directions/types';
import { directionsReducer, initialState } from '@/stores/directions/reducer';
import { directionsActions } from '@/stores/directions/actions';
import { Route } from '@/types/common.types';

export const DirectionsContext = createContext<DirectionsContextState | undefined>(undefined);
export const DirectionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(directionsReducer, initialState);

  const contextValue = {
    ...state,
    setActiveRoute: (route: Route) => dispatch(directionsActions.setActiveRoute(route)),
    clearActiveRoute: () => dispatch(directionsActions.clearActiveRoute()),
  };

  return <DirectionsContext.Provider value={contextValue}>{children}</DirectionsContext.Provider>;
};
