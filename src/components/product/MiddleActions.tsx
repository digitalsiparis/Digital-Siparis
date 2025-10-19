"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Attribute = { key: string; value: string };
type Props = {
  productId: number;
  /** Varyantlı ürünlerde kullanmak üzere opsiyonel. */
  variationId?: number;
  attributes?: Attribute[]; // örn: [{ key: "attribute_pa_color", value: "siyah" }]
};

export default function MiddleActions({ productId, variationId, attributes }: Props) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 2500);
    return () => clearTimeout(t);
  }, [message]);

  async function ensureCartSession() {
    // Woo session/cookie başlat
    await fetch("/api/cart", { credentials: "include", cache: "no-store" });
  }

  async function addToCart() {
    setIsAdding(true);
    try {
      await ensureCartSession();

      const payload: any = { id: productId, quantity: qty };
      if (variationId) payload.variation = variationId;
      if (attributes?.length) payload.attributes = attributes;

      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      // Bazı WP kurulumları JSON dışında HTML döndürebilir
      const text = await res.text();
      let data: any;
      try { data = JSON.parse(text); } catch { data = { raw: text }; }

      if (!res.ok || data?.error || data?.code) {
        throw new Error(data?.message || data?.error || "Sepete eklenemedi");
      }

      setMessage("Sepete eklendi!");
      // Header’daki sayaç ve diğer dinleyiciler için event
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("ds-cart-updated"));
      }
      return true;
    } catch (err: any) {
      setMessage(err?.message || "Sepete eklenemedi");
      return false;
    } finally {
      setIsAdding(false);
    }
  }

  async function handleAdd() {
    // Çift tıklama / spam koruması
    if (isAdding) return;
    await addToCart();
  }

  async function handleBuyNow() {
    if (isAdding) return;
    const ok = await addToCart();
    if (ok) router.push("/shop/cart");
  }

  return (
    <div className="rounded-2xl border bg-white p-4 space-y-3">
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-600">Adet</label>
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          className="w-16 rounded-lg border px-2 py-1"
          inputMode="numeric"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          disabled={isAdding}
          className="flex-1 rounded-xl bg-amber-500 text-white font-semibold px-4 py-3 hover:bg-amber-600 transition disabled:opacity-60"
        >
          {isAdding ? "Ekleniyor..." : "Sepete Ekle"}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={isAdding}
          className="flex-1 rounded-xl border px-4 py-3 font-semibold hover:bg-slate-50 transition disabled:opacity-60"
        >
          Şimdi Al
        </button>
      </div>

      {message && (
        <div
          className={`text-sm rounded-lg px-3 py-2 ${
            message.includes("eklendi")
              ? "text-emerald-700 bg-emerald-50"
              : "text-rose-700 bg-rose-50"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
