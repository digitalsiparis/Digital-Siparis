import Link from "next/link";

export default function SellerCard({ name="Madamra", score=9.2 }: {name?:string; score?:number}) {
  return (
    <div className="rounded-2xl border bg-white p-4 text-sm">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{name}</div>
        <div className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700 ring-1 ring-emerald-200">
          {score.toFixed(1)}
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">Yetkili Satıcı</span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">Hızlı Satıcı</span>
      </div>
      <div className="mt-3 grid gap-2">
        <Link href="#" className="rounded-xl border px-3 py-2 hover:bg-slate-50">Takip Et Kazan</Link>
        <Link href="#" className="rounded-xl border px-3 py-2 hover:bg-slate-50">Satıcı Soruları (113)</Link>
      </div>
      <Link href="#" className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-white">
        MAĞAZAYA GİT
      </Link>
    </div>
  );
}
