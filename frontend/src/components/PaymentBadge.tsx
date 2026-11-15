import type { PaymentStatus } from "../types/registration";

const styles: Record<PaymentStatus, string> = {
  Unpaid: "bg-red-50 text-red-900 ring-red-200",
  Partial: "bg-amber-50 text-amber-900 ring-amber-300",
  Paid: "bg-green-50 text-green-900 ring-green-200",
};

export default function PaymentBadge({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ${styles[status]}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
