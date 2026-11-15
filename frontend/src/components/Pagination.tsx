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

  const button =
    "h-10 min-w-10 rounded-md border px-3 text-base font-medium disabled:cursor-not-allowed disabled:opacity-50";
  const normal = "border-line bg-white text-ink enabled:hover:bg-tint";
  const active = "border-steel bg-steel text-white";

  const atFirst = page <= 1;
  const atLast = page >= totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-4 py-4"
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          disabled={loading || atFirst}
          onClick={() => onPageChange(page - 1)}
          className={`${button} ${normal}`}
        >
          Previous
        </button>

        {getPageNumbers(page, totalPages).map((n) => (
          <button
            key={n}
            type="button"
            disabled={loading}
            aria-current={n === page ? "page" : undefined}
            onClick={() => onPageChange(n)}
            className={`${button} ${n === page ? active : normal}`}
          >
            {n}
          </button>
        ))}

        <button
          type="button"
          disabled={loading || atLast}
          onClick={() => onPageChange(page + 1)}
          className={`${button} ${normal}`}
        >
          Next
        </button>
      </div>

      <p className="text-base text-muted">
        Showing {from}&ndash;{to} of {totalCount}
      </p>

      <div className="flex items-center gap-2">
        <label htmlFor="pageSize" className="text-base text-muted">
          Per page
        </label>
        <select
          id="pageSize"
          value={pageSize}
          disabled={loading}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-10 rounded-md border border-line bg-white px-2 text-base"
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}
