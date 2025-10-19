"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CartItem = {
  key?: string;
  id?: number | string;
  name: string;
  quantity: number;
  images?: { src?: string; thumbnail?: { src?: string } }[];
  image?: { src?: string };
  variation?: string;
  totals?: { line_total?: number };     // bazı sürümler
  prices?: { price?: number };          // bazı sürümler (cent)
  price?: number;
};

export default function CartPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<CartItem[]>([]);

  async function loadCart() {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", { cache: "no-store", credentials: "include" });
      const data = await res.json();
      const list: CartItem[] = data?.items || data?.cartItems || [];
      setItems(Array.isArray(list) ? list : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
    const onUpd = () => loadCart();
    window.addEventListener("ds-cart-updated", onUpd);
    return () => window.removeEventListener("ds-cart-updated", onUpd);
  }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Sepet</h1>

      {loading ? (
        <p className="text-slate-600 text-sm">Yükleniyor…</p>
      ) : !items.length ? (
        <p className="text-slate-600 text-sm">
          Sepetin boş görünüyor.{" "}
          <Link href="/shop" className="text-amber-600 underline">Alışverişe devam et</Link>
        </p>
      ) : (
        <div className="rounded-2xl border bg-white divide-y">
          {items.map((it) => {
            const key = it.key || String(it.id);
            const thumb =
              it.images?.[0]?.thumbnail?.src ||
              it.images?.[0]?.src ||
              it.image?.src ||
              undefined;
            const rawPrice =
              (it.totals?.line_total ?? it.prices?.price ?? it.price) ?? 0;
            const price =
              typeof rawPrice === "number" && rawPrice > 1000
                ? (rawPrice / 100).toFixed(2) // cents → tl
                : Number(rawPrice).toFixed(2);

            return (
              <div key={key} className="p-4 flex gap-3 items-center">
                {thumb ? (
                  <img src={thumb} alt={it.name} className="w-14 h-14 rounded-lg object-cover" />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-slate-100" />
                )}

                <div className="flex-1">
                  <div className="font-medium">{it.name}</div>
                  {it.variation && (
                    <div className="text-xs text-slate-500">{it.variation}</div>
                  )}
                  <div className="text-sm text-slate-600">Adet: {it.quantity}</div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">{price} ₺</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
