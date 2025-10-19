"use client";

import { useState } from "react";
import { ShoppingCart, CreditCard, Minus, Plus } from "lucide-react";

export type Offer = {
  vendorId: string;
  vendorName: string;
  vendorScore?: number;      // 9.2 gibi
  price: number;
  shippingBadge?: string;    // "Kargo Bedava"
};

type Props = {
  productId: string | number;
  title: string;
  image: string;
  offers: Offer[];
  /** Eski geriye uyum: */
  onAdd?: (payload: { offer: Offer; qty: number }) => void;

  /** Yeni handler'lar (sayfaya balonlamak için) */
  onAddToCart?: (payload: { offer: Offer; qty: number }) => void;
  onBuyNow?:   (payload: { offer: Offer; qty: number }) => void;

  /** Sağ kutuda butonları gizlemek için */
  showActions?: boolean;

  className?: string;
};

export default function BuyBox({
  productId,
  title,
  image,
  offers,
  onAdd,
  onAddToCart,
  onBuyNow,
  showActions = true,
  className = "",
}: Props) {
  const sorted: Offer[] = (offers?.length
    ? [...offers]
    : [{ vendorId: "v-1", vendorName: "Mağaza", price: 999, shippingBadge: "Kargo Bedava", vendorScore: 9.1 }]
  ).sort((a, b) => a.price - b.price);

  const [selected, setSelected] = useState<Offer>(sorted[0]);
  const [qty, setQty] = useState<number>(1);

  const priceFmt = (n: number) => n.toLocaleString("tr-TR") + " TL";

  const handleAdd = () => {
    const payload = { offer: selected, qty };
    if (onAddToCart) return onAddToCart(payload);
    if (onAdd) return onAdd(payload); // backward-compat
    console.log("add-to-cart (default)", { productId, ...payload });
  };

  const handleBuy = () => {
    const payload = { offer: selected, qty };
    if (onBuyNow) return onBuyNow(payload);
    console.log("buy-now (default)", { productId, ...payload });
  };

  return (
    <aside className={`space-y-3 ${className}`}>
      {/* Üst fiyat kutusu */}
      <div className="rounded-2xl border bg-white p-4">
        <div className="text-3xl font-semibold text-amber-700">{priceFmt(selected.price)}</div>

        {selected.shippingBadge && (
          <div className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
            {selected.shippingBadge}
          </div>
        )}

        {/* Satıcılar */}
        <div className="mt-4 space-y-2">
          <div className="text-sm font-medium">Satıcı</div>
          <div className="space-y-2">
            {sorted.map((o) => (
              <label
                key={o.vendorId}
                className={`flex items-center justify-between gap-3 rounded-xl border p-3 text-sm ${
                  selected.vendorId === o.vendorId ? "ring-2 ring-amber-500" : "bg-white hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="offer"
                    checked={selected.vendorId === o.vendorId}
                    onChange={() => setSelected(o)}
                  />
                  <div className="font-medium">
                    {o.vendorName}
                    {typeof o.vendorScore === "number" && (
                      <span className="ml-1 text-xs text-slate-500">{o.vendorScore.toFixed(1)}</span>
                    )}
                  </div>
                </div>
                <div className="font-semibold">{priceFmt(o.price)}</div>
              </label>
            ))}
          </div>

          {/* Adet */}
          <div className="mt-3 flex items-center gap-2">
            <div className="inline-flex items-center rounded-xl border bg-white">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2" aria-label="Azalt">
                <Minus className="size-4" />
              </button>
              <div className="w-10 text-center">{qty}</div>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2" aria-label="Arttır">
                <Plus className="size-4" />
              </button>
            </div>

            {/* Aksiyon butonları koşullu */}
            {showActions && (
              <>
                <button
                  onClick={handleAdd}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-3 font-medium text-white hover:bg-amber-700"
                >
                  <ShoppingCart className="size-5" />
                  Sepete Ekle
                </button>

                <button
                  onClick={handleBuy}
                  className="rounded-xl border bg-white px-4 py-3 font-medium hover:shadow-sm"
                  title="Şimdi Al"
                >
                  <CreditCard className="mr-2 inline size-5" />
                  Şimdi Al
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Teslimat bilgi bandı */}
      <div className="rounded-2xl border bg-white p-4 text-sm">
        <div className="rounded-xl bg-emerald-50 px-3 py-2 text-emerald-700 ring-1 ring-emerald-200">
          Son 9 saat 24 dakika içinde sipariş verirsen en geç <strong>bugün kargoda!</strong>
        </div>
        <div className="mt-2 text-slate-600">
          Tahmini Teslim: Adresini seç ve zaman teslim edileceğini öğren!
        </div>
      </div>

      {/* Mağaza bilgi kartı */}
      <div className="rounded-2xl border bg-white p-4 text-sm">
        <div className="mb-1 font-medium">Mağaza Bilgisi</div>
        <div className="text-slate-600">
          En iyi fiyatı sunan satıcı: <strong>{sorted[0].vendorName}</strong>
        </div>
      </div>
    </aside>
  );
}
