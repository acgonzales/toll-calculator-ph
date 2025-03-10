import { Route } from '@/types/common.types';
import { formatDistance, formatDuration, formatPrice } from '@/util/format.util';
import clsx from 'clsx';
import easyTripLogo from '@/assets/easytrip-Logo.webp';
import autosweepLogo from '@/assets/autosweep-logo.png';

interface RouteItemProps {
  index: number;
  route: Route;
  isActive: boolean;
  onSelect: (route: Route) => void;
}

export default function RouteItem({ index, route, isActive, onSelect }: RouteItemProps) {
  return (
    <li
      className={clsx(
        'list-row z-1 cursor-pointer',
        isActive
          ? 'bg-primary text-primary-content hover:brightness-90'
          : 'bg-base-100 hover:bg-base-300',
      )}
      onClick={() => onSelect(route)}
    >
      <div className="text-4xl font-thin tabular-nums opacity-30">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div>
        <div>Estimated travel time of {formatDuration(route.duration)}</div>
        <div className="text-xs font-semibold uppercase opacity-60">
          {formatDistance(route.distance)} travel distance
        </div>
      </div>
      {route.tollPrices.length > 0 && (
        <ul className="list-col-wrap list">
          {route.tollPrices.map((tollPrice, index) => (
            <li className="list-row p-2" key={index}>
              <div>
                <img
                  className="rounded-box h-[32px] w-[72px]"
                  src={tollPrice.entry.expressway == 'NLEX' ? easyTripLogo : autosweepLogo}
                />
              </div>
              <div className="text-xs uppercase">
                <div>{tollPrice.entry.name}</div>
                <div>{tollPrice.exit.name}</div>
              </div>
              <div className="font-semibold">{formatPrice(tollPrice.price[0])}</div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
