import { DirectionsTollCalculation } from '@/types/common.types';
import { formatPrice } from '@/util/format.util';

export default function CalculationResultAmounts({
  calculation,
}: {
  calculation: DirectionsTollCalculation;
}) {
  return (
    <div className="grid grid-cols-1">
      <div className="stats grid-cols-2 shadow">
        <div className="stat place-items-center">
          <div className="stat-title">EasyTrip</div>
          <div className="stat-value">{formatPrice(calculation.easyTripTotal)}</div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-title">AutoSweep</div>
          <div className="stat-value">{formatPrice(calculation.autoSweepTotal)}</div>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat w-full place-items-center">
          <div className="stat-title">Total</div>
          <div className="stat-value text-primary">{formatPrice(calculation.total)}</div>
        </div>
      </div>
    </div>
  );
}
