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

export interface RouteLegStep {
  id: string;
  summary: string;
  geometry: GeoJSON.LineString;
}

export interface RouteLeg {
  id: string;
  summary: string;
  duration: number;
  geometry: GeoJSON.FeatureCollection | GeoJSON.LineString; 
  steps: RouteLegStep[];
}

export interface Route {
  id: string;
  duration: number;
  distance: number;
  geometry: GeoJSON.LineString;
  legs: RouteLeg[];
}

export interface DirectionsResponse {
  id: string;
  locations: Location[];
  routes: Route[];
}

// export interface DirectionsTollCalculationOverviewLegRegular {
//   type: 'regular';
//   steps: DirectionStep[];
//   geometry: GeoJSON.GeoJSON;
// }

// export interface DirectionsTollCalculationOverviewLegToll {
//   type: 'toll';
//   steps: DirectionStep[];
//   geometry: GeoJSON.GeoJSON;
//   entry: TollGate;
//   exit: TollGate;
//   price: number;
// }

// export type DirectionsTollCalculationOverviewLeg =
//   | DirectionsTollCalculationOverviewLegRegular
//   | DirectionsTollCalculationOverviewLegToll;

// export interface DirectionsTollCalculation {
//   directions: Directions;
//   overview: DirectionsTollCalculationOverviewLeg[];
//   easyTripTotal: number;
//   autoSweepTotal: number;
//   total: number;
// }

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
