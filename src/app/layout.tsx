import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: { default: "Digital Sipariş", template: "%s — Digital Sipariş" },
  description: "Digital Sipariş mağaza arayüzü",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 lg:px-6">
            {children}
          </main>

          <footer className="border-t bg-white">
            <div className="mx-auto w-full max-w-7xl px-4 py-6 text-xs text-slate-500 flex items-center justify-between">
              <span>© {new Date().getFullYear()} Digital Sipariş</span>
              <span className="inline-flex items-center gap-1">
                <Sparkles className="size-4" />
                Modern e-ticaret arayüzü
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
