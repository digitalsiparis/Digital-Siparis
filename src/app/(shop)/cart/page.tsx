export default function CartPage() {
  const items = [
    { title: "Kahve Makinesi Pro", qty: 1, price: 3499 },
    { title: "AirPods Lite", qty: 2, price: 2299 },
  ];
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        {items.map((i, idx) => (
          <div key={idx} className="rounded-xl border bg-white p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{i.title}</div>
              <div className="text-sm text-slate-600">{i.qty} adet</div>
            </div>
            <div className="font-semibold">{(i.price * i.qty).toLocaleString("tr-TR")} TL</div>
          </div>
        ))}
      </div>
      <aside className="rounded-xl border bg-white p-4 h-fit">
        <div className="flex items-center justify-between">
          <div>Ara Toplam</div>
          <div className="font-semibold">{subtotal.toLocaleString("tr-TR")} TL</div>
        </div>
        <button className="mt-4 w-full rounded-lg bg-blue-600 text-white py-2">Ödeme Adımına Geç</button>
      </aside>
    </div>
  );
}
