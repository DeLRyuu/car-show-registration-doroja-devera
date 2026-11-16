import PaymentBadge from "./PaymentBadge";
import StatusBadge from "./StatusBadge";
import { formatCurrency, formatDate } from "../utils/format";
import type { Registration } from "../types/registration";

interface RegistrationTableProps {
  registrations: Registration[];
}

export default function RegistrationTable({
  registrations,
}: RegistrationTableProps) {
  const th = "px-4 py-3 text-sm font-medium text-muted";

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="border-b border-line bg-paper/60">
          <tr>
            <th scope="col" className={th}>Reg. no.</th>
            <th scope="col" className={th}>Date</th>
            <th scope="col" className={th}>Participant</th>
            <th scope="col" className={th}>Car</th>
            <th scope="col" className={th}>Type</th>
            <th scope="col" className={th}>Status</th>
            <th scope="col" className={`${th} text-right`}>Fee / paid</th>
            <th scope="col" className={th}>Payment</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-line">
          {registrations.map((r) => (
            <tr key={r.id} className="hover:bg-tint/50">
              <td className="whitespace-nowrap px-4 py-4 font-medium tabular-nums">
                {r.registrationNumber}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-muted">
                {formatDate(r.registrationDate)}
              </td>
              <td className="px-4 py-4">
                <div className="font-medium">{r.participantName}</div>
                <div className="text-sm text-muted">{r.contactNumber}</div>
              </td>
              <td className="px-4 py-4">
                <div>{r.carMakeModel}</div>
                <span className="mt-1 inline-block rounded border-2 border-ink bg-white px-1.5 text-sm font-semibold uppercase tracking-wider">
                  {r.plateNumber}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-4">
                {r.registrationType}
              </td>
              <td className="whitespace-nowrap px-4 py-4">
                <StatusBadge status={r.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-right tabular-nums">
                <div>{formatCurrency(r.registrationFee)}</div>
                <div className="text-sm text-muted">
                  {formatCurrency(r.amountPaid)} paid
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-4">
                <PaymentBadge status={r.paymentStatus} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
