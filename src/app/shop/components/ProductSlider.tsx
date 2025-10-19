"use client";
import { useRef } from "react";
import ProductCard, { Product } from "./ProductCard";

export default function ProductSlider({ products }: { products: Product[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollBy = (delta: number) => listRef.current?.scrollBy({ left: delta, behavior: "smooth" });

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollBy(-320)}
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 hidden md:grid place-items-center w-9 h-9 rounded-full bg-white/90 ring-1 ring-slate-200 shadow"
        aria-label="Geri"
      >
        ‹
      </button>
      <div
        ref={listRef}
        className="flex gap-3 overflow-x-auto snap-x scroll-pl-3 pr-3 [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {products.map((p) => (
          <div key={p.id} className="snap-start min-w-[220px]">
            <ProductCard p={p} />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => scrollBy(320)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden md:grid place-items-center w-9 h-9 rounded-full bg-white/90 ring-1 ring-slate-200 shadow"
        aria-label="İleri"
      >
        ›
      </button>
    </div>
  );
}
