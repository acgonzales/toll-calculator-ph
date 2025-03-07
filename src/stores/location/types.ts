import { Location, LocationInterim } from '@/types/common.types';

export interface LocationState {
  interims: LocationInterim[];
}

export interface LocationContextState extends LocationState {
  locations: Location[];
  addInterim: () => void;
  removeInterim: (id: string) => void;
  setInterimLocation: (id: string, location: Location) => void;
}
