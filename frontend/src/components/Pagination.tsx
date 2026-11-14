interface PaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const PAGE_SIZES = [5, 10, 20];

// Shows up to 5 page numbers around the current page
function getPageNumbers(page: number, totalPages: number): number[] {
  const maxButtons = 5;
  const end = Math.min(totalPages, Math.max(1, page - 2) + maxButtons - 1);
  const start = Math.max(1, end - maxButtons + 1);

  const pages: number[] = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
}

export default function Pagination({
  page,
  pageSize,
  totalCount,
  totalPages,
  loading,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalCount);

  const buttonBase =
    "min-w-9 rounded-md border px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-200";
  const normal = "border-slate-300 bg-white text-slate-700 hover:bg-slate-50";
  const active = "border-blue-700 bg-blue-700 text-white";
  const disabled = "cursor-not-allowed opacity-50";

  const atFirst = page <= 1;
  const atLast = page >= totalPages;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 px-4 py-3">
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={loading || atFirst}
          onClick={() => onPageChange(page - 1)}
          className={`${buttonBase} ${normal} ${
            loading || atFirst ? disabled : ""
          }`}
        >
          ‹ Prev
        </button>

        {getPageNumbers(page, totalPages).map((n) => (
          <button
            key={n}
            type="button"
            disabled={loading}
            aria-current={n === page ? "page" : undefined}
            onClick={() => onPageChange(n)}
            className={`${buttonBase} ${n === page ? active : normal} ${
              loading ? disabled : ""
            }`}
          >
            {n}
          </button>
        ))}

        <button
          type="button"
          disabled={loading || atLast}
          onClick={() => onPageChange(page + 1)}
          className={`${buttonBase} ${normal} ${
            loading || atLast ? disabled : ""
          }`}
        >
          Next ›
        </button>
      </div>

      <p className="text-sm text-slate-600">
        Showing {from}–{to} of {totalCount}
      </p>

      <div className="flex items-center gap-2">
        <label htmlFor="pageSize" className="text-sm text-slate-600">
          Per page
        </label>
        <select
          id="pageSize"
          value={pageSize}
          disabled={loading}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}