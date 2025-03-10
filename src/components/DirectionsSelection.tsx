import { Route } from '@/types/common.types';
import RouteItem from './RouteItem';

interface DirectionsSelectionProps {
  activeRoute: Route | undefined;
  routes: Route[];
  onSelect: (route: Route) => void;
}

export default function DirectionsSelection({
  routes,
  activeRoute,
  onSelect,
}: DirectionsSelectionProps) {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="pb-2 text-xs tracking-wide opacity-60">Routes</li>

      {routes.map((route, index) => {
        const isActive = activeRoute !== undefined ? activeRoute.id === route.id : false;
        return (
          <RouteItem
            key={route.id}
            index={index}
            isActive={isActive}
            onSelect={onSelect}
            route={route}
          />
        );
      })}
    </ul>
  );
}
