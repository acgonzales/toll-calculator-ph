import { useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import LocationControl from '@/features/LocationControl';
import Sidebar from '@/components/Sidebar';
import SearchResults from '@/components/SearchResults';
import { useSearch, useLocation } from '@/stores';
import { useSearchSuggestionsQuery } from '@/queries/useSearchSuggestionsQuery';
import { useRetrieveSuggestionQuery } from '@/queries/useRetrieveSuggestionQuery';
import MapView from '@/features/MapView';

function App() {
  const { setInterimLocation } = useLocation();

  const { searchId, searchQuery, setActiveSuggestion, resetSession } = useSearch();
  const { data: suggestions, isLoading: isSearching } = useSearchSuggestionsQuery();
  const { data: retrievedLocation, isSuccess: retrieveSuccess } = useRetrieveSuggestionQuery();

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
          <MapView />
        </div>
      </div>
    </>
  );
}

export default App;
