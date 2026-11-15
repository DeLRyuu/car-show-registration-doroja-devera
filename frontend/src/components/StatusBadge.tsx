import type { RegistrationStatus } from "../types/registration";

const styles: Record<RegistrationStatus, string> = {
  Pending: "bg-slate-100 text-slate-800 ring-slate-300",
  Confirmed: "bg-blue-50 text-blue-900 ring-blue-200",
  CheckedIn: "bg-teal-50 text-teal-900 ring-teal-200",
  Cancelled: "bg-rose-50 text-rose-900 ring-rose-200",
};

const labels: Record<RegistrationStatus, string> = {
  Pending: "Pending",
  Confirmed: "Confirmed",
  CheckedIn: "Checked in",
  Cancelled: "Cancelled",
};

export default function StatusBadge({ status }: { status: RegistrationStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ${styles[status]}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {labels[status]}
    </span>
  );
}
