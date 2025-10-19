"use client";

import { useEffect, useState, useTransition } from "react";
import { getReviewSummary, listReviews, Review } from "@/lib/reviews";

export default function Reviews({ productId }: { productId: string }) {
  const [summary, setSummary] = useState<{avg:number;count:number;suggestNote?:string} | null>(null);
  const [items, setItems] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pending, start] = useTransition();

  useEffect(() => {
    start(async () => {
      const sum = await getReviewSummary(productId);
      const res = await listReviews(productId, 1);
      setSummary(sum);
      setItems(res.items);
      setTotal(res.total);
      setPage(1);
    });
  }, [productId]);

  const loadMore = () =>
    start(async () => {
      const next = page + 1;
      const res = await listReviews(productId, next);
      setItems((cur) => [...cur, ...res.items]);
      setPage(next);
      setTotal(res.total);
    });

  return (
    <section id="reviews" className="mt-8 rounded-2xl border bg-white p-4 md:p-5">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="text-2xl font-semibold">{summary?.avg?.toFixed(1) ?? "-"}</div>
        <div className="text-slate-600">{summary?.count ?? 0} Değerlendirme</div>
        {summary?.suggestNote && <div className="text-sm text-slate-500">• {summary.suggestNote}</div>}
      </div>

      <div className="grid gap-3">
        {items.map((r) => (
          <article key={r.id} className="rounded-xl border p-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-amber-600 font-semibold">{r.rating.toFixed(1)}</span>
              <span className="text-slate-500">{new Date(r.date).toLocaleDateString("tr-TR")}</span>
              {r.sizeInfo && <span className="ml-auto text-slate-500">{r.sizeInfo}</span>}
            </div>
            <p className="mt-2 text-sm">{r.body}</p>
          </article>
        ))}
      </div>

      {items.length < total && (
        <div className="mt-4 grid place-items-center">
          <button
            disabled={pending}
            onClick={loadMore}
            className="rounded-xl border bg-slate-50 px-4 py-2 text-sm hover:bg-slate-100 disabled:opacity-60"
          >
            Tüm Yorumları Göster
          </button>
        </div>
      )}
    </section>
  );
}
