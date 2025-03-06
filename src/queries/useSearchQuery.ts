import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@/contexts/SearchContext';
import { getSuggestions } from '@/services/location.service';

export const useSearchSuggestions = () => {
  const { searchId, searchQuery, session } = useSearch();

  const queryKey = ['suggestions', searchQuery, searchId];
  console.log('Query Key:', queryKey);

  return useQuery({
    queryKey: queryKey,
    queryFn: () => getSuggestions(session, searchQuery),
    enabled: !!searchQuery && !!searchId,
  });
};
