import { MapPinIcon } from '@heroicons/react/24/solid';
import { Marker, Popup } from 'react-map-gl/mapbox';
import { Location } from '@/types/common.types';

export default function LocationMarker({ location }: { location: Location }) {
  return (
    <Marker latitude={location.coordinates.latitude} longitude={location.coordinates.longitude}>
      <Popup
        latitude={location.coordinates.latitude}
        longitude={location.coordinates.longitude}
        closeButton={false}
        className="text-xs text-black"
      >
        {location.name}
      </Popup>
      <MapPinIcon className="size-10 cursor-pointer text-red-500 hover:text-red-700" />
    </Marker>
  );
}
