import { DirectionsTollCalculation } from '@/types/common.types';
import { formatLegName, formatPrice } from '@/util/format.util';

export default function DirectionsOverviewTimeline({
  calculation,
}: {
  calculation: DirectionsTollCalculation;
}) {
  return (
    <ul className="timeline timeline-vertical">
      {calculation.overview.map((leg, index) => {
        const isToll = leg.type === 'toll';

        const itemColorClass = isToll ? 'text-blue-600' : 'text-gray-500';
        const bgColorClass = isToll ? 'bg-blue-100' : 'bg-gray-100';

        return (
          <li key={index} className="timeline-item">
            {index > 0 && <hr className="bg-primary" />}
            <div
              className={`timeline-start timeline-box border-l-4 text-black ${bgColorClass} ${isToll ? 'border-l-blue-500' : 'border-l-gray-400'}`}
            >
              {formatLegName(leg)}
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`${itemColorClass} h-5 w-5`}
              >
                {isToll ? (
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 8.586V4z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </div>
            {isToll && leg.price > 0 && (
              <div className="timeline-end timeline-box border border-amber-300 bg-amber-50 font-medium text-amber-700">
                {formatPrice(leg.price)}
              </div>
            )}
            {index < calculation.overview.length - 1 && <hr className="bg-primary" />}
          </li>
        );
      })}
    </ul>
  );
}
