interface RegistrationFiltersProps {
  search: string;
  type: string;
  status: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClear: () => void;
}

export default function RegistrationFilters({
  search,
  type,
  status,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onClear,
}: RegistrationFiltersProps) {
  const inputStyle =
    "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200";

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="search" className="text-xs font-medium text-slate-600">
          Participant name
        </label>
        <input
          id="search"
          type="text"
          value={search}
          placeholder="Search participant name…"
          onChange={(e) => onSearchChange(e.target.value)}
          className={`${inputStyle} w-64`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="type" className="text-xs font-medium text-slate-600">
          Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          className={inputStyle}
        >
          <option value="">All types</option>
          <option value="Exhibitor">Exhibitor</option>
          <option value="Competitor">Competitor</option>
          <option value="VIP">VIP</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="text-xs font-medium text-slate-600">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className={inputStyle}
        >
          <option value="">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="CheckedIn">Checked In</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        Clear filters
      </button>
    </div>
  );
}