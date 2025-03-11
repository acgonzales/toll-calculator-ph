import DirectionsSelection from '@/components/DirectionsSelection';
import SearchResults from '@/components/SearchResults';
import LocationControl from '@/features/LocationControl';
import {
  useDirectionsQuery,
  useRetrieveSuggestionQuery,
  useSearchSuggestionsQuery,
} from '@/queries';
import { useDirections, useLocation, useSearch } from '@/stores';
import { Route } from '@/types/common.types';
import { useEffect } from 'react';

export default function MainPage() {
  const { isValid, setInterimLocation } = useLocation();
  const { searchId, searchQuery, setActiveSuggestion, resetSession } = useSearch();
  const { activeRoute, setActiveRoute, clearActiveRoute } = useDirections();

  const { data: suggestions, isLoading: isSearching } = useSearchSuggestionsQuery();
  const { data: retrievedLocation, isSuccess: retrieveSuccess } = useRetrieveSuggestionQuery();
  const { data: directions, isPending: isRetrievingDirections } = useDirectionsQuery();

  useEffect(() => {
    if (searchId && retrievedLocation && retrieveSuccess) {
      setInterimLocation(searchId, retrievedLocation);
      resetSession();
    }
  }, [searchId, retrievedLocation, retrieveSuccess, resetSession, setInterimLocation]);

  useEffect(() => {
    if (!isValid) {
      clearActiveRoute();
    } else if (isValid && directions && directions.routes.length > 0) {
      setActiveRoute(directions!.routes[0]);
    }
  }, [directions, isValid, setActiveRoute, clearActiveRoute]);

  const onRouteSelect = (route: Route) => {
    setActiveRoute(route);
  };

  return (
    <>
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
    </>
  );
}
