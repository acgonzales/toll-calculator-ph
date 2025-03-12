import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@/stores/search/hooks';
import { getSuggestions } from '@/services/location.service';

export const useSearchSuggestionsQuery = () => {
  const { searchId, searchQuery, session } = useSearch();

  return useQuery({
    queryKey: ['suggestions', searchQuery, searchId, session],
    queryFn: () => getSuggestions(session, searchQuery),
    enabled: !!searchQuery && !!searchId,
  });
};
