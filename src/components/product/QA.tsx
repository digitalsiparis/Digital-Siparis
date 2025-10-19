"use client";

import { useEffect, useState } from "react";
import { listQA, QAItem } from "@/lib/reviews";

export default function QA({ productId }: { productId: string }) {
  const [items, setItems] = useState<QAItem[]>([]);
  useEffect(() => { listQA(productId).then(r => setItems(r.items)); }, [productId]);

  return (
    <section id="qa" className="mt-6 rounded-2xl border bg-white p-4 md:p-5">
      <div className="mb-3 text-lg font-semibold">Ürün Soru ve Cevapları</div>
      <div className="grid gap-3">
        {items.map((q) => (
          <div key={q.id} className="rounded-lg border p-3">
            <div className="text-sm font-medium">Soru</div>
            <p className="text-sm">{q.question}</p>
            {q.answer ? (
              <div className="mt-2 rounded-md bg-slate-50 p-2 text-sm">
                <div className="mb-1 text-xs text-slate-500">{q.vendorName ?? "Satıcı"} cevabı</div>
                <p>{q.answer}</p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
