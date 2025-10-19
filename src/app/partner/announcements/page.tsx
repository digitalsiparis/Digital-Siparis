// === src/app/partner/announcements/page.tsx ===
"use client";
import PageHeader from "../(shared)/components/PageHeader";


const posts = [
{ id: 1, title: "Kargo SLA Güncellemesi", body: "Yurtiçi şube kesinti duyurusu ve alternatif hat." },
{ id: 2, title: "Komisyon Kampanyası", body: "%5 erken dönem avantajı 31 Aralık'a uzatıldı." },
];


export default function Page() {
return (
<section className="p-6 space-y-6">
<PageHeader title="Duyurular" subtitle="Platform güncellemeleri ve bilgilendirmeler" />
<div className="grid gap-3 sm:grid-cols-2">
{posts.map(p => (
<article key={p.id} className="rounded-2xl ring-1 ring-slate-200 bg-white p-5">
<h3 className="font-medium">{p.title}</h3>
<p className="text-sm text-slate-600 mt-1">{p.body}</p>
</article>
))}
</div>
</section>
);
}
