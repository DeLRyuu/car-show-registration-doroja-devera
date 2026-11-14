const widths = ["w-20", "w-32", "w-32", "w-28", "w-16", "w-20", "w-16", "w-16"];

const headers = [
  "Reg. No.",
  "Date",
  "Participant",
  "Car",
  "Type",
  "Status",
  "Fee / Paid",
  "Payment",
];

export default function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div role="status" aria-live="polite" className="overflow-x-auto">
      <span className="sr-only">Loading registrations…</span>

      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
          <tr>
            {headers.map((h, i) => (
              <th
                key={h}
                className={`px-4 py-3 ${i === 6 ? "text-right" : ""}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {Array.from({ length: rows }).map((_, row) => (
            <tr key={row}>
              {widths.map((width, col) => (
                <td key={col} className="px-4 py-4">
                  <div
                    className={`h-4 animate-pulse rounded bg-slate-200 ${width} ${
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