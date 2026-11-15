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
  const field =
    "h-11 rounded-md border border-line bg-white px-3 text-base text-ink placeholder:text-muted hover:border-steel";

  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="search" className="text-sm font-medium">
          Search by name
        </label>
        <input
          id="search"
          type="search"
          value={search}
          placeholder="Search participant name..."
          onChange={(e) => onSearchChange(e.target.value)}
          className={`${field} w-72`}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="type" className="text-sm font-medium">
          Registration type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          className={field}
        >
          <option value="">All types</option>
          <option value="Exhibitor">Exhibitor</option>
          <option value="Competitor">Competitor</option>
          <option value="VIP">VIP</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className={field}
        >
          <option value="">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="CheckedIn">Checked in</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="h-11 rounded-md border border-line bg-white px-4 text-base font-medium hover:bg-tint"
      >
        Clear filters
      </button>
    </div>
  );
}
