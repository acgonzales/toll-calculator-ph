import { useQuery } from '@tanstack/react-query';
import { getDirections } from '@/services/location.service';
import { useLocation } from '@/stores';
import { useTollGatesQuery } from './useTollGatesQuery';

export const useDirectionsQuery = () => {
  const { data: tollGates } = useTollGatesQuery();
  const { locations, isValid } = useLocation();

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['directions', locations],
    queryFn: () => getDirections(tollGates!, locations),
    enabled: tollGates && isValid,
  });
};
