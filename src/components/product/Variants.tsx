// src/components/product/Variants.tsx
"use client";

import { useState, useEffect } from "react";

type Props = {
  colors?: { name: string; thumb?: string }[];
  sizes?: string[];
  onChange?: (sel: { color?: string; size?: string }) => void;
};

export default function Variants({ colors, sizes, onChange }: Props) {
  const [color, setColor] = useState<string | undefined>(colors?.[0]?.name);
  const [size, setSize] = useState<string | undefined>(sizes?.[0]);

  useEffect(() => {
    onChange?.({ color, size });
  }, [color, size, onChange]);

  return (
    <div className="space-y-5">
      {colors?.length ? (
        <div>
          <div className="mb-2 text-sm font-medium">
            Renk: <span className="font-normal text-slate-600">{color}</span>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                className={`inline-flex items-center gap-2 rounded-xl border bg-white p-1 pr-2 ${color === c.name ? "ring-2 ring-amber-500" : "hover:shadow-sm"}`}
                title={c.name}
              >
                <img
                  src={c.thumb ?? "/images/p/1.jpg"}
                  className="h-12 w-12 rounded-lg object-cover"
                  alt={c.name}
                />
                <span className="text-xs">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {sizes?.length ? (
        <div>
          <div className="mb-2 text-sm font-medium">Beden:</div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`min-w-12 rounded-lg border px-3 py-1.5 text-sm ${size === s ? "bg-amber-600 text-white border-amber-600" : "bg-white hover:shadow-sm"}`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Kullanıcıların çoğu kendi bedeninizi almanızı öneriyor.
          </div>
        </div>
      ) : null}
    </div>
  );
}
