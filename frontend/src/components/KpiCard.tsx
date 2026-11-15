interface KpiCardProps {
  label: string;
  value: string;
  loading?: boolean;
  className?: string;
}

export default function KpiCard({
  label,
  value,
  loading = false,
  className = "",
}: KpiCardProps) {
  return (
    <div className={`bg-white px-5 py-4 ${className}`}>
      <p className="text-base font-medium">{label}</p>

      {loading ? (
        <div className="mt-2 h-8 w-24 animate-pulse rounded bg-line" />
      ) : (
        <p className="mt-1 whitespace-nowrap text-3xl font-semibold tabular-nums">
          {value}
        </p>
      )}
    </div>
  );
}
