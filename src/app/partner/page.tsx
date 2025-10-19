import Link from "next/link";
import { PLUS_GRADIENT } from "@/lib/brand";

const cards = [
  {
    key: "download",
    title: "Digital İndirilebilir",
    text: "Dijital ürünlerini (e-kitap, yazılım lisansı, kurs vb.) binlerce kullanıcıya ulaştır.",
    icon: "📦",
  },
  {
    key: "marketplace",
    title: "Digital Pazar Yeri",
    text: "Türkiye’de ve yurt dışında online pazar yeri modeliyle satışa başla.",
    icon: "🛍️",
  },
  {
    key: "market",
    title: "Digital Market",
    text: "Dakikalar içinde teslim edilen hızlı market modeline katıl.",
    icon: "⚡",
  },
] as const;

export default function PartnerLanding() {
  return (
    <div className="space-y-6">
      {/* üst şerit */}
      <div
        className="rounded-2xl p-6 text-white"
        style={{ backgroundImage: PLUS_GRADIENT }}
      >
        <div className="text-2xl font-semibold">İşinizi Digital Sipariş ile Büyütün!</div>
        <p className="mt-1 text-white/80">
          İşletme türünüzü seçerek başvurunuzu hızlıca tamamlayın. Türkiye ve bölgede yüzbinlerce müşteriye ulaşın.
        </p>
      </div>

      {/* kartlar */}
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.key}
            href={{ pathname: "/partner/apply", query: { type: c.key } }}
            className="group rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md"
          >
            <div className="mb-2 text-4xl">{c.icon}</div>
            <div className="text-lg font-semibold">{c.title}</div>
            <p className="mt-1 text-sm text-slate-600">{c.text}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-amber-700">
              Başvuruya Git
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
