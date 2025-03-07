import { useRef } from 'react';
import Map, {
  FullscreenControl,
  GeolocateControl,
  Layer,
  MapRef,
  NavigationControl,
  Source,
} from 'react-map-gl/mapbox';
import env from '@/config/env';
import { tollGateLayer } from '@/styles/map.styles';
import { useTollGatesQuery } from '@/queries/useTollGatesQuery';
import { useSearch } from '@/stores/search/hooks';
import LocationMarker from '@/components/location-marker';

export default function MapView() {
  const { locationInterims } = useSearch();
  const { data: tollGates, isLoading } = useTollGatesQuery();

  const mapRef = useRef<MapRef>(null);

  if (isLoading) {
    return (
      <div className="flex h-full w-full justify-center align-middle">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  const locations = locationInterims.filter((i) => i.location).map((i) => i.location);

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={env.MAPBOX_API_KEY}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <GeolocateControl />
      <FullscreenControl />
      <NavigationControl />

      {tollGates && (
        <Source type="geojson" data={tollGates}>
          <Layer {...tollGateLayer} />
        </Source>
      )}

      {locations.map((location) => (
        <LocationMarker key={location!.id} location={location!} />
      ))}
    </Map>
  );
}
