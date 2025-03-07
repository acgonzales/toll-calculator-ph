import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@/contexts/SearchContext';
import { getLocationFromSuggestion } from '@/services/location.service';

export const useRetrieveSuggestionQuery = () => {
  const { searchId, session, activeSuggestion } = useSearch();

  return useQuery({
    queryKey: ['retrieveSuggestion', searchId, activeSuggestion, session],
    queryFn: () => getLocationFromSuggestion(session, activeSuggestion!),
    enabled: !!searchId && !!activeSuggestion,
  });
};
