import { useEffect, useState } from "react";
import KpiCards from "../components/KpiCards";
import { getSummary } from "../api/sampleData";
import type { Summary } from "../types/registration";

export default function RegistrationsPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);

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

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-bold text-blue-700">Car Show 2027</h1>
        <p className="text-sm text-slate-600">Registration Dashboard</p>
      </header>

      <KpiCards summary={summary} loading={loadingSummary} />
    </div>
  );
}