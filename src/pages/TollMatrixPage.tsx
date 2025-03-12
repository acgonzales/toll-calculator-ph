import { EasyTripMatrix } from '@/config/toll-matrix';

export default function TollMatrixPage() {
  const matrix = EasyTripMatrix.matrix;
  const entries = Object.keys(matrix);

  return (
    <div className="rounded-box border-base-content/5 bg-base-100 overflow-x-auto border">
      <div role="alert" className="alert alert-info alert-soft">
        <span>Only NLEX-SCTEX Toll Matrix (Class 1), other expressways will be added soon.</span>
      </div>
      <table className="table-xs table-zebra table-pin-rows table-pin-cols table">
        <thead>
          <tr>
            <th className="text-xs">Entry / Exit</th>
            {entries.map((exit) => (
              <th key={exit} className="text-xs">
                {exit}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry}>
              <th className="text-xs">{entry}</th>
              {entries.map((exit) => (
                <td key={`${entry}-${exit}`} className="font-mono">
                  {matrix[entry][exit] ? (
                    <div className="flex flex-col gap-1 text-center">
                      <div>
                        <span className="badge badge-soft badge-primary badge-sm">
                          {Number(matrix[entry][exit][0]).toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="badge badge-soft badge-secondary badge-sm">
                          {Number(matrix[entry][exit][1]).toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="badge badge-soft badge-accent badge-sm">
                          {Number(matrix[entry][exit][2]).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    '-'
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
