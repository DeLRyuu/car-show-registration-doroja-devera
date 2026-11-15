import KpiCard from "./KpiCard";
import { formatCurrency } from "../utils/format";
import type { Summary } from "../types/registration";

interface KpiCardsProps {
  summary: Summary | null;
  loading: boolean;
}

export default function KpiCards({ summary, loading }: KpiCardsProps) {
  return (
    <section
      aria-label="Summary"
      className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-5"
    >
      <KpiCard
        label="Total registrations"
        loading={loading}
        value={summary ? String(summary.totalRegistrations) : ""}
      />
      <KpiCard
        label="Total payments"
        loading={loading}
        value={summary ? formatCurrency(summary.totalPayments) : ""}
      />
      <KpiCard
        label="Uncollected payments"
        loading={loading}
        value={summary ? formatCurrency(summary.uncollectedPayments) : ""}
      />
      <KpiCard
        label="Confirmed"
        loading={loading}
        value={summary ? String(summary.confirmed) : ""}
      />
      <KpiCard
        label="Checked in"
        loading={loading}
        className="col-span-2 lg:col-span-1"
        value={summary ? String(summary.checkedIn) : ""}
      />
    </section>
  );
}
