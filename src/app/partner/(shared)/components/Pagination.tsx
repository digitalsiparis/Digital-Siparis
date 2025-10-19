// === src/app/partner/(shared)/components/Pagination.tsx ===
import Link from "next/link";
export function Pagination({ page = 1, total = 1, base = "" }: { page?: number; total?: number; base?: string }) {
return (
<div className="flex items-center gap-2 text-sm">
<Link className="px-3 py-1.5 rounded-lg ring-1 ring-slate-200 bg-white disabled:opacity-50"
href={`${base}?page=${Math.max(1, page - 1)}`}>Önceki</Link>
<span className="text-slate-600">Sayfa {page} / {total}</span>
<Link className="px-3 py-1.5 rounded-lg ring-1 ring-slate-200 bg-white disabled:opacity-50"
href={`${base}?page=${Math.min(total, page + 1)}`}>Sonraki</Link>
</div>
);
}
