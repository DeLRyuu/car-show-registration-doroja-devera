import { useEffect, useState } from "react";
import KpiCards from "../components/KpiCards";
import RegistrationTable from "../components/RegistrationTable";
import { getRegistrations, getSummary } from "../api/sampleData";
import type {
  Registration,
  RegistrationFilters,
  Summary,
} from "../types/registration";

export default function RegistrationsPage() {
  // KPI cards
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);

  // Table
  const [filters] = useState<RegistrationFilters>({
    participantName: "",
    type: "",
    status: "",
    page: 1,
    pageSize: 10,
  });
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loadingTable, setLoadingTable] = useState(true);

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

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-bold text-blue-700">Car Show 2027</h1>
        <p className="text-sm text-slate-600">Registration Dashboard</p>
      </header>

      <KpiCards summary={summary} loading={loadingSummary} />

      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <h2 className="border-b border-slate-200 px-4 py-3 text-lg font-semibold text-slate-900">
          Registrations
        </h2>

        {loadingTable ? (
          <p className="px-4 py-8 text-center text-slate-600">
            Loading registrations…
          </p>
        ) : (
          <RegistrationTable registrations={registrations} />
        )}
      </section>
    </div>
  );
}