import { asset } from '@/util/asset.util';
import { useQuery } from '@tanstack/react-query';

export const useTollGatesQuery = () => {
  return useQuery<GeoJSON.FeatureCollection>({
    queryKey: ['tollgates'],
    queryFn: () => fetch(asset('toll-gates.geojson')).then((response) => response.json()),
  });
};
