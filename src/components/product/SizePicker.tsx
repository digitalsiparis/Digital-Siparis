"use client";

export default function SizePicker({ sizes, selected, onChange }: {
  sizes: string[]; selected?: string; onChange?: (v:string)=>void;
}) {
  return (
    <div className="space-y-2">
      <div className="text-sm text-slate-700">Beden: <b>{selected ?? sizes[0]}</b></div>
      <div className="flex flex-wrap gap-2">
        {sizes.map(s => (
          <button key={s}
            onClick={()=>onChange?.(s)}
            className={`h-10 w-12 rounded-xl border text-sm font-medium
            ${selected===s ? "bg-amber-500 text-white border-amber-500" : "bg-white hover:shadow-sm"}`}>
            {s}
          </button>
        ))}
      </div>
      <div className="text-xs text-slate-500">Kullanıcıların çoğu kendi bedeninizi almanızı öneriyor.</div>
    </div>
  );
}
