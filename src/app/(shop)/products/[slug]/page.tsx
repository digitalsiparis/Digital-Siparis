import type { Metadata } from "next";
import Link from "next/link";

type Props = { params: { slug: string } };
export function generateMetadata({ params }: Props): Metadata {
  return { title: `${params.slug} | Ürün` };
}

export default function ProductDetail({ params }: Props) {
  const { slug } = params;
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="rounded-xl bg-slate-100 aspect-square grid place-items-center text-slate-400">
        1000×1000
      </div>
      <div>
        <h1 className="text-2xl font-semibold capitalize">{slug.replaceAll("-", " ")}</h1>
        <p className="mt-2 text-slate-600">
          Yüksek kalite ve hızlı kargo. Ürüne ait kısa açıklama burada.
        </p>
        <div className="mt-4 text-2xl font-bold text-blue-700">3.499 TL</div>
        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Sepete Ekle</button>
          <Link href="/cart" className="px-4 py-2 rounded-lg border">Sepete Git</Link>
        </div>
        <div className="mt-8">
          <h2 className="font-semibold mb-2">Teknik Özellikler</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>Garanti: 24 ay</li>
            <li>Kargo: 1-3 iş günü</li>
            <li>İade: 14 gün</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
