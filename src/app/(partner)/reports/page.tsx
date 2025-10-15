// === src/app/partner/reports/page.tsx ===
"use client";
import PageHeader from "../(shared)/components/PageHeader";
import { KpiCard } from "../(shared)/components/KpiCard";


export default function Page() {
const kpis = [
{ label: "Aylık Ciro", value: "₺ 84.320" },
{ label: "Komisyon (Aylık)", value: "₺ 6.740" },
{ label: "İade Oranı", value: "%1.8" },
{ label: "Sepet Ortalaması", value: "₺ 724" },
];
return (
<section className="p-6 space-y-6">
<PageHeader title="Raporlar" subtitle="Gelir, komisyon ve trendler" />
<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
{kpis.map(k => <KpiCard key={k.label} {...k} />)}
</div>
<div className="rounded-2xl ring-1 ring-slate-200 bg-white p-5">
<div className="text-sm font-medium mb-2">Satış Trendi (Son 8 Hafta)</div>
<div className="h-32 grid place-items-center text-slate-500 text-sm">(Chart placeholder — Recharts / Chart.js bağlanacak)</div>
</div>
</section>
);
}