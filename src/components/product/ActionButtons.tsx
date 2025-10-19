"use client";

export default function ActionButtons({ onBuyNow, onAdd }: {
  onBuyNow?: ()=>void; onAdd?: ()=>void;
}) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      <button onClick={onBuyNow}
        className="h-12 rounded-2xl border bg-white font-semibold hover:shadow-sm">Şimdi Al</button>
      <button onClick={onAdd}
        className="h-12 rounded-2xl bg-amber-600 text-white font-semibold hover:bg-amber-700">Sepete Ekle</button>
    </div>
  );
}
