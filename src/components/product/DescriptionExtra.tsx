"use client";

export default function DescriptionExtra({
  description,
  bullets=[],
}:{ description:string; bullets:string[] }) {
  const short = description?.slice(0, 600);
  const long = description?.slice(600);
  return (
    <section className="mt-8 rounded-2xl border bg-white p-4">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-lg font-semibold">Ürün Açıklaması</h3>
          <p className="text-slate-700">{short}{long && <span className="hidden md:inline">{long}</span>}</p>
          {long && <details className="mt-3 md:hidden">
            <summary className="cursor-pointer select-none rounded-2xl border px-3 py-2 text-center text-sm">Daha Fazla Göster</summary>
            <p className="mt-3 text-slate-700">{long}</p>
          </details>}
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold">Ek Bilgiler</h3>
          <ul className="space-y-2 text-slate-700">
            {bullets.map((b, i)=><li key={i} className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-amber-500"></span>{b}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
