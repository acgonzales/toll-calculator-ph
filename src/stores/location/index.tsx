import { createContext, useReducer } from 'react';
import { Location } from '@/types/common.types';
import { locationReducer, initialState } from '@/stores/location/reducer';
import { locationActions } from '@/stores/location/actions';
import { LocationContextState } from '@/stores/location/types';

export const LocationContext = createContext<LocationContextState | undefined>(undefined);
export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(locationReducer, initialState);

  const locations = state.interims
    .filter((interim) => interim.location)
    .map((interim) => interim.location!);

  const isValid = locations.length === state.interims.length;

  const contextValue = {
    ...state,
    locations,
    isValid,
    addInterim: () => dispatch(locationActions.addInterim()),
    removeInterim: (id: string) => dispatch(locationActions.removeInterim(id)),
    setInterimLocation: (id: string, location: Location) =>
      dispatch(locationActions.setInterimLocation(id, location)),
  };

  return <LocationContext.Provider value={contextValue}>{children}</LocationContext.Provider>;
};
