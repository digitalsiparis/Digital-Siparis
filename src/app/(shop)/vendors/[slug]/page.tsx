type Props = { params: { slug: string } };

export default function VendorPage({ params }: Props) {
  const items = Array.from({ length: 8 }).map((_, i) => ({
    slug: `vendor-item-${i+1}`, title: `Ürün ${i+1}`, price: 199 + i * 10
  }));

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold capitalize">{params.slug.replaceAll("-", " ")} Mağazası</h1>
        <p className="text-slate-600">Mağaza açıklaması ve rozetleri.</p>
      </header>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(p => (
          <li key={p.slug} className="rounded-xl border bg-white p-3">
            <div className="aspect-[4/3] rounded-lg bg-slate-100 grid place-items-center text-slate-400">800×600</div>
            <div className="mt-2 text-sm font-medium">{p.title}</div>
            <div className="text-blue-600 font-semibold">{p.price} TL</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
