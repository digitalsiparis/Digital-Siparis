export default function Orders() {
  const orders = [
    { no: "DS-10045", date: "2025-10-12", customer: "Ayşe Yılmaz", total: 3499, status: "Hazırlanıyor" },
    { no: "DS-10046", date: "2025-10-13", customer: "Ali Demir", total: 2299, status: "Kargoda" },
  ];
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Siparişler</h1>
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left p-3">No</th>
              <th className="text-left p-3">Tarih</th>
              <th className="text-left p-3">Müşteri</th>
              <th className="text-right p-3">Tutar</th>
              <th className="text-left p-3">Durum</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.no} className="border-t">
                <td className="p-3">{o.no}</td>
                <td className="p-3">{o.date}</td>
                <td className="p-3">{o.customer}</td>
                <td className="p-3 text-right">{o.total.toLocaleString("tr-TR")} TL</td>
                <td className="p-3">
                  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">{o.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
