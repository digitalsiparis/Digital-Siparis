import { listProducts, type Product } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

function Card({ p }: { p: Product }) {
  return (
    <Link href={`/products/${p.id}`} className="group rounded-2xl ring-1 ring-slate-200 bg-white hover:shadow-md transition overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3]">
        <Image src={p.image} alt={p.title} fill className="object-cover" />
      </div>
      <div className="p-4 space-y-2">
        <div className="line-clamp-2 text-sm text-slate-800 min-h-[2.5rem]">{p.title}</div>
        <div className="font-semibold">{new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY"}).format(p.price)}</div>
      </div>
    </Link>
  );
}

export default async function ProductsPage({ searchParams }: { searchParams?: { page?: string } }) {
  const page = Number(searchParams?.page ?? 1);
  const data = await listProducts({ page, pageSize: 12 });
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Ürünler</h1>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.items.map((p) => <Card key={p.id} p={p} />)}
      </div>
    </section>
  );
}
