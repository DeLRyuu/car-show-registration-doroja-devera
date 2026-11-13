import type { PaymentStatus } from "../types/registration";

const styles: Record<PaymentStatus, string> = {
  Unpaid: "bg-red-100 text-red-800 ring-red-300",
  Partial: "bg-amber-100 text-amber-800 ring-amber-300",
  Paid: "bg-green-100 text-green-800 ring-green-300",
};

export default function PaymentBadge({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      {status}
    </span>
  );
}