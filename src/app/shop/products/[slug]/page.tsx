// src/app/shop/products/[slug]/page.tsx
import Link from "next/link";
import { getProduct, listProducts } from "@/lib/api";
import { getVendorOffers } from "@/lib/vendors";

import Gallery from "@/components/product/Gallery";
import BuyBox from "@/components/product/BuyBox";
import InfoTabs from "@/components/product/InfoTabs";

import CampaignRibbon from "@/components/product/CampaignRibbon";
import VariantStrip from "@/components/product/VariantStrip";
import SizePicker from "@/components/product/SizePicker";
import CampaignCards from "@/components/product/CampaignCards";
import SellerCard from "@/components/product/SellerCard";
import MiddleActions from "@/components/product/MiddleActions";

// ALT BLOKLAR
import BundleBox from "@/components/product/BundleBox";
import SimilarGrid from "@/components/product/SimilarGrid";
import AlsoBought from "@/components/product/AlsoBought";
import ReviewsBlock from "@/components/product/ReviewsBlock";
import QASection from "@/components/product/QASection";
import DescriptionExtra from "@/components/product/DescriptionExtra";
import AttributesGrid from "@/components/product/AttributesGrid";

type Props = { params: { slug: string } };

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-semibold">Ürün bulunamadı</h1>
        <p className="mt-2 text-slate-500">Aradığınız ürün kaldırılmış olabilir.</p>
      </div>
    );
  }

  const offers = await getVendorOffers(product.id);
  const images: string[] = product.images?.length ? product.images : [product.image];

  // Varsayılan renk/beden (Woo’dan geldiğinde otomatik dolar)
  const colors =
    product.variants?.colors ?? [
      { name: "Kahverengi", thumb: product.image, active: true },
      { name: "Siyah", thumb: product.image },
    ];
  const sizes = product.variants?.sizes ?? ["36", "37", "38", "39", "40", "41"];

  // Benzer ürünler (grid için)
  const similar = await listProducts({
    category: product.category,
    pageSize: 8,
  });

  return (
    <div className="space-y-4">
      {/* Üst kampanya şeridi (Digital Plus) */}
      <CampaignRibbon />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Sol: Galeri */}
        <div className="lg:col-span-5">
          <Gallery images={images} />
        </div>

        {/* Orta: Başlık / rozetler / varyantlar / beden / butonlar / teslim bandı / info tabs */}
        <article className="space-y-5 lg:col-span-4">
          {/* Breadcrumb */}
          <nav className="text-xs text-slate-500">
            <Link href="/shop" className="hover:underline">Anasayfa</Link>{" "}
            · {product.category ?? "Kategori"}
          </nav>

          <h1 className="text-2xl font-semibold">{product.title}</h1>

          {/* Puan & sayaçlar */}
          {product.rating && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="font-medium text-amber-600">{product.rating.toFixed(1)}</span>
              <span>•</span><span>404 Değerlendirme</span>
              <span>•</span><span>113 Soru-Cevap</span>
            </div>
          )}

          {/* Küçük kampanya rozetleri */}
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-200">
              200 TL Kupon Fırsatı
            </span>
            <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-700 ring-1 ring-rose-200">
              Sevilen ürün!
            </span>
          </div>

          {/* Renk/beden şeritleri */}
          <VariantStrip colors={colors} />
          <SizePicker sizes={sizes} selected={sizes[0]} />

          {/* Butonlar — özelliklerin hemen altı (client wrapper) */}
          <MiddleActions productId={product.id} />

          {/* Teslimat bilgi bandı */}
          <div className="rounded-2xl border bg-white p-4 text-sm">
            <div className="rounded-xl bg-emerald-50 px-3 py-2 text-emerald-700 ring-1 ring-emerald-200">
              Son 8 saat 41 dakika içinde sipariş verirsen en geç <b>bugün kargoda!</b>
            </div>
          </div>

          {/* Özellikler / Açıklama sekmeleri (üst kısım) */}
          <InfoTabs description={product.description} attributes={product.attributes} />
        </article>

        {/* Sağ: kampanya kartları + satıcı + (butonsuz) BuyBox + koleksiyon */}
        <div className="lg:col-span-3 space-y-3">
          <CampaignCards />
          <SellerCard
            name={offers?.[0]?.vendorName ?? "Mağaza"}
            score={offers?.[0]?.vendorScore ?? 9.2}
          />
          <BuyBox
            productId={product.id}
            title={product.title}
            image={product.image}
            offers={offers}
            showActions={false} // sağ kutuda butonlar gizli
          />
          <div className="rounded-2xl border bg-white p-3">Koleksiyona Ekle</div>
        </div>

        {/* === ALT BÖLÜMLER: TAM GENİŞLİK === */}
        <div className="lg:col-span-12 space-y-8 mt-4">
          {/* Birlikte Al kutusu */}
          <BundleBox
            base={{
              id: product.id,
              title: product.title,
              price: product.price ?? 2459.9,
              image: product.image,
            }}
            extra={{
              id: "x1",
              title: "Kahverengi Süet Omuz Çantası",
              price: 676.68,
              crossed: 716.68,
              image: product.image,
              save: 40,
            }}
          />

          {/* Benzer Ürünler */}
          <SimilarGrid items={similar.items} />

          {/* Bu ürünü alanlar... */}
          <AlsoBought
            items={[
              { id: "a1", title: "Bardot elbise", price: 1690, image: product.image, badge: "Tükeniyor" },
              { id: "a2", title: "Asimetrik bluz", price: 319.77, image: product.image, badge: "Kupon Fırsatı" },
              { id: "a3", title: "Sivri burun bot", price: 1600, image: product.image },
              { id: "a4", title: "Topuklu streç bot", price: 1375.22, image: product.image, badge: "Son 2 Ürün" },
            ]}
          />

          {/* Değerlendirmeler */}
          <ReviewsBlock
            rating={product.rating ?? 4.6}
            total={404}
            photos={267}
            items={[
              { id: "r1", author: "D** K**", date: "16 Ocak 2023", body: "36 aldım tam oldu, rahat ve kaliteli.", stars: 5, size: "36" },
              { id: "r2", author: "S** B**", date: "13 Mart 2024", body: "Kendi numaranızı alabilirsiniz.", stars: 4, size: "38" },
              { id: "r3", author: "*****",  date: "27 Kasım 2023", body: "Çok kaliteli, teşekkürler.", stars: 5, size: "40" },
            ]}
          />

          {/* Soru & Cevap */}
          <QASection
            items={[
              { id: "q1", q: "Taban kalınlığı kaç cm?", a: "42 numarada topuk 7 cm olarak ölçülmüştür.", date: "23 Eylül 2025", vendor: "Satıcı" },
              { id: "q2", q: "Kahverengi ile acı kahve aynı mı?", a: "Evet, görsel ile aynı ton.", date: "4 Ocak 2025", vendor: "Satıcı" },
            ]}
          />

          {/* Açıklama & Ek Bilgiler */}
          <DescriptionExtra
            description={
              product.description ||
              "Madamra kadın çizme; şıklığı ve rahatlığı bir arada sunar... (örnek uzun açıklama)"
            }
            bullets={[
              "Ürün Digital Sipariş tarafından gönderilecektir.",
              "Bir ürün birden fazla satıcı tarafından satılabilir.",
              "Kampanyalarda satıcı fiyatı esas alınır.",
              "Sipariş adet sınırlamaları geçerli olabilir.",
            ]}
          />

          {/* Ürün Özellikleri grid */}
          <AttributesGrid
            attrs={
              product.attributes?.length
                ? product.attributes.map((a: any) => ({ name: a.name, value: a.value }))
                : [
                    { name: "Materyal", value: "Süet" },
                    { name: "Topuk Boyu", value: "Kısa Topuklu (1-4 cm)" },
                    { name: "Topuk Tipi", value: "Düz Topuklu" },
                    { name: "Renk", value: "Kahverengi" },
                    { name: "Taban Materyali", value: "Poli" },
                    { name: "Saya Materyali", value: "Suni Deri" },
                  ]
            }
          />
        </div>
      </div>
    </div>
  );
}
