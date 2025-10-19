import { listProducts, type Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic"; // (Woo’dan gelecekse SSR)

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { page?: string; sort?: "price-asc" | "price-desc" | "rating-desc" | "newest" };
}) {
  const page = Number(searchParams?.page ?? 1);
  const sort = (searchParams?.sort as any) ?? "newest";

  const data = await listProducts({ page, sort, pageSize: 12 });

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-semibold">Ürünler</h1>
        {/* basit sıralama */}
        <form className="text-sm">
          <select
            name="sort"
            defaultValue={sort}
            className="px-3 py-2 rounded-xl ring-1 ring-slate-200"
            onChange={(e) => (window.location.href = `/products?sort=${e.target.value}`)}
          >
            <option value="newest">En yeniler</option>
            <option value="price-asc">Fiyat (Artan)</option>
            <option value="price-desc">Fiyat (Azalan)</option>
            <option value="rating-desc">Puan (Azalan)</option>
          </select>
        </form>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.items.map((p: Product) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>

      {/* sayfalama */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <a
          href={`/products?page=${Math.max(1, page - 1)}&sort=${sort}`}
          aria-disabled={page <= 1}
          className="px-3 py-1.5 rounded-xl ring-1 ring-slate-200 bg-white disabled:opacity-50"
        >
          ‹ Önceki
        </a>
        <span className="text-sm text-slate-600">
          {page} / {data.totalPages}
        </span>
        <a
          href={`/products?page=${Math.min(data.totalPages, page + 1)}&sort=${sort}`}
          aria-disabled={page >= data.totalPages}
          className="px-3 py-1.5 rounded-xl ring-1 ring-slate-200 bg-white disabled:opacity-50"
        >
          Sonraki ›
        </a>
      </div>
    </section>
  );
}
