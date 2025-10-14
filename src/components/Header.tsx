"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();
  const Nav = ({href,label}:{href:string,label:string}) => (
    <Link href={href} className={`px-3 py-2 rounded-md ${path===href?"bg-slate-900 text-white":"text-slate-700 hover:bg-slate-100"}`}>{label}</Link>
  );
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">Digital Sipariş</Link>
        <nav className="flex gap-2">
          <Nav href="/" label="Ana Sayfa" />
          <Nav href="/cart" label="Sepet" />
        </nav>
      </div>
    </header>
  );
}
