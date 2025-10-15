// === src/app/partner/status/page.tsx ===
"use client";
import PageHeader from "../(shared)/components/PageHeader";
import { KpiCard } from "../(shared)/components/KpiCard";
import { Activity, ShoppingCart, RotateCcw, Star } from "lucide-react";


export default function Page() {
const kpis = [
{ label: "Son 30 gün sipariş", value: 31, hint: "+12%" },
{ label: "Bekleyen sipariş", value: 8 },
{ label: "İade talepleri", value: 2 },
{ label: "Mağaza puanı", value: "4.8/5" },
];
const timeline = [
{ icon: ShoppingCart, text: "#1123 siparişi ödendi", at: "2 dk önce" },
{ icon: Activity, text: "Kargo SLA hedefi güncellendi", at: "1 saat önce" },
{ icon: RotateCcw, text: "#1098 iade talebi açıldı", at: "Dün" },
{ icon: Star, text: "Yeni 5★ yorum", at: "2 gün önce" },
];
return (
<section className="p-6 space-y-6">
<PageHeader title="Güncel Durum" subtitle="Hızlı özet ve son hareketler" />
<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
{kpis.map((k) => (
<KpiCard key={k.label} {...k} />
))}
</div>
<div className="rounded-2xl bg-white ring-1 ring-slate-200 p-5">
<div className="text-sm font-medium mb-3">Son hareketler</div>
<ol className="space-y-3">
{timeline.map((t) => (
<li key={t.text} className="flex items-center gap-3 text-sm">
<t.icon className="w-4 h-4 text-slate-500" />
<span className="flex-1 text-slate-700">{t.text}</span>
<span className="text-slate-500">{t.at}</span>
</li>
))}
</ol>
</div>
</section>
);
}