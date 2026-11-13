import { useEffect, useMemo, useState } from "react";
import KpiCards from "../components/KpiCards";
import RegistrationFilters from "../components/RegistrationFilters";
import RegistrationTable from "../components/RegistrationTable";
import useDebounce from "../hooks/useDebounce";
import { getRegistrations, getSummary } from "../api/sampleData";
import type { Registration, Summary } from "../types/registration";

const PAGE_SIZE = 10;

export default function RegistrationsPage() {
  // KPI cards
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  // Waits 400 ms after the user stops typing
  const debouncedSearch = useDebounce(search, 400);

  // Table
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loadingTable, setLoadingTable] = useState(true);

  const filters = useMemo(
    () => ({
      participantName: debouncedSearch,
      type,
      status,
      page,
      pageSize: PAGE_SIZE,
    }),
    [debouncedSearch, type, status, page],
  );

  useEffect(() => {
    let ignore = false;

    getSummary()
      .then((data) => {
        if (!ignore) setSummary(data);
      })
      .finally(() => {
        if (!ignore) setLoadingSummary(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    setLoadingTable(true);

    getRegistrations(filters)
      .then((data) => {
        if (!ignore) setRegistrations(data.items);
      })
      .finally(() => {
        if (!ignore) setLoadingTable(false);
      });

    return () => {
      ignore = true;
    };
  }, [filters]);

  // Changing any filter goes back to page 1
  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleTypeChange(value: string) {
    setType(value);
    setPage(1);
  }

  function handleStatusChange(value: string) {
    setStatus(value);
    setPage(1);
  }

  function handleClear() {
    setSearch("");
    setType("");
    setStatus("");
    setPage(1);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-bold text-blue-700">Car Show 2027</h1>
        <p className="text-sm text-slate-600">Registration Dashboard</p>
      </header>

      <KpiCards summary={summary} loading={loadingSummary} />

      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="space-y-4 border-b border-slate-200 p-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Registrations
          </h2>
          <RegistrationFilters
            search={search}
            type={type}
            status={status}
            onSearchChange={handleSearchChange}
            onTypeChange={handleTypeChange}
            onStatusChange={handleStatusChange}
            onClear={handleClear}
          />
        </div>

        {loadingTable ? (
          <p className="px-4 py-8 text-center text-slate-600">
            Loading registrations…
          </p>
        ) : registrations.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-slate-700">
              No registrations match your filters.
            </p>
            <button
              type="button"
              onClick={handleClear}
              className="mt-3 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <RegistrationTable registrations={registrations} />
        )}
      </section>
    </div>
  );
}