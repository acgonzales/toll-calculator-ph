import { Route } from '@/types/common.types';
import { formatDistance, formatDuration } from '@/util/format.util';
import clsx from 'clsx';

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
          <li
            key={route.id}
            className={clsx(
              'list-row cursor-pointer',
              isActive ? 'bg-primary hover:brightness-90' : 'bg-base-100 hover:bg-base-300',
            )}
            onClick={() => onSelect(route)}
          >
            <div className="text-4xl font-thin tabular-nums opacity-30">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className="text-primary-content">
              <div>Estimated travel time of {formatDuration(route.duration)}</div>
              <div className="text-xs font-semibold uppercase opacity-60">
                {formatDistance(route.distance)} travel distance
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
