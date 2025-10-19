import type { Offer, Product, ProductList, PartnerApplication } from "./core";

// Basit in-memory store (dev server ayakta kaldığı sürece persist)
const g = globalThis as any;
g.__MOCK__ = g.__MOCK__ ?? {
  products: [] as Product[],
  offers: {} as Record<string, Offer[]>, // key: productId
  applications: [] as PartnerApplication[],
};

// Seed (ilk çağrıda doldur)
if (!g.__MOCK__.products.length) {
  const base: Product = {
    id: "p-1001",
    slug: "madamra-cizme",
    title: "Madamra Kadın Çizme",
    description: "Şıklık ve rahatlığı bir arada sunar.",
    image: "/placeholder.png",
    images: ["/placeholder.png"],
    price: 2459.9,
    category: "kadin-ayakkabi",
    rating: 4.6,
    attributes: [
      { name: "Materyal", value: "Süet" },
      { name: "Renk", value: "Kahverengi" },
    ],
    variants: {
      colors: [{ name: "Kahverengi", thumb: "/placeholder.png" }, { name: "Siyah", thumb: "/placeholder.png" }],
      sizes: ["36","37","38","39","40","41"],
    },
  };
  g.__MOCK__.products = [
    base,
    { ...base, id: "p-1002", slug: "siyah-bot", title: "Siyah Bot", image: "/placeholder.png", category: "kadin-ayakkabi", price: 1600 },
    { ...base, id: "p-1003", slug: "asimetrik-bluz", title: "Asimetrik Bluz", image: "/placeholder.png", category: "kadin-giyim", price: 319.77 },
  ];
  g.__MOCK__.offers["p-1001"] = [
    { vendorId: "v-1", vendorName: "Mağaza A", vendorScore: 9.2, price: 2459.9, shippingBadge: "Kargo Bedava", isBest: true },
    { vendorId: "v-2", vendorName: "Mağaza B", vendorScore: 9.0, price: 2499.0 },
  ];
}

// Queries
export function mockListProducts(opts: { category?: string; q?: string; page?: number; pageSize?: number }): ProductList {
  const { category, q, page = 1, pageSize = 12 } = opts;
  let items: Product[] = g.__MOCK__.products;
  if (category) items = items.filter(p => p.category === category);
  if (q) items = items.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));
  const start = (page - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), total: items.length, page, pageSize };
}

export function mockGetProduct(idOrSlug: string): Product | undefined {
  return g.__MOCK__.products.find(p => p.id === idOrSlug || p.slug === idOrSlug);
}

export function mockGetOffers(productId: string): Offer[] {
  return g.__MOCK__.offers[productId] ?? [];
}

export function mockSubmitApplication(payload: Omit<PartnerApplication,"id"|"status"|"createdAt">) {
  const app: PartnerApplication = {
    ...payload,
    id: crypto.randomUUID(),
    status: "received",
    createdAt: new Date().toISOString(),
  };
  g.__MOCK__.applications.push(app);
  return { ok: true, id: app.id, message: "Başvurun alındı." };
}
