import { MapPinIcon } from '@heroicons/react/24/solid';
import { Marker, MarkerInstance } from 'react-map-gl/mapbox';
import { Location } from '@/types/common.types';
import { useEffect, useMemo, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

export default function LocationMarker({ location }: { location: Location }) {
  const markerRef = useRef<MarkerInstance>(null);

  useEffect(() => {
    if (markerRef.current && !markerRef.current.getPopup()?.isOpen()) {
      markerRef.current.togglePopup();
    }
  }, []);

  const popup = useMemo(
    () =>
      new mapboxgl.Popup({
        anchor: 'bottom',
        closeButton: false,
        offset: 8,
        className: 'text-xs text-black',
      }).setText(location.name),
    [location],
  );

  return (
    <Marker
      ref={markerRef}
      latitude={location.coordinates.latitude}
      longitude={location.coordinates.longitude}
      popup={popup}
    >
      <MapPinIcon className="size-10 cursor-pointer text-red-500 hover:text-red-700" />
    </Marker>
  );
}
