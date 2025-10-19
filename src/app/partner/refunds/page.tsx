// src/app/(partner)/refunds/page.tsx
"use client";
import PageHeader from "../(shared)/components/PageHeader";
import { SimpleTable } from "../(shared)/components/Table";

const items = [
  { id: "R-342", order: "#1098", reason: "Ürün arızalı",  status: "İncelemede" },
  { id: "R-343", order: "#1101", reason: "Yanlış ürün",   status: "Onaylandı" },
];

export default function Page() {
  return (
    <section className="p-6 space-y-6">
      <PageHeader title="İptal / İade" subtitle="Müşteri talepleri ve kararlar" />
      <SimpleTable
        head={["Talep No", "Sipariş", "Sebep", "Durum", "İşlem"]}
        rows={items.map(i => [
          <span key={`${i.id}-id`}>{i.id}</span>,
          <span key={`${i.id}-order`}>{i.order}</span>,
          <span key={`${i.id}-reason`}>{i.reason}</span>,
          <span key={`${i.id}-status`} className="text-xs px-2 py-1 rounded-lg ring-1 ring-slate-200">{i.status}</span>,
          <button key={`${i.id}-btn`} className="text-slate-700">Detay</button>,
        ])}
      />
    </section>
  );
}
