export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Satýcý Paneli</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-slate-500">Toplam Sipariþ</div>
          <div className="text-3xl font-bold mt-1">128</div>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-slate-500">Bekleyen</div>
          <div className="text-3xl font-bold mt-1">7</div>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-slate-500">Ýade</div>
          <div className="text-3xl font-bold mt-1">2</div>
        </div>
      </div>
    </div>
  );
}
