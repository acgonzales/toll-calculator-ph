import { MapPinIcon } from '@heroicons/react/24/solid';
import { Marker, MarkerInstance } from 'react-map-gl/mapbox';
import { Location } from '@/types/common.types';
import { useEffect, useMemo, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

interface LocationMarkerProps {
  location: Location;
  color: string;
}

export default function LocationMarker({ location, color }: LocationMarkerProps) {
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
      <MapPinIcon
        className={`size-10 cursor-pointer ${color} transition-all hover:brightness-85`}
      />
    </Marker>
  );
}
