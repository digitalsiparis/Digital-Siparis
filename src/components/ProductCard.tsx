// src/components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  badge?: string;
  rating?: number;
};

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/products/${p.id}`} className="group rounded-2xl ring-1 ring-slate-200 bg-white hover:shadow-md transition overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3]">
        <Image src={p.image} alt={p.title} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
        {p.badge && (
          <span className="absolute left-2 top-2 text-xs px-2 py-1 rounded-lg bg-amber-500 text-white shadow">{p.badge}</span>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="line-clamp-2 text-sm text-slate-800 min-h-[2.5rem]">{p.title}</div>
        <div className="flex items-center justify-between">
          <div className="font-semibold">
            {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(p.price)}
          </div>
          {p.rating ? <div className="text-xs text-amber-600">★ {p.rating.toFixed(1)}</div> : null}
        </div>
      </div>
    </Link>
  );
}
