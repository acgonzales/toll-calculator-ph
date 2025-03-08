import { useQuery } from '@tanstack/react-query';
import { getDirections } from '@/services/location.service';
import { useLocation } from '@/stores';

export const useDirectionsQuery = () => {
  const { locations, isValid } = useLocation();

  return useQuery({
    queryKey: ['directions', locations],
    queryFn: () => getDirections(locations),
    enabled: isValid,
  });
};
