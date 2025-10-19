// src/components/product/BundleBox.tsx
"use client";

import Image from "next/image";
import { useTransition } from "react";
import { addToCart } from "@/lib/cart";
import type { Bundle } from "@/lib/bundle";

function fmt(n: number) {
  return n.toLocaleString("tr-TR") + " TL";
}

export default function BundleBox({ bundle }: { bundle?: Bundle }) {
  const [pending, start] = useTransition();

  // Güvenlik: bundle veya items yoksa hiç render etme
  const items = bundle?.items ?? [];
  if (!bundle || items.length < 2) return null;

  const [a, b] = items;

  // Total/savingText yoksa hesapla
  const computedTotal = (a.price + b.price - (bundle.save ?? 0));
  const total = typeof bundle.total === "number" ? bundle.total : computedTotal;
  const savingText =
    bundle.savingText ??
    (bundle.save ? `Kazancın: ${bundle.save.toLocaleString("tr-TR")} TL` : undefined);

  const handleAddBoth = () =>
    start(async () => {
      try {
        for (const it of items) {
          await addToCart({
            productId: it.id,
            vendorId: "bundle",
            title: it.title,
            image: it.image,
            price: it.price,
            qty: 1,
          });
        }
        alert("Paket sepete eklendi ✅");
      } catch (err) {
        console.error(err);
        alert("Paket eklenirken bir sorun oluştu.");
      }
    });

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 text-lg font-semibold">Birlikte Al, Daha Az Öde!</div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr]">
        {/* Sol ürün */}
        <div className="flex items-center gap-3">
          <Image
            src={a.image}
            alt={a.title || ""}
            width={90}
            height={90}
            className="rounded-lg ring-1 ring-slate-200 object-cover"
          />
          <div className="text-sm">
            <div className="line-clamp-2">{a.title}</div>
            <div className="font-semibold text-amber-600">{fmt(a.price)}</div>
          </div>
        </div>

        {/* + işareti */}
        <div className="grid place-items-center text-2xl">+</div>

        {/* Sağ ürün */}
        <div className="flex items-center gap-3">
          <Image
            src={b.image}
            alt={b.title || ""}
            width={90}
            height={90}
            className="rounded-lg ring-1 ring-slate-200 object-cover"
          />
          <div className="text-sm">
            <div className="line-clamp-2">{b.title}</div>
            <div className="font-semibold text-amber-600">{fmt(b.price)}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm">
          {savingText && (
            <span className="rounded-md bg-amber-50 px-2 py-1 font-medium text-amber-700 ring-1 ring-amber-200">
              {savingText}
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-3">
          <div className="text-lg font-semibold">{fmt(total)}</div>
          <button
            type="button"
            disabled={pending}
            onClick={handleAddBoth}
            className="rounded-xl bg-amber-600 px-4 py-2 text-white hover:bg-amber-700 disabled:opacity-60"
          >
            {pending ? "Ekleniyor..." : "Birlikte Sepete Ekle"}
          </button>
        </div>
      </div>
    </div>
  );
}
