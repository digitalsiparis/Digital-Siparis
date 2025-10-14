import {listProducts} from '@/src/lib/api';

export default async function CategoryPage({params, searchParams}:{params:{slug:string}, searchParams:{page?:string; sort?:string}}){
  const data = await listProducts({category: params.slug, page: searchParams.page?Number(searchParams.page):1, sort: searchParams.sort as any});
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Kategori: {params.slug}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.items?.map((p:any)=> (
          <a key={p.id} href={`/products/${p.slug}`} className="rounded-2xl border overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.images?.[0]||'/mock/placeholder.webp'} alt={p.title} className="h-48 w-full object-cover" />
            <div className="p-3">
              <div className="line-clamp-2 text-sm mb-1">{p.title}</div>
              <div className="font-semibold">{p.price} {p.currency||'₺'}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
