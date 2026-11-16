import { useEffect, useMemo, useState } from "react";
import KpiCards from "../components/KpiCards";
import Pagination from "../components/Pagination";
import RegistrationFilters from "../components/RegistrationFilters";
import RegistrationTable from "../components/RegistrationTable";
import TableSkeleton from "../components/TableSkeleton";
import useDebounce from "../hooks/useDebounce";
import { getRegistrations, getSummary } from "../api/registrationsApi";
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

  const primaryButton =
    "mt-4 h-11 rounded-md bg-steel px-5 text-base font-medium text-white hover:bg-steel-dark";

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-6 py-8">
      <KpiCards summary={summary} loading={loadingSummary} />

      <section className="rounded-lg border border-line bg-white">
        <div className="space-y-4 border-b border-line p-5">
          <div>
            <h2 className="text-xl font-semibold">Registrations</h2>
          </div>
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
          <TableSkeleton />
        ) : error ? (
          <div role="alert" className="px-6 py-12 text-center">
            <p className="text-lg font-medium text-red-800">
              Cannot reach the API.
            </p>
            <p className="mt-1 text-base text-muted">
              Check that the backend is running, then try again.
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className={primaryButton}
            >
              Try again
            </button>
          </div>
        ) : registrations.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-lg font-medium">
              No registrations match your filters.
            </p>
            <p className="mt-1 text-base text-muted">
              Try a different name, or clear the filters to see everyone.
            </p>
            <button
              type="button"
              onClick={handleClear}
              className={primaryButton}
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
    </main>
  );
}


