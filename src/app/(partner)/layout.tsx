import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";

export const metadata: Metadata = {
  title: "Digital Sipariş — Partner",
  description: "Satıcı paneli",
};

const Nav = () => (
  <aside className="hidden md:block w-64 shrink-0 border-r bg-white/60 backdrop-blur sticky top-0 h-screen p-4">
    <div className="text-lg font-semibold mb-4">Satıcı Paneli</div>
    <nav className="space-y-1 text-sm">
      <Link className="block rounded px-3 py-2 hover:bg-slate-100" href="/dashboard">Gösterge Paneli</Link>
      <Link className="block rounded px-3 py-2 hover:bg-slate-100" href="/orders">Siparişler</Link>
      <Link className="block rounded px-3 py-2 hover:bg-slate-100" href="/products/new">Ürün Ekle</Link>
    </nav>
  </aside>
);

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
          <Link href="/" className="text-xl font-semibold">Digital Sipariş</Link>
          <span className="text-sm text-slate-500">Partner</span>
          <div className="ml-auto text-sm text-slate-500">Hoş geldiniz</div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto flex">
        <Nav />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
