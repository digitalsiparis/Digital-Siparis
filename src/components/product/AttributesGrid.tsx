export default function AttributesGrid({ attrs }:{attrs:{name:string; value:string}[]}) {
  return (
    <section className="mt-6 rounded-2xl border bg-white p-4">
      <h3 className="mb-3 text-lg font-semibold">Ürün Özellikleri</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {attrs.map((a,i)=>(
          <div key={i} className="flex items-center justify-between rounded-xl border bg-slate-50 px-3 py-2">
            <span className="text-slate-600">{a.name}</span>
            <span className="font-medium">{a.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
