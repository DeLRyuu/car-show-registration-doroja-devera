import { useEffect, useMemo, useState } from "react";
import KpiCards from "../components/KpiCards";
import Pagination from "../components/Pagination";
import RegistrationFilters from "../components/RegistrationFilters";
import RegistrationTable from "../components/RegistrationTable";
import useDebounce from "../hooks/useDebounce";
import { getRegistrations, getSummary } from "../api/sampleData";
import type { Registration, Summary } from "../types/registration";

export default function RegistrationsPage() {
  // KPI cards
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);

  // Filters and page
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Waits 400 ms after the user stops typing
  const debouncedSearch = useDebounce(search, 400);

  // Table
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingTable, setLoadingTable] = useState(true);

  // Error and "Try again"
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const filters = useMemo(
    () => ({
      participantName: debouncedSearch,
      type,
      status,
      page,
      pageSize,
    }),
    [debouncedSearch, type, status, page, pageSize],
  );

  useEffect(() => {
    let ignore = false;
    setLoadingSummary(true);

    getSummary()
      .then((data) => {
        if (!ignore) setSummary(data);
      })
      .catch(() => {
        if (!ignore) setError(true);
      })
      .finally(() => {
        if (!ignore) setLoadingSummary(false);
      });

    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  useEffect(() => {
    let ignore = false;
    setLoadingTable(true);
    setError(false);

    getRegistrations(filters)
      .then((data) => {
        if (ignore) return;
        setRegistrations(data.items);
        setTotalCount(data.totalCount);
        setTotalPages(data.totalPages);
      })
      .catch(() => {
        if (!ignore) setError(true);
      })
      .finally(() => {
        if (!ignore) setLoadingTable(false);
      });

    return () => {
      ignore = true;
    };
  }, [filters, reloadKey]);

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

  function handlePageSizeChange(size: number) {
    setPageSize(size);
    setPage(1);
  }

  function handleClear() {
    setSearch("");
    setType("");
    setStatus("");
    setPage(1);
  }

  function handleRetry() {
    setReloadKey((key) => key + 1);
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
        ) : error ? (
          <div role="alert" className="px-4 py-8 text-center">
            <p className="font-medium text-red-700">
              Cannot reach the API. Please check that the backend is running.
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-3 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Try again
            </button>
          </div>
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

        {totalCount > 0 && !error && (
          <Pagination
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
            totalPages={totalPages}
            loading={loadingTable}
            onPageChange={setPage}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </section>
    </div>
  );
}