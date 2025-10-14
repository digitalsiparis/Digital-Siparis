import Link from "next/link";

export default function ShopHome() {
  const featured = [
    { slug: "kahve-makinesi-pro", title: "Kahve Makinesi Pro", price: 3499, image: "/placeholder.svg" },
    { slug: "airpods-lite",       title: "AirPods Lite",        price: 2299, image: "/placeholder.svg" },
    { slug: "robot-supurge-x",    title: "Robot Süpürge X",     price: 8999, image: "/placeholder.svg" },
  ];

  return (
    <section className="space-y-10">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
        <h1 className="text-3xl font-semibold">Hoş geldiniz 👋</h1>
        <p className="mt-2 text-white/80">Yeni sezon fırsatları burada. Popüler ürünleri keşfedin.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/products/example-urun" className="px-4 py-2 bg-white text-blue-700 rounded-lg text-sm font-medium">Ürünlere Git</Link>
          <Link href="/vendors/ornek-marka" className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm">Markaları Keşfet</Link>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Öne Çıkanlar</h2>
          <Link href="/products/example-urun" className="text-sm text-blue-600 hover:underline">Tümünü Gör</Link>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map((p) => (
            <li key={p.slug} className="rounded-xl border bg-white">
              <Link href={`/products/${p.slug}`} className="block p-4">
                <div className="aspect-[4/3] rounded-lg bg-slate-100 grid place-items-center text-slate-400">
                  800×600
                </div>
                <div className="mt-3">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-blue-600 font-semibold">{p.price.toLocaleString("tr-TR")} TL</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
