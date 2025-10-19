import Link from "next/link";

export default function SimilarGrid({ items }:{items:{id:string|number; title:string; price:number; image:string}[]}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Benzer Ürünler</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {items.map(p => (
          <Link key={p.id} href={`/shop/products/${p.id}`} className="group rounded-xl border bg-white p-3 hover:shadow-sm">
            <img src={p.image} alt="" className="aspect-square w-full rounded-lg object-cover ring-1 ring-slate-200" />
            <div className="mt-2 line-clamp-2 text-sm">{p.title}</div>
            <div className="mt-1 font-semibold text-amber-600">{p.price.toLocaleString("tr-TR")} TL</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
