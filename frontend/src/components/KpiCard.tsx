interface KpiCardProps {
  label: string;
  value: string;
  icon: string;
  loading?: boolean;
}

export default function KpiCard({
  label,
  value,
  icon,
  loading = false,
}: KpiCardProps) {
  return (
    <div className="min-w-[200px] flex-1 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between text-sm font-medium text-slate-600">
        <span>{label}</span>
        <span aria-hidden="true" className="text-xl">
          {icon}
        </span>
      </div>

      {loading ? (
        <div className="mt-3 h-8 w-24 animate-pulse rounded bg-slate-200" />
      ) : (
        <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      )}
    </div>
  );
}
