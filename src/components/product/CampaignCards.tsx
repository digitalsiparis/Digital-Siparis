import { BRAND_PLUS } from "@/lib/brand";

export default function CampaignCards({ brand = BRAND_PLUS }: { brand?: string }) {
  const items = [
    { title: "300 TL ve Üzeri Kargo Bedava (Satıcı Karşılar)" },
    { title: `${brand}’a Özel Fiyat` },
    { title: "2 Adet ve Üzeri 50 TL İndirim" },
  ];
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-2xl border bg-white p-3 text-sm hover:shadow-sm">
          <div className="font-medium">{it.title}</div>
        </div>
      ))}
    </div>
  );
}
