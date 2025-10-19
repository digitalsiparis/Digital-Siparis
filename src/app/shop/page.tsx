import Image from "next/image";
import Link from "next/link";
import CategoryBubbles from "./components/CategoryBubbles";
import Section from "./components/Section";
import ProductCard, { Product } from "./components/ProductCard";
import ProductSlider from "./components/ProductSlider";
import CampaignSlider from "./components/CampaignSlider";
import BrandsRow from "./components/BrandsRow";
import CategoryDiscounts from "./components/CategoryDiscounts";
import DealsGrid from "./components/DealsGrid";

export default function ShopHome() {
  // ---- MOCK DATA (yerine WooCommerce verisi koyabiliriz) ----
  const hero = [
    {
      id: "bn-1",
      title: "Büyük Sonbahar İndirimi",
      text: "Elektronik ve modada %40'a varan fırsatlar",
      href: "/campaigns/sonbahar",
      image: "/images/hero-1.jpg",
    },
    {
      id: "bn-2",
      title: "Kargo Bedava Günleri",
      text: "₺300 üzeri tüm siparişlerde",
      href: "/campaigns/kargo-bedava",
      image: "/images/hero-2.jpg",
    },
  ];

  const categories = [
    { id: "kadin", name: "Kadın", icon: "/images/cats/kadin.png" },
    { id: "erkek", name: "Erkek", icon: "/images/cats/erkek.png" },
    { id: "anne", name: "Anne & Çocuk", icon: "/images/cats/anne.png" },
    { id: "ev", name: "Ev & Yaşam", icon: "/images/cats/ev.png" },
    { id: "supermarket", name: "Süpermarket", icon: "/images/cats/market.png" },
    { id: "elektronik", name: "Elektronik", icon: "/images/cats/elektronik.png" },
    { id: "spor", name: "Spor & Outdoor", icon: "/images/cats/spor.png" },
    { id: "kozmetik", name: "Kozmetik", icon: "/images/cats/kozmetik.png" },
  ];

  const popular: Product[] = [
    { id: "p-101", title: "Madamra Kahverengi Kadın Çizme", price: 2359, image: "/images/p/1.jpg", rating: 4.6, badge: "Kargo Bedava" },
    { id: "p-102", title: "Howell Taupe Blazer Ceket", price: 2791, image: "/images/p/2.jpg", rating: 4.2, badge: "Kargo Bedava" },
    { id: "p-103", title: "Bebek Tulum - %100 Pamuk", price: 149, image: "/images/p/3.jpg", rating: 4.5, badge: "Hızlı Teslimat" },
    { id: "p-104", title: "Kids Ayı Nakışlı Kapüşonlu Takım", price: 291, image: "/images/p/4.jpg", rating: 4.0, badge: "Çok Al Az Öde" },
    { id: "p-105", title: "Suni Deri El/Omuz Çanta Seti", price: 769, image: "/images/p/5.jpg", rating: 4.3, badge: "Kargo Bedava" },
    { id: "p-106", title: "Özdesign Tasarım Abiye", price: 4500, image: "/images/p/6.jpg", rating: 4.6, badge: "Kargo Bedava" },
  ];

  const campaigns = [
    { id: "cmp-1", image: "/images/banners/karaca.jpg", href: "/brand/karaca" },
    { id: "cmp-2", image: "/images/banners/hobi.jpg", href: "/hobi" },
    { id: "cmp-3", image: "/images/banners/canta.jpg", href: "/canta" },
    { id: "cmp-4", image: "/images/banners/hm.jpg", href: "/brand/hm" },
  ];

  const brands = [
    { id: "mango", logo: "/images/brands/mango.png" },
    { id: "defacto", logo: "/images/brands/defacto.png" },
    { id: "karaca", logo: "/images/brands/karaca.png" },
    { id: "koton", logo: "/images/brands/koton.png" },
    { id: "adidas", logo: "/images/brands/adidas.png" },
    { id: "mavi", logo: "/images/brands/mavi.png" },
    { id: "pullbear", logo: "/images/brands/pullbear.png" },
    { id: "pierre", logo: "/images/brands/pierre.png" },
  ];

  const bestSellers: Product[] = [
    { id: "p-201", title: "Pirinç Mayası Aydınlatıcı Tonik 150 ml", price: 249, image: "/images/p/7.jpg", rating: 4.6, badge: "En Çok Satan" },
    { id: "p-202", title: "Bromelain Ananas Şurubu", price: 329, image: "/images/p/8.jpg", rating: 4.3, badge: "En Çok Satan" },
    { id: "p-203", title: "Çok Amaçlı Temizlik Spreyi 750ml", price: 112, image: "/images/p/9.jpg", rating: 4.0, badge: "En Çok Satan" },
    { id: "p-204", title: "Harmana Hindiba Kahvesi 150g", price: 479, image: "/images/p/10.jpg", rating: 4.2, badge: "En Çok Satan" },
    { id: "p-205", title: "HC Care Ovex Hızlı Saç Terapisi", price: 145, image: "/images/p/11.jpg", rating: 4.6, badge: "En Çok Satan" },
    { id: "p-206", title: "Coconut Mix 250ml", price: 248, image: "/images/p/12.jpg", rating: 4.5, badge: "En Çok Satan" },
  ];

  const cheapDeals: Product[] = [
    { id: "p-301", title: "EGF Cilt Yenileyici Serum", price: 479, image: "/images/p/13.jpg", rating: 4.7, badge: "Avantajlı Ürün" },
    { id: "p-302", title: "STOP Leke Çıkarıcı 750ml", price: 112, image: "/images/p/9.jpg", rating: 4.0, badge: "Avantajlı Ürün" },
    { id: "p-303", title: "Resveratrol Shot 20'li", price: 617, image: "/images/p/14.jpg", rating: 4.5, badge: "Avantajlı Ürün" },
    { id: "p-304", title: "Lovely New Season Takım", price: 899, image: "/images/p/15.jpg", rating: 4.4, badge: "Avantajlı Ürün" },
    { id: "p-305", title: "Dermod %40 İndirimli Ürün", price: 1299, image: "/images/p/16.jpg", rating: 4.3, badge: "Avantajlı Ürün" },
    { id: "p-306", title: "Jeans Crop Sweat", price: 349, image: "/images/p/17.jpg", rating: 4.1, badge: "Avantajlı Ürün" },
  ];

  return (
    <div className="space-y-10">
      {/* HERO */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Link
          href={hero[0].href}
          className="relative lg:col-span-2 rounded-3xl overflow-hidden ring-1 ring-slate-200 bg-gradient-to-br from-amber-50 to-white group"
        >
          <div className="p-8 md:p-12 min-h-[220px] md:min-h-[300px]">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">{hero[0].title}</h1>
            <p className="text-slate-700 mt-2">{hero[0].text}</p>
            <span className="inline-flex mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white group-hover:bg-black/80">
              Alışverişe Başla
            </span>
          </div>
          <Image
            src={hero[0].image}
            alt=""
            fill
            sizes="(min-width:1024px) 66vw, 100vw"
            className="object-cover opacity-0"
            priority
          />
        </Link>

        <div className="grid gap-4">
          {hero.slice(1).map((b) => (
            <Link
              key={b.id}
              href={b.href}
              className="relative rounded-3xl ring-1 ring-slate-200 overflow-hidden bg-white p-6 min-h-[140px]"
            >
              <div className="text-lg font-semibold">{b.title}</div>
              <div className="text-sm text-slate-700">{b.text}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Kategori balonları */}
      <CategoryBubbles items={categories} />

      {/* Popüler ürünler (slider) */}
      <Section title="Popüler Ürünler" href="/shop/products?sort=popular">
        <ProductSlider products={popular} />
      </Section>

      {/* Kampanya banner slider */}
      <Section title="Öne Çıkan Kampanyalar">
        <CampaignSlider items={campaigns} />
      </Section>

      {/* Kategorilerde indirim keşfet */}
      <Section title="Kategorilerdeki İndirimleri Keşfet">
        <CategoryDiscounts items={categories} />
      </Section>

      {/* Sana özel markalar */}
      <Section title="Sana Özel Markalar">
        <BrandsRow items={brands} />
      </Section>

      {/* Çok satan ürünler */}
      <Section title="Çok Satan Ürünler" href="/shop/products?sort=best">
        <ProductSlider products={bestSellers} />
      </Section>

      {/* Avantajlı ürünler (grid) */}
      <Section title="Avantajlı Ürünler" href="/shop/deals">
        <DealsGrid products={cheapDeals} />
      </Section>
    </div>
  );
}
