import KpiCard from "./KpiCard";
import { formatCurrency } from "../utils/format";
import type { Summary } from "../types/registration";

interface KpiCardsProps {
  summary: Summary | null;
  loading: boolean;
}

export default function KpiCards({ summary, loading }: KpiCardsProps) {
  return (
    <section aria-label="Summary" className="flex flex-wrap gap-4">
      <KpiCard
        label="Total Registrations"
        icon="📋"
        loading={loading}
        value={summary ? String(summary.totalRegistrations) : ""}
      />
      <KpiCard
        label="Total Payments"
        icon="💰"
        loading={loading}
        value={summary ? formatCurrency(summary.totalPayments) : ""}
      />
      <KpiCard
        label="Uncollected Payments"
        icon="⏳"
        loading={loading}
        value={summary ? formatCurrency(summary.uncollectedPayments) : ""}
      />
      <KpiCard
        label="Confirmed"
        icon="✅"
        loading={loading}
        value={summary ? String(summary.confirmed) : ""}
      />
      <KpiCard
        label="Checked In"
        icon="🚗"
        loading={loading}
        value={summary ? String(summary.checkedIn) : ""}
      />
    </section>
  );
}