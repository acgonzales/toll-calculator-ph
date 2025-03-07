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
import LocationMarker from '@/components/LocationMarker';
import { useLocation } from '@/stores';
import { LocationColors } from '@/config/colors';

export default function MapView() {
  const { locations } = useLocation();
  const { data: tollGates, isLoading } = useTollGatesQuery();

  const mapRef = useRef<MapRef>(null);

  if (isLoading) {
    return (
      <div className="flex h-full w-full justify-center align-middle">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

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

      {locations.map((location, index) => (
        <LocationMarker key={location!.id} color={LocationColors[index]} location={location!} />
      ))}
    </Map>
  );
}
