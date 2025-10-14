import Link from "next/link";
export default function ProductCard({p}:{p:any}){
  return (
    <div className="rounded-2xl border p-3 hover:shadow-sm">
      <Link href={`/products/${p.slug}`}>
        <img src={p.image} alt={p.title} className="h-40 w-full object-cover rounded-xl bg-slate-100"/>
        <div className="mt-3 line-clamp-2">{p.title}</div>
        <div className="mt-1 font-semibold">{p.price.toLocaleString("tr-TR")} ₺</div>
      </Link>
      {p.vendor && (
        <Link href={`/vendor/${p.vendor.slug}`} className="text-xs text-slate-500 hover:underline">
          {p.vendor.name}
        </Link>
      )}
    </div>
  );
}
