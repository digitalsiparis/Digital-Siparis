// src/app/(partner)/products/page.tsx
"use client";
import Link from "next/link";
import PageHeader from "../(shared)/components/PageHeader";
import { SimpleTable } from "../(shared)/components/Table";

const rows = [
  { sku: "DS-1001", name: "Akıllı Saat X",   price: 1299.9,  stock: 24, status: "Yayında" },
  { sku: "DS-1002", name: "Kulaklık Pro",    price: 899.0,   stock: 12, status: "Taslak" },
  { sku: "DS-1003", name: 'Laptop 14"',      price: 15499.0, stock: 5,  status: "Yayında" },
];

export default function Page() {
  return (
    <section className="p-6 space-y-6">
      <PageHeader
        title="Ürünler"
        subtitle="Ürünlerinizi yönetin"
        actions={<Link href="/products/new" className="px-3 py-2 rounded-xl bg-slate-900 text-white">Yeni Ürün</Link>}
      />
      <div className="flex items-center gap-2">
        <input placeholder="SKU / ad" className="px-3 py-2 rounded-xl ring-1 ring-slate-200 w-64" />
        <select className="px-3 py-2 rounded-xl ring-1 ring-slate-200">
          <option>Tümü</option>
          <option>Yayında</option>
          <option>Taslak</option>
        </select>
      </div>
      <SimpleTable
        head={["SKU", "Ürün", "Fiyat", "Stok", "Durum", "İşlem"]}
        rows={rows.map((r) => [
          <span key={`${r.sku}-sku`}>{r.sku}</span>,
          <Link key={`${r.sku}-name`} href={`/products/${r.sku}`} className="text-blue-600 underline">
            {r.name}
          </Link>,
          <span key={`${r.sku}-price`}>
            {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(r.price)}
          </span>,
          <span key={`${r.sku}-stock`}>{r.stock}</span>,
          <span key={`${r.sku}-status`} className="text-xs px-2 py-1 rounded-lg ring-1 ring-slate-200">
            {r.status}
          </span>,
          <Link key={`${r.sku}-edit`} href={`/partner/products/${r.sku}`} className="text-slate-700">Düzenle</Link>,
        ])}
      />
    </section>
  );
}
