import { useCallback, useEffect, useRef, useState } from 'react';
import LocationInput from '@/components/location-input';
import useLocationInput from '@/hooks/useLocationInput';
import {
  getLocationFromCoordinates,
  getDirections as getDirectionsApi,
} from '@/services/location.service';
import { calculateToll } from '@/services/toll.service';
import Map, { Layer, MapRef, Source } from 'react-map-gl/mapbox';
import env from '@/config/env';
import { getCenter, getMapBounds } from '@/util/map.util';
import { DirectionsTollCalculation } from '@/types/common.types';
import 'mapbox-gl/dist/mapbox-gl.css';
import LocationMarker from '@/components/location-marker';
import { directionStepLayer, directionTollStepLayer, tollGateLayer } from '@/styles/map.styles';
import DirectionsOverviewTimeline from './components/directions-overview-timeline';
import CalculationResultAmounts from './components/calculation-result-amounts';

function App() {
  const origin = useLocationInput();
  const destination = useLocationInput();
  const [tollGates, setTollGates] = useState<GeoJSON.FeatureCollection | null>(null);
  const [calculationResult, setCalculationResult] = useState<DirectionsTollCalculation | null>(
    null,
  );

  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        const location = await getLocationFromCoordinates(coords);
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

    fetch('/toll-gates.geojson')
      .then((response) => response.json())
      .then((data) => {
        setTollGates(data);
      });
  }, []);

  useEffect(() => {
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
          padding: 80,
          maxZoom: 15,
        },
      );
    }
  }, [mapRef.current, origin.location, destination.location]);

  useEffect(() => {
    setCalculationResult(null);
  }, [origin.location, destination.location]);

  const getDirections = useCallback(async () => {
    if (tollGates && origin.location && destination.location) {
      const directions = await getDirectionsApi(origin.location, destination.location);
      const result = calculateToll(tollGates, directions);
      setCalculationResult(result);
      console.log(result);
    }
  }, [tollGates, origin.location, destination.location]);

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">&#x1f1f5;&#x1f1ed; Toll Calculator</h1>
        <div className="card bg-base-200 min-h-10/12 w-6xl shadow-md">
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
                  <button
                    disabled={!origin.location || !destination.location}
                    onClick={getDirections}
                    className="btn btn-primary w-full"
                  >
                    Calculate
                  </button>
                </div>
                {calculationResult && (
                  <>
                    <div className="divider"></div>
                    <div className="h-full overflow-y-scroll">
                      <DirectionsOverviewTimeline calculation={calculationResult} />
                      <CalculationResultAmounts calculation={calculationResult} />
                    </div>
                  </>
                )}
              </div>
              <div className="w-full">
                <Map
                  ref={mapRef}
                  mapboxAccessToken={env.MAPBOX_API_KEY}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                >
                  {origin.location && <LocationMarker location={origin.location} />}
                  {destination.location && <LocationMarker location={destination.location} />}

                  {calculationResult &&
                    calculationResult.overview
                      .filter((leg) => leg.type === 'toll')
                      .map((leg) => (
                        <Source type="geojson" data={leg.geometry}>
                          <Layer {...directionTollStepLayer} />
                        </Source>
                      ))}

                  {calculationResult &&
                    calculationResult.overview
                      .filter((leg) => leg.type === 'regular')
                      .map((leg) => (
                        <Source type="geojson" data={leg.geometry}>
                          <Layer {...directionStepLayer} />
                        </Source>
                      ))}

                  {tollGates && (
                    <Source type="geojson" data={tollGates}>
                      <Layer {...tollGateLayer} />
                    </Source>
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
