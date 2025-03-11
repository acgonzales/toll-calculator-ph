import { useEffect, useRef } from 'react';
import Map, {
  FullscreenControl,
  GeolocateControl,
  Layer,
  MapRef,
  NavigationControl,
  Source,
} from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import env from '@/config/env';
import { directionStepLayer, tollGateLayer } from '@/styles/map.styles';
import { useTollGatesQuery } from '@/queries';
import LocationMarker from '@/components/LocationMarker';
import { useDirections, useLocation } from '@/stores';
import { LocationColors } from '@/config/colors';
import { getCenter, getMapBounds } from '@/util/map.util';

export default function MapView() {
  const { locations, isValid } = useLocation();
  const { activeRoute } = useDirections();

  const { data: tollGates, isLoading } = useTollGatesQuery();

  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (isValid) {
      const coordinates = locations.map((l) => l.coordinates);
      // TODO: Make offsets responsive
      const center = getCenter(coordinates);
      mapRef.current?.jumpTo({
        center: {
          lat: center.latitude,
          lon: center.longitude - 0.2,
        },
      });
      mapRef.current?.fitBounds(getMapBounds(coordinates), {
        linear: false,
        padding: { left: 400, right: 80, top: 80, bottom: 80 },
        maxZoom: 15,
      });
    }
  }, [isValid, locations]);

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

      {activeRoute && (
        <Source type="geojson" data={activeRoute.geometry}>
          <Layer {...directionStepLayer} />
        </Source>
      )}
    </Map>
  );
}
