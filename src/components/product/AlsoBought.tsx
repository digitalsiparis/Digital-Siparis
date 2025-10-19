"use client";

export default function AlsoBought({ items }:{items:{id:string|number; title:string; price:number; image:string; badge?:string}[]}) {
  return (
    <section className="mt-6">
      <h2 className="mb-3 text-lg font-semibold">Bu Ürünü Alanlar Bunları da Aldı</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {items.map((p) => (
          <div key={p.id} className="w-52 shrink-0 rounded-xl border bg-white p-3 hover:shadow-sm">
            <div className="relative">
              <img src={p.image} alt="" className="aspect-square w-full rounded-lg object-cover ring-1 ring-slate-200" />
              {p.badge && <span className="absolute left-2 top-2 rounded-full bg-rose-600 px-2 py-0.5 text-xs font-medium text-white">{p.badge}</span>}
            </div>
            <div className="mt-2 line-clamp-2 text-sm">{p.title}</div>
            <div className="mt-1 font-semibold">{p.price.toLocaleString("tr-TR")} TL</div>
          </div>
        ))}
      </div>
    </section>
  );
}
