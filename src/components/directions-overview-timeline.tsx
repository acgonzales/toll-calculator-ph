import {
  DirectionsTollCalculation,
  DirectionsTollCalculationOverviewLeg,
} from '@/types/common.types';

const formatLegName = (leg: DirectionsTollCalculationOverviewLeg) => {
  if (leg.type == 'toll') {
    return `${leg.entry.expressway} ${leg.entry.name} - ${leg.exit.name}`;
  } else {
    const stepName = leg.steps.find((step) => !!step.name)?.name;
    return stepName ?? 'n/a';
  }
};

export default function DirectionsOverviewTimeline({
  calculation,
}: {
  calculation: DirectionsTollCalculation;
}) {
  return (
    <ul className="timeline timeline-vertical">
      {calculation.overview.map((leg, index) => (
        <li key={index} className="timeline-item">
          {index > 0 && <hr style={{ backgroundColor: '#ff0000' }} />}
          <div className="timeline-start timeline-box">{formatLegName(leg)}</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
              style={{ color: leg.type == 'toll' ? '#0000ff' : '#ff0000' }}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {index < calculation.overview.length - 1 && (
            <hr style={{ backgroundColor: leg.type == 'toll' ? '#0000ff' : '#ff0000' }} />
          )}
        </li>
      ))}
    </ul>
  );
}
