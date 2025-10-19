// src/app/(partner)/orders/page.tsx
"use client";
import Link from "next/link";
import PageHeader from "../(shared)/components/PageHeader";
import { SimpleTable } from "../(shared)/components/Table";

const orders = [
  { no: "#1123", customer: "Ayşe Y.",   total: 749.9,  status: "processing" },
  { no: "#1122", customer: "Mehmet K.", total: 1299.0, status: "completed" },
  { no: "#1121", customer: "Zeynep T.", total: 299.0,  status: "pending" },
];

export default function Page() {
  const tabs = [
    { key: "all", label: "Tümü" },
    { key: "pending", label: "Bekleyen" },
    { key: "processing", label: "Hazırlanıyor" },
    { key: "completed", label: "Tamamlandı" },
  ];
  return (
    <section className="p-6 space-y-6">
      <PageHeader title="Siparişler" subtitle="Son sipariş hareketleri ve durum" />
      <div className="flex items-center gap-2 flex-wrap">
        {tabs.map(t => (
          <Link key={t.key} href={`/partner/orders?tab=${t.key}`} className="text-sm px-3 py-1.5 rounded-xl ring-1 ring-slate-200 bg-white">
            {t.label}
          </Link>
        ))}
      </div>
      <SimpleTable
        head={["Sipariş No", "Müşteri", "Tutar", "Durum", "İşlem"]}
        rows={orders.map((o) => [
          <Link key={`${o.no}-no`} href={`/orders/${o.no.substring(1)}`} className="text-blue-600 underline">
            {o.no}
          </Link>,
          <span key={`${o.no}-cust`}>{o.customer}</span>,
          <span key={`${o.no}-total`}>
            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(o.total)}
          </span>,
          <span key={`${o.no}-status`} className="text-xs px-2 py-1 rounded-lg ring-1 ring-slate-200">{o.status}</span>,
          <Link key={`${o.no}-detail`} href={`/partner/orders/${o.no.substring(1)}`} className="text-slate-700">Detay</Link>,
        ])}
      />
    </section>
  );
}
