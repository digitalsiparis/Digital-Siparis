"use client";

type Review = { id:string|number; author:string; date:string; body:string; stars:number; size?:string };

export default function ReviewsBlock({ rating=4.6, total=404, photos=267, items=[] }:{
  rating?:number; total?:number; photos?:number; items:Review[];
}) {
  return (
    <section className="mt-8 space-y-4">
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border bg-white p-4">
        <div className="flex items-center gap-2 text-amber-500 text-xl">{"★".repeat(5)}</div>
        <div className="text-xl font-semibold">{rating.toFixed(1)}</div>
        <div className="text-slate-500">• {total} Değerlendirme</div>
        <div className="text-slate-500">• {photos} Yorum 📷</div>
        <div className="ml-auto rounded-xl bg-amber-50 px-3 py-1 text-sm text-amber-700 ring-1 ring-amber-200">
          Kullanıcıların çoğu kendi bedeninizi almanızı öneriyor.
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {items.map((r) => (
          <article key={r.id} className="rounded-xl border bg-white p-4 text-sm">
            <div className="flex items-center gap-2 text-amber-500">{"★".repeat(r.stars)}{"☆".repeat(5-r.stars)}</div>
            <div className="mt-1 text-slate-500">{r.author} • {r.date} {r.size && <b className="ml-1">Beden: {r.size}</b>}</div>
            <p className="mt-2 text-slate-700">{r.body}</p>
          </article>
        ))}
      </div>

      <button className="mx-auto block rounded-2xl border px-4 py-2 text-sm font-medium hover:bg-white">Tüm Yorumları Göster</button>
    </section>
  );
}
