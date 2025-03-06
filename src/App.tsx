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
import SearchResults from '@/features/SearchResults';
import { useSearch } from '@/contexts/SearchContext';

function App() {
  const { searchQuery } = useSearch();

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

  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden">
        <Sidebar className="absolute bottom-0 z-10 h-1/3 w-full lg:left-0 lg:h-full lg:w-1/3">
          <LocationControl />
          <div className="divider"></div>
          <div className="flex h-full flex-col justify-between px-4">
            {searchQuery.length > 0 && <SearchResults />}
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
