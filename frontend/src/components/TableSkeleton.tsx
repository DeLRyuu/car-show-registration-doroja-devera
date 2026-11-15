const widths = ["w-20", "w-32", "w-32", "w-28", "w-16", "w-20", "w-16", "w-16"];

const headers = [
  "Reg. no.",
  "Date",
  "Participant",
  "Car",
  "Type",
  "Status",
  "Fee / paid",
  "Payment",
];

export default function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div role="status" aria-live="polite" className="overflow-x-auto">
      <span className="sr-only">Loading registrations&hellip;</span>

      <table className="min-w-full text-left">
        <thead className="border-b border-line bg-paper/60">
          <tr>
            {headers.map((h, i) => (
              <th
                key={h}
                scope="col"
                className={`px-4 py-3 text-sm font-medium text-muted ${
                  i === 6 ? "text-right" : ""
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-line">
          {Array.from({ length: rows }).map((_, row) => (
            <tr key={row}>
              {widths.map((width, col) => (
                <td key={col} className="px-4 py-5">
                  <div
                    className={`h-4 animate-pulse rounded bg-line ${width} ${
                      col === 6 ? "ml-auto" : ""
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
