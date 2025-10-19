import Image from "next/image";
import { getProduct } from "@/lib/api";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const p = await getProduct(params.slug);
  if (!p) return notFound();
  return (
    <section className="grid gap-8 md:grid-cols-2">
      <div className="rounded-2xl ring-1 ring-slate-200 bg-white p-2">
        <div className="relative aspect-square">
          <Image src={p.image} alt={p.title} fill className="object-contain" />
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{p.title}</h1>
        <div className="text-3xl font-bold">{new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY"}).format(p.price)}</div>
        <button className="px-4 py-2 rounded-xl bg-slate-900 text-white">Sepete Ekle</button>
        <p className="text-sm text-slate-600">{p.description ?? "Ürün açıklaması yakında."}</p>
      </div>
    </section>
  );
}
