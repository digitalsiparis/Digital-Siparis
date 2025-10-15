import Image from "next/image";
import Link from "next/link";

function Section({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {href && (
          <Link href={href} className="text-sm text-blue-600 hover:underline">
            Hepsini gör
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

type Product = { id: string; title: string; price: number; image: string; badge?: string; rating?: number };
function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/products/${p.id}`}
      className="group rounded-2xl ring-1 ring-slate-200 bg-white hover:shadow-md transition overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[4/3]">
        {/* Görseller yoksa bile sayfa çalışsın diye fill div yerine boş arka plan */}
        {/* Eğer /public/images/... eklediysen Image kullan */}
        <Image src={p.image} alt={p.title} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
        {p.badge && (
          <span className="absolute left-2 top-2 text-xs px-2 py-1 rounded-lg bg-amber-500 text-white shadow">
            {p.badge}
          </span>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="line-clamp-2 text-sm text-slate-800 min-h-[2.5rem]">{p.title}</div>
        <div className="flex items-center justify-between">
          <div className="font-semibold">
            {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(p.price)}
          </div>
          {p.rating && <div className="text-xs text-amber-600">★ {p.rating.toFixed(1)}</div>}
        </div>
      </div>
    </Link>
  );
}

// --- Mock veri (görseller /public/images/... içine eklenebilir)
const heroBanners = [
  { id: "bn-1", title: "Büyük Sonbahar İndirimi", text: "Elektronik ve modada %40'a varan fırsatlar", href: "/campaigns/sonbahar", image: "/images/hero-1.jpg" },
  { id: "bn-2", title: "Kargo Bedava Günleri", text: "₺300 üzeri tüm siparişlerde", href: "/campaigns/kargo-bedava", image: "/images/hero-2.jpg" },
];

const categories = [
  { id: "elektronik", name: "Elektronik", image: "/images/cats/elektronik.jpg" },
  { id: "giyim", name: "Giyim", image: "/images/cats/giyim.jpg" },
  { id: "ayakkabi", name: "Ayakkabı", image: "/images/cats/ayakkabi.jpg" },
  { id: "ev", name: "Ev & Yaşam", image: "/images/cats/ev.jpg" },
  { id: "kozmetik", name: "Kozmetik", image: "/images/cats/kozmetik.jpg" },
  { id: "spor", name: "Spor", image: "/images/cats/spor.jpg" },
  { id: "market", name: "Süpermarket", image: "/images/cats/market.jpg" },
];

const flash: Product[] = [
  { id: "p-101", title: "Bluetooth Kulaklık Pro ANC", price: 899, image: "/images/p/1.jpg", badge: "%30", rating: 4.6 },
  { id: "p-102", title: "Akıllı Saat X 44mm", price: 1299, image: "/images/p/2.jpg", badge: "%25", rating: 4.4 },
  { id: "p-103", title: "Robot Süpürge Max", price: 5499, image: "/images/p/3.jpg", badge: "%15", rating: 4.7 },
  { id: "p-104", title: "Dizüstü Bilgisayar 14\" i5", price: 15499, image: "/images/p/4.jpg", badge: "%18", rating: 4.5 },
  { id: "p-105", title: "Kışlık Mont Su Geçirmez", price: 1299, image: "/images/p/5.jpg", badge: "%35", rating: 4.3 },
];

const picks: Product[] = [
  { id: "p-201", title: "Oyun Konsolu 1TB", price: 19999, image: "/images/p/6.jpg", rating: 4.8 },
  { id: "p-202", title: "Espresso Makinesi", price: 4999, image: "/images/p/7.jpg", rating: 4.6 },
  { id: "p-203", title: "Halı 160x230 Modern", price: 1699, image: "/images/p/8.jpg", rating: 4.5 },
  { id: "p-204", title: "Koşu Ayakkabısı", price: 1399, image: "/images/p/9.jpg", rating: 4.4 },
  { id: "p-205", title: "Vücut Losyonu 400ml", price: 179, image: "/images/p/10.jpg", rating: 4.2 },
  { id: "p-206", title: "Akıllı Ampul Seti", price: 299, image: "/images/p/11.jpg", rating: 4.3 },
  { id: "p-207", title: "Ofis Sandalyesi Ergonomik", price: 2799, image: "/images/p/12.jpg", rating: 4.5 },
  { id: "p-208", title: "Airfryer XL", price: 3299, image: "/images/p/13.jpg", rating: 4.7 },
];

function BadgeBar() {
  return (
    <div className="grid gap-3 sm:grid-cols-4">
      {[
        { text: "Orijinal ürün" },
        { text: "Günlük fırsatlar" },
        { text: "Hızlı kargo" },
        { text: "Güvenli ödeme" },
      ].map((i) => (
        <div key={i.text} className="rounded-2xl bg-white ring-1 ring-slate-200 p-4 flex items-center gap-3">
          <span className="w-5 h-5 rounded-full bg-slate-200 inline-block" />
          <span className="text-sm text-slate-700">{i.text}</span>
        </div>
      ))}
    </div>
  );
}

export default function ShopHome() {
  return (
    <div className="space-y-10">
      {/* HERO */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="relative lg:col-span-2 overflow-hidden rounded-3xl ring-1 ring-slate-200 bg-gradient-to-br from-amber-50 to-white">
          <div className="relative p-8 md:p-12 min-h-[220px] md:min-h-[300px]">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">{heroBanners[0].title}</h1>
            <p className="text-slate-700 mt-2">{heroBanners[0].text}</p>
            <Link href={heroBanners[0].href} className="inline-flex mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white">
              Alışverişe Başla
            </Link>
          </div>
        </div>
        <div className="grid gap-4">
          {heroBanners.slice(1).map((b) => (
            <Link key={b.id} href={b.href} className="relative rounded-3xl ring-1 ring-slate-200 overflow-hidden bg-white p-6 min-h-[140px]">
              <div className="text-lg font-semibold">{b.title}</div>
              <div className="text-sm text-slate-700">{b.text}</div>
            </Link>
          ))}
        </div>
      </div>

      <BadgeBar />

      {/* KATEGORİLER */}
      <Section title="Kategoriler" href="/categories">
        <div className="flex gap-3 overflow-x-auto snap-x">
          {categories.map((c) => (
            <Link key={c.id} href={`/category/${c.id}`} className="snap-start min-w-[140px]">
              <div className="relative aspect-square rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-slate-100" />
              <div className="mt-2 text-sm text-slate-700">{c.name}</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* GÜNÜN FIRSATLARI */}
      <Section title="Günün Fırsatları" href="/deals">
        <div className="flex gap-3 overflow-x-auto snap-x">
          {flash.map((p) => (
            <div key={p.id} className="snap-start min-w-[220px]">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </Section>

      {/* SEÇKİLER */}
      <Section title="Sizin için Seçtiklerimiz" href="/collections/picks">
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {picks.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </Section>
    </div>
  );
}
