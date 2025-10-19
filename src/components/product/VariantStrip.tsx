"use client";

type Color = { name: string; thumb: string; active?: boolean };
export default function VariantStrip({ colors = [], onSelect }: {
  colors: Color[];
  onSelect?: (c: Color) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="text-sm text-slate-700">Renk: <b>{colors.find(c=>c.active)?.name ?? colors[0]?.name}</b></div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {colors.map((c) => (
          <button key={c.name}
            onClick={() => onSelect?.(c)}
            className={`shrink-0 rounded-xl border ring-offset-1 ${c.active ? "ring-2 ring-amber-500" : "hover:shadow-sm"}`}>
            <img src={c.thumb} alt={c.name} className="h-16 w-16 rounded-lg object-cover" />
            <div className="px-2 py-1 text-[11px] text-slate-600">{c.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
