export default function Dashboard() {
  const cards = [
    { label: "Toplam Sipariş", value: 128 },
    { label: "Bekleyen", value: 7 },
    { label: "İade", value: 2 },
  ];
  return (
    <section className="space-y-6">
      <h1 className="text-xl font-semibold">Gösterge Paneli</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        {cards.map(c => (
          <div key={c.label} className="rounded-xl border bg-white p-4">
            <div className="text-sm text-slate-500">{c.label}</div>
            <div className="text-2xl font-semibold mt-1">{c.value}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border bg-white p-4">
        <div className="text-sm text-slate-600">Son hareketler burada listelenir.</div>
      </div>
    </section>
  );
}
