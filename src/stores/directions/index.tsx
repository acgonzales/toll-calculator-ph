import { createContext, useCallback, useReducer } from 'react';
import { DirectionsContextState } from '@/stores/directions/types';
import { directionsReducer, initialState } from '@/stores/directions/reducer';
import { directionsActions } from '@/stores/directions/actions';
import { Route } from '@/types/common.types';

export const DirectionsContext = createContext<DirectionsContextState | undefined>(undefined);
export const DirectionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(directionsReducer, initialState);

  const clearActiveRoute = useCallback(() => {
    dispatch(directionsActions.clearActiveRoute());
  }, []);

  const setActiveRoute = useCallback((route: Route) => {
    dispatch(directionsActions.setActiveRoute(route));
  }, []);

  const contextValue = {
    ...state,
    clearActiveRoute,
    setActiveRoute,
  };

  return <DirectionsContext.Provider value={contextValue}>{children}</DirectionsContext.Provider>;
};
