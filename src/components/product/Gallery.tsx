// src/components/product/Gallery.tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery({ images }: { images: string[] }) {
  const imgs = images?.length ? images : ["/images/p/1.jpg"];
  const [idx, setIdx] = useState(0);

  const goto = (i: number) => {
    const n = (i + imgs.length) % imgs.length;
    setIdx(n);
  };

  return (
    <div className="rounded-2xl">
      <div className="relative rounded-2xl overflow-hidden border bg-white">
        <img
          src={imgs[idx]}
          alt=""
          className="w-full aspect-[3/4] object-cover"
        />
        {imgs.length > 1 && (
          <>
            <button
              onClick={() => goto(idx - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-white/90 p-2 border shadow-sm hover:bg-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => goto(idx + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-white/90 p-2 border shadow-sm hover:bg-white"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {imgs.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {imgs.map((s, i) => (
            <button
              key={s + i}
              onClick={() => setIdx(i)}
              className={`shrink-0 rounded-xl border p-0.5 ${i === idx ? "ring-2 ring-amber-500" : "hover:shadow-sm"}`}
              title={`Görsel ${i + 1}`}
            >
              <img
                src={s}
                alt=""
                className="h-16 w-16 rounded-lg object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
