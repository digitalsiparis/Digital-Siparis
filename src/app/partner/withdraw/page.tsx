// === src/app/partner/withdraw/page.tsx ===
"use client";
import PageHeader from "../(shared)/components/PageHeader";


export default function Page() {
return (
<section className="p-6 space-y-6">
<PageHeader title="Para Çekme" subtitle="Bakiyenizi görüntüleyin ve çekim talep edin" />
<div className="grid gap-4 sm:grid-cols-3">
<div className="rounded-2xl ring-1 ring-slate-200 bg-white p-5">
<div className="text-xs text-slate-500">Bakiye</div>
<div className="text-2xl font-semibold mt-1">₺ 12.430,00</div>
</div>
<div className="rounded-2xl ring-1 ring-slate-200 bg-white p-5">
<div className="text-xs text-slate-500">Bekleyen</div>
<div className="text-2xl font-semibold mt-1">₺ 2.150,00</div>
</div>
<div className="rounded-2xl ring-1 ring-slate-200 bg-white p-5">
<div className="text-xs text-slate-500">Son Ödeme</div>
<div className="text-2xl font-semibold mt-1">₺ 4.000,00</div>
</div>
</div>


<form className="rounded-2xl ring-1 ring-slate-200 bg-white p-5 grid gap-3 max-w-lg">
<label className="text-sm">Tutar
<input type="number" step="0.01" placeholder="0,00" className="mt-1 w-full px-3 py-2 rounded-xl ring-1 ring-slate-200" />
</label>
<label className="text-sm">IBAN
<input placeholder="TR.." className="mt-1 w-full px-3 py-2 rounded-xl ring-1 ring-slate-200" />
</label>
<button className="mt-2 px-4 py-2 rounded-xl bg-slate-900 text-white w-max">Çekim Talebi Gönder</button>
</form>
</section>
);
}
