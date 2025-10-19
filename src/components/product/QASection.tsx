"use client";

type QA = { id:string|number; q:string; a?:string; date:string; tag?:string; vendor?:string };

export default function QASection({ items=[] }:{items:QA[]}) {
  const tags = ["tümü","Stok Durumu","Beden","Topuk Boyu","Boyut","Taban Özellikleri","Kalıp","Renk Seçenekleri","Suya Dayanıklılık"];
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-lg font-semibold">Ürün Soru ve Cevapları</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map(t => <span key={t} className="rounded-xl border bg-white px-3 py-1 text-sm">{t}</span>)}
      </div>

      <div className="mt-4 space-y-4">
        {items.map(x => (
          <div key={x.id} className="rounded-2xl border bg-white p-4">
            <div className="text-sm text-slate-500">{x.date}</div>
            <div className="mt-1 font-medium">Soru: {x.q}</div>
            {x.a ? (
              <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm">
                <div className="mb-1 font-medium">{x.vendor ?? "Satıcı"}’nın cevabı</div>
                <div>{x.a}</div>
              </div>
            ) : (
              <div className="mt-2 text-sm text-slate-500">Bu soru henüz yanıtlanmadı.</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
