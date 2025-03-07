import { useEffect, useRef, useState } from 'react';
import Map, {
  FullscreenControl,
  GeolocateControl,
  Layer,
  MapRef,
  NavigationControl,
  Source,
} from 'react-map-gl/mapbox';
import env from '@/config/env';
import 'mapbox-gl/dist/mapbox-gl.css';
import { tollGateLayer } from '@/styles/map.styles';
import { asset } from '@/util/asset.util';
import LocationControl from '@/features/LocationControl';
import Sidebar from '@/components/Sidebar';
import SearchResults from '@/components/SearchResults';
import { useSearch } from '@/contexts/SearchContext';
import { useSearchSuggestionsQuery } from './queries/useSearchSuggestionsQuery';
import { useRetrieveSuggestionQuery } from './queries/useRetrieveSuggestionQuery';

function App() {
  const { searchId, searchQuery, setActiveSuggestion, setInterimLocation, resetSession } =
    useSearch();
  const { data: suggestions, isLoading: isSearching } = useSearchSuggestionsQuery();
  const { data: retrievedLocation, isSuccess: retrieveSuccess } = useRetrieveSuggestionQuery();

  const [tollGates, setTollGates] = useState<GeoJSON.FeatureCollection | undefined>(undefined);

  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (!tollGates) {
      fetch(asset('toll-gates.geojson'))
        .then((response) => response.json())
        .then((data) => {
          setTollGates(data);
        });
    }
  }, [tollGates]);

  useEffect(() => {
    if (searchId && retrievedLocation && retrieveSuccess) {
      setInterimLocation(searchId, retrievedLocation);
      resetSession();
    }
  }, [searchId, retrievedLocation, retrieveSuccess, resetSession, setInterimLocation]);

  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden">
        <Sidebar className="absolute bottom-0 z-10 h-1/3 w-full lg:left-0 lg:h-full lg:w-1/3">
          <LocationControl />
          <div className="divider"></div>
          <div className="flex h-full flex-col justify-between px-4">
            {searchQuery.length > 0 && (
              <SearchResults
                searchQuery={searchQuery}
                results={suggestions ?? []}
                isSearching={isSearching}
                onSelect={setActiveSuggestion}
              />
            )}
          </div>
        </Sidebar>

        <div className="h-full w-full">
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
          </Map>
        </div>
      </div>
    </>
  );
}

export default App;
