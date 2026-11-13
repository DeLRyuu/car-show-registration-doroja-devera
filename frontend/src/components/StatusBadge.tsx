import type { RegistrationStatus } from "../types/registration";

const styles: Record<RegistrationStatus, string> = {
  Pending: "bg-slate-100 text-slate-700 ring-slate-300",
  Confirmed: "bg-blue-100 text-blue-800 ring-blue-300",
  CheckedIn: "bg-teal-100 text-teal-800 ring-teal-300",
  Cancelled: "bg-rose-100 text-rose-800 ring-rose-300",
};

const labels: Record<RegistrationStatus, string> = {
  Pending: "Pending",
  Confirmed: "Confirmed",
  CheckedIn: "Checked In",
  Cancelled: "Cancelled",
};

export default function StatusBadge({ status }: { status: RegistrationStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}