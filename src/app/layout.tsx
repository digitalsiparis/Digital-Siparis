import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Sipariş",
  description: "Multi-vendor e-ticaret platformu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
            <div className="font-semibold">Digital Sipariş</div>
            <nav className="flex gap-4 text-sm">
              <a href="/" className="hover:underline">Ana Sayfa</a>
              <a href="/vendors" className="hover:underline">Satıcılar</a>
              <a href="/dashboard" className="hover:underline">Panel</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
        <footer className="border-t py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Digital Sipariş
        </footer>
      </body>
    </html>
  );
}
