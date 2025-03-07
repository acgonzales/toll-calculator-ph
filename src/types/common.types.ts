export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface TollGate {
  name: string;
  type: 'entry' | 'exit';
  bound: 'Northbound' | 'Southbound';
  expressway: 'NLEX' | 'Skyway';
}

export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: Coordinates;
  feature: GeoJSON.GeoJSON;
}

export interface LocationInterim {
  id: string;
  text?: string;
  location?: Location;
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

export interface TollPriceMatrixEntry {
  [entry: string]: {
    [exit: string]: [number, number, number]; // [class1, class2, class3]
  };
}

export interface TollPriceMatrix {
  rfidType: 'EasyTrip' | 'AutoSweep';
  matrix: TollPriceMatrixEntry;
}

export interface ExpressWayRfidMatrix {
  [expressway: string]: TollPriceMatrix;
}
