"use client";

import { BRAND_PLUS, PLUS_GRADIENT } from "@/lib/brand";

export default function CampaignRibbon({
  brand = BRAND_PLUS,
  priceText = "2.336,90 TL",
  ctaText = "Plus’a geç",
}: {
  brand?: string;
  priceText?: string;
  ctaText?: string;
}) {
  return (
    <div
      className="relative mb-4 rounded-2xl overflow-hidden text-white"
      style={{ backgroundImage: PLUS_GRADIENT }}
    >
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm md:text-base">
          <span className="inline-flex items-center gap-2 font-semibold">
            <span className="inline-block rounded-full bg-white/20 px-2 py-0.5 text-xs">+</span>
            {brand}’a Özel sepette <b>{priceText}</b>
          </span>
        </div>
        <button className="rounded-full px-3 py-1 text-sm font-medium"
                style={{ background: "rgba(255,255,255,.15)" }}>
          {ctaText}
        </button>
      </div>
    </div>
  );
}
