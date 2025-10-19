"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type Banner = { id: string; image: string; href: string };

export default function CampaignSlider({ items }: { items: Banner[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const jump = (d: number) => ref.current?.scrollBy({ left: d, behavior: "smooth" });

  return (
    <div className="relative">
      <button onClick={() => jump(-360)} className="absolute -left-3 top-1/2 -translate-y-1/2 hidden md:grid place-items-center w-9 h-9 rounded-full bg-white/90 ring-1 ring-slate-200 shadow">‹</button>
      <div ref={ref} className="flex gap-3 overflow-x-auto snap-x">
        {items.map((b) => (
          <Link key={b.id} href={b.href} className="snap-start min-w-[320px] rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-white">
            <div className="relative h-[140px]">
              <Image src={b.image} alt="" fill sizes="320px" className="object-cover" />
            </div>
          </Link>
        ))}
      </div>
      <button onClick={() => jump(360)} className="absolute -right-3 top-1/2 -translate-y-1/2 hidden md:grid place-items-center w-9 h-9 rounded-full bg-white/90 ring-1 ring-slate-200 shadow">›</button>
    </div>
  );
}
