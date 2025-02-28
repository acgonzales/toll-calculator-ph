interface Coordinates {
  latitude: number;
  longitude: number;
}

interface TollBooth {
  name: string;
  type: 'entry' | 'exit';
  rfidType: 'EasyTrip' | 'AutoSweep';
  coordinates: Coordinates;
}

interface Suggestion {
  id: string;
  name: string;
  address: string;
  _mbSuggestion: any; // TODO: Fully use mb suggestion type
}

interface Location {
  id?: string;
  name: string;
  address: string;
  coordinates: Coordinates;
  feature: GeoJSON.GeoJSON;
}

export { type Coordinates, type TollBooth, type Suggestion, type Location };
