import Link from "next/link";

type Cat = { id: string; name: string; icon: string };

export default function CategoryDiscounts({ items }: { items: Cat[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((c) => (
        <Link
          key={c.id}
          href={`/shop/category/${c.id}?sort=price-asc`}
          className="rounded-2xl ring-1 ring-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 flex items-center gap-3 hover:shadow-sm"
        >
          <span className="w-10 h-10 rounded-full bg-slate-100 grid place-items-center text-sm">%</span>
          <div>
            <div className="text-sm font-medium">{c.name}</div>
            <div className="text-xs text-slate-600">Seçili ürünlerde indirim</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
