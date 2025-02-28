import { useEffect, useRef } from 'react';
import LocationInput from '@/components/location-input';
import useLocationInput from '@/hooks/useLocationInput';
import { reverse } from '@/services/location.service';
import Map, { Marker, MapRef } from 'react-map-gl/mapbox';
import env from '@/config/env';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { getCenter, getMapBounds } from '@/util/map.util';

import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const origin = useLocationInput();
  const destination = useLocationInput();

  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        const location = await reverse(coords);
        if (location) {
          origin.setLocation(location);
          mapRef.current?.flyTo({
            zoom: 10,
            center: {
              lat: coords.latitude,
              lon: coords.longitude,
            },
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    // Get the center and appropriate zoom level for the map
    if (origin.location && destination.location) {
      const center = getCenter(origin.location.coordinates, destination.location.coordinates);

      mapRef.current?.jumpTo({
        center: {
          lat: center.latitude,
          lon: center.longitude,
        },
      });
      mapRef.current?.fitBounds(
        getMapBounds(origin.location.coordinates, destination.location.coordinates),
        {
          linear: false,
          padding: 50,
          maxZoom: 15,
        },
      );
    }
  }, [mapRef.current, origin.location, destination.location]);

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">&#x1f1f5;&#x1f1ed; Toll Calculator</h1>
        <div className="card bg-base-200 min-h-10/12 w-5xl shadow-md">
          <div className="card-body">
            <div className="flex h-full flex-col justify-stretch gap-4 lg:flex-row">
              <div className="flex w-full flex-col gap-2">
                <LocationInput
                  label="Origin"
                  value={origin.value}
                  suggestions={origin.suggestions}
                  onChange={(e) => origin.handleChange(e.target.value)}
                  selectSuggestion={(suggestion) => origin.selectSuggestion(suggestion)}
                />
                <LocationInput
                  label="Destination"
                  value={destination.value}
                  suggestions={destination.suggestions}
                  onChange={(e) => destination.handleChange(e.target.value)}
                  selectSuggestion={(suggestion) => destination.selectSuggestion(suggestion)}
                />
                <div className="card-actions">
                  <button className="btn btn-primary w-full">Calculate</button>
                </div>
              </div>
              <div className="w-full">
                <Map
                  ref={mapRef}
                  mapboxAccessToken={env.MAPBOX_API_KEY}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                >
                  {origin.location && (
                    <Marker
                      latitude={origin.location.coordinates.latitude}
                      longitude={origin.location.coordinates.longitude}
                    >
                      <MapPinIcon className="size-10 cursor-pointer text-red-500 hover:text-red-700" />
                    </Marker>
                  )}

                  {destination.location && (
                    <Marker
                      latitude={destination.location.coordinates.latitude}
                      longitude={destination.location.coordinates.longitude}
                    >
                      <MapPinIcon className="size-10 cursor-pointer text-red-500 hover:text-red-700" />
                    </Marker>
                  )}
                </Map>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
