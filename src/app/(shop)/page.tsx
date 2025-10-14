import Link from 'next/link';
import {listProducts} from '@/src/lib/api';

export default async function Home({searchParams}:{searchParams:{q?:string;min?:string;max?:string;sort?:string;page?:string}}){
  const {q,min,max,sort,page} = searchParams;
  const data = await listProducts({q, min:min?Number(min):undefined, max:max?Number(max):undefined, sort:sort as any, page:page?Number(page):1, perPage:24});
  const categories = data.categories ?? [
    {slug:'elektronik', name:'Elektronik', image:'/mock/cat-elektronik.webp'},
    {slug:'moda', name:'Moda', image:'/mock/cat-moda.webp'},
    {slug:'3d', name:'3D Yazıcılar', image:'/mock/cat-3d.webp'}
  ];
  return (
    <main className="space-y-8">
      {/* Search */}
      <form action="/" className="mx-auto max-w-3xl p-1 rounded-2xl border flex gap-2">
        <input name="q" defaultValue={q} placeholder="Ürün, mağaza ara…" className="flex-1 p-3 bg-transparent outline-none"/>
        <input type="number" name="min" defaultValue={min} placeholder="Min" className="w-24 p-3 bg-transparent outline-none"/>
        <input type="number" name="max" defaultValue={max} placeholder="Maks" className="w-24 p-3 bg-transparent outline-none"/>
        <select name="sort" defaultValue={sort||''} className="p-3 bg-transparent">
          <option value="">Sırala</option>
          <option value="price_asc">Fiyat ↑</option>
          <option value="price_desc">Fiyat ↓</option>
          <option value="newest">En yeni</option>
        </select>
        <button className="px-4 py-2 rounded-xl border">Ara</button>
      </form>

      {/* Category Strips */}
      <section className="container mx-auto">
        <h2 className="text-xl font-semibold mb-3">Kategoriler</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c:any)=> (
            <Link key={c.slug} href={`/category/${c.slug}`} className="group overflow-hidden rounded-2xl border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={c.name} className="h-28 w-full object-cover group-hover:scale-105 transition"/>
              <div className="p-2 text-center text-sm">{c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Products grid */}
      <section className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.items?.map((p:any)=> (
            <Link key={p.id} href={`/products/${p.slug}`} className="rounded-2xl border overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.images?.[0]||'/mock/placeholder.webp'} alt={p.title} className="h-48 w-full object-cover" />
              <div className="p-3">
                <div className="line-clamp-2 text-sm mb-1">{p.title}</div>
                <div className="font-semibold">{p.price} {p.currency||'₺'}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Paging */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({length: data.totalPages||1}, (_,i)=>{
            const n = i+1; const sp = new URLSearchParams();
            if (q) sp.set('q', q); if (min) sp.set('min',min); if (max) sp.set('max',max); if (sort) sp.set('sort',sort as string); sp.set('page', String(n));
            return <Link key={n} href={`/?${sp.toString()}`} className={`px-3 py-1 rounded-xl border ${Number(page||1)===n?'font-bold':''}`}>{n}</Link>
          })}
        </div>
      </section>
    </main>
  );
}
