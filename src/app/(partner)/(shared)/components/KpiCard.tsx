// === src/app/partner/(shared)/components/KpiCard.tsx ===
export function KpiCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
return (
<div className="rounded-2xl bg-white ring-1 ring-slate-200 p-5 shadow-sm">
<div className="text-xs text-slate-500">{label}</div>
<div className="text-2xl font-semibold mt-1">{value}</div>
{hint && <div className="text-xs text-slate-500 mt-1">{hint}</div>}
</div>
);
}