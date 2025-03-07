import { Location } from '@/types/common.types';

export const LocationActionTypes = {
  ADD_INTERIM: 'ADD_INTERIM',
  REMOVE_INTERIM: 'REMOVE_INTERIM',
  SET_INTERIM_LOCATION: 'SET_INTERIM_LOCATION',
} as const;

export type LocationAction =
  | { type: typeof LocationActionTypes.ADD_INTERIM }
  | { type: typeof LocationActionTypes.REMOVE_INTERIM; id: string }
  | { type: typeof LocationActionTypes.SET_INTERIM_LOCATION; id: string; location: Location };

export const locationActions = {
  addInterim: (): LocationAction => ({
    type: LocationActionTypes.ADD_INTERIM,
  }),

  removeInterim: (id: string): LocationAction => ({
    type: LocationActionTypes.REMOVE_INTERIM,
    id,
  }),

  setInterimLocation: (id: string, location: Location): LocationAction => ({
    type: LocationActionTypes.SET_INTERIM_LOCATION,
    id,
    location,
  }),
};
