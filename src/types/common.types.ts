export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface TollGate {
  name: string;
  type: 'entry' | 'exit';
  expressway: 'NLEX' | 'Skyway';
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
  id: string;
  name: string;
  geometry: GeoJSON.MultiLineString | GeoJSON.LineString;
}
export interface Directions {
  origin: Location;
  destination: Location;
  steps: DirectionStep[];
  geometry: GeoJSON.GeoJSON;
}

export interface DirectionsTollCalculationOverviewLegRegular {
  type: 'regular';
  steps: DirectionStep[];
  geometry: GeoJSON.GeoJSON;
}

export interface DirectionsTollCalculationOverviewLegToll {
  type: 'toll';
  steps: DirectionStep[];
  geometry: GeoJSON.GeoJSON;
  entry: TollGate;
  exit: TollGate;
  price: number;
}

export type DirectionsTollCalculationOverviewLeg =
  | DirectionsTollCalculationOverviewLegRegular
  | DirectionsTollCalculationOverviewLegToll;

export interface DirectionsTollCalculation {
  directions: Directions;
  overview: DirectionsTollCalculationOverviewLeg[];
  easyTripTotal: number;
  autoSweepTotal: number;
  total: number;
}

export interface TollPriceMatrix {
  rfidType: 'EasyTrip' | 'AutoSweep';
  matrix: {
    [entry: string]: {
      [exit: string]: [number, number, number];
    };
  };
}

export interface ExpressWayRfidMatrix {
  [expressway: string]: TollPriceMatrix;
}
