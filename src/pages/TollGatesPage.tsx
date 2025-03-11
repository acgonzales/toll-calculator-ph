import { useTollGatesQuery } from '@/queries';
import { groupTollGatesByExpressway } from '@/services/toll.service';
import { useMemo } from 'react';

export default function TollGatesPage() {
  const { data: tollGates, isFetched } = useTollGatesQuery();

  const tollGatesGroupedByExpressway = useMemo(() => {
    if (tollGates) {
      return groupTollGatesByExpressway(tollGates!);
    } else {
      return {};
    }
  }, [tollGates]);

  if (!isFetched) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // TODO: Fly to toll gate location on click
  // const onTollGateClicked = (tollGate: GeoJSON.Feature<GeoJSON.Polygon, TollGate>) => {

  // };

  return (
    <div className="flex flex-col gap-4 p-4">
      {Object.entries(tollGatesGroupedByExpressway).map(([expressway, boundGroups]) => (
        <div key={expressway} className="rounded-box border-base-content/5 bg-base-100 border p-4">
          <h2 className="mb-4 text-lg font-bold">{expressway}</h2>
          {Object.entries(boundGroups).map(([bound, gates]) => (
            <div key={bound} className="mb-4">
              <h3 className="mb-2 text-sm font-semibold opacity-70">{bound}</h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {gates.map((gate) => (
                  <div
                    key={gate.properties.name}
                    // onClick={() => onTollGateClicked(gate)}
                    className="rounded-box bg-base-200 hover:bg-base-300 cursor-pointer p-3"
                  >
                    <div className="font-semibold">{gate.properties.name}</div>
                    <div className="flex gap-2 text-xs">
                      <span
                        className={`badge badge-sm ${
                          gate.properties.type === 'entry' ? 'badge-primary' : 'badge-secondary'
                        }`}
                      >
                        {gate.properties.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
