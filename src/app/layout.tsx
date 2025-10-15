import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Sipariş — Shop",
  description: "Müşteri tarafı mağaza arayüzü",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-6">
              <Link href="/" className="text-xl font-semibold">Digital Sipariş</Link>
              <nav className="ml-auto flex items-center gap-4 text-sm">
                <Link href="/" className="hover:text-blue-600">Ana Sayfa</Link>
                <Link href="/products/example-urun" className="hover:text-blue-600">Ürünler</Link>
                <Link href="/vendors/ornek-marka" className="hover:text-blue-600">Markalar</Link>
                <Link href="/cart" className="hover:text-blue-600">Sepet</Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto w-full max-w-6xl px-4 py-8 flex-1">{children}</main>
          <footer className="border-t bg-slate-50">
            <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500">
              © {new Date().getFullYear()} Digital Sipariş
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
