interface KpiCardProps {
  label: string;
  hint: string;
  value: string;
  loading?: boolean;
  className?: string;
}

export default function KpiCard({
  label,
  hint,
  value,
  loading = false,
  className = "",
}: KpiCardProps) {
  return (
    <div className={`bg-white px-5 py-4 ${className}`}>
      <p className="text-base font-medium">{label}</p>

      {loading ? (
        <div className="my-2 h-8 w-24 animate-pulse rounded bg-line" />
      ) : (
        <p className="my-1 whitespace-nowrap text-3xl font-semibold tabular-nums">
          {value}
        </p>
      )}

      <p className="text-sm text-muted">{hint}</p>
    </div>
  );
}