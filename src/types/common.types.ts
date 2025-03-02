export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface TollBooth {
  name: string;
  type: 'entry' | 'exit';
  rfidType: 'EasyTrip' | 'AutoSweep';
  coordinates: Coordinates;
}

export interface Suggestion {
  id: string;
  name: string;
  address: string;
  _mbSuggestion: any; // TODO: Fully use mb suggestion type
}

export interface Location {
  id?: string;
  name: string;
  address: string;
  coordinates: Coordinates;
  feature: GeoJSON.GeoJSON;
}

export interface DirectionStep {
  name: string;
  coordinates: Coordinates;
  geometry: GeoJSON.GeoJSON;
}

export interface Directions {
  origin: Location;
  destination: Location;
  steps: DirectionStep[];
  geometry: GeoJSON.GeoJSON;
}
