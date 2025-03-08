import { useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import LocationControl from '@/features/LocationControl';
import Sidebar from '@/components/Sidebar';
import SearchResults from '@/components/SearchResults';
import { useSearch, useLocation, useDirections } from '@/stores';
import { useSearchSuggestionsQuery } from '@/queries/useSearchSuggestionsQuery';
import { useRetrieveSuggestionQuery } from '@/queries/useRetrieveSuggestionQuery';
import MapView from '@/features/MapView';
import { useDirectionsQuery } from './queries/useDirectionsQuery';
import DirectionsSelection from './components/DirectionsSelection';
import { Route } from '@/types/common.types';

function App() {
  const { isValid, setInterimLocation } = useLocation();
  const { searchId, searchQuery, setActiveSuggestion, resetSession } = useSearch();
  const { activeRoute, setActiveRoute, clearActiveRoute } = useDirections();

  const { data: suggestions, isLoading: isSearching } = useSearchSuggestionsQuery();
  const { data: retrievedLocation, isSuccess: retrieveSuccess } = useRetrieveSuggestionQuery();
  const {
    data: directions,
    isPending: isRetrievingDirections,
    isSuccess: retrieveDirectionsSuccess,
  } = useDirectionsQuery();

  useEffect(() => {
    if (searchId && retrievedLocation && retrieveSuccess) {
      setInterimLocation(searchId, retrievedLocation);
      resetSession();
    }
  }, [searchId, retrievedLocation, retrieveSuccess, resetSession, setInterimLocation]);

  useEffect(() => {
    if (retrieveDirectionsSuccess && directions!.routes.length > 0 && !activeRoute) {
      setActiveRoute(directions!.routes[0]);
    }
  }, [retrieveDirectionsSuccess, directions, activeRoute, setActiveRoute]);

  useEffect(() => {
    if (!isValid) {
      clearActiveRoute();
    }
  }, [isValid, clearActiveRoute]);

  const onRouteSelect = (route: Route) => {
    setActiveRoute(route);
  };

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

            {searchQuery.length < 1 && isValid && !isRetrievingDirections && (
              <DirectionsSelection
                activeRoute={activeRoute}
                routes={directions!.routes}
                onSelect={onRouteSelect}
              />
            )}
          </div>
        </Sidebar>

        <div className="h-full w-full">
          <MapView />
        </div>
      </div>
    </>
  );
}

export default App;
