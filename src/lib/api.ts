// src/lib/api.ts içinde Product tipini genişlet
export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  images?: string[];          // ← eklendi (opsiyonel)
  rating?: number;
  badge?: string;
  description?: string;
  category?: string;          // slug
  attributes?: Record<string, string>; // ← eklendi (opsiyonel: Materyal, Renk vb.)
  variants?: {
    // ör: renk ve beden varyantları
    colors?: { name: string; thumb?: string }[];
    sizes?: string[];
  };
};


type ListParams = {
  category?: string; // UI slug veya Woo slug/isim (ör: "anne-cocuk" | "Ev & Yaşam" | "ev-ve-yasam")
  page?: number;
  pageSize?: number;
  sort?: "price-asc" | "price-desc" | "rating-desc" | "newest";
};

type ListResult = {
  items: Product[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

// -------------------- MOCK --------------------
const MOCK: Product[] = [
  { id: "p-101", title: "Bluetooth Kulaklık Pro ANC", price: 899, image: "/images/p/1.jpg", rating: 4.6, category: "elektronik" },
  { id: "p-102", title: "Akıllı Saat X 44mm",        price: 1299, image: "/images/p/2.jpg", rating: 4.4, category: "elektronik" },
  { id: "p-103", title: "Robot Süpürge Max",         price: 5499, image: "/images/p/3.jpg", rating: 4.7, category: "elektronik" },
  { id: "p-104", title: "Dizüstü Bilgisayar 14\" i5",price: 15499,image: "/images/p/4.jpg", rating: 4.5, category: "elektronik" },
  { id: "p-105", title: "Kışlık Mont Su Geçirmez",   price: 1299, image: "/images/p/5.jpg", rating: 4.3, category: "kadin" },
  { id: "p-201", title: "Oyun Konsolu 1TB",          price: 19999,image: "/images/p/6.jpg", rating: 4.8, category: "elektronik" },
  { id: "p-202", title: "Espresso Makinesi",         price: 4999, image: "/images/p/7.jpg", rating: 4.6, category: "ev-ve-yasam" },
  { id: "p-203", title: "Halı 160x230 Modern",       price: 1699, image: "/images/p/8.jpg", rating: 4.5, category: "ev-ve-yasam" },
  { id: "p-204", title: "Koşu Ayakkabısı",           price: 1399, image: "/images/p/9.jpg", rating: 4.4, category: "spor-outdoor" },
  { id: "p-205", title: "Vücut Losyonu 400ml",       price: 179,  image: "/images/p/10.jpg",rating: 4.2, category: "kozmetik" },
  { id: "p-206", title: "Akıllı Ampul Seti",         price: 299,  image: "/images/p/11.jpg",rating: 4.3, category: "elektronik" },
  { id: "p-207", title: "Ofis Sandalyesi Ergonomik", price: 2799, image: "/images/p/12.jpg",rating: 4.5, category: "ev-ve-yasam" },
  { id: "p-208", title: "Airfryer XL",               price: 3299, image: "/images/p/13.jpg",rating: 4.7, category: "ev-ve-yasam" },
];

// -------------------- ENV / HELPERS --------------------
const hasWoo =
  !!process.env.WC_BASE_URL &&
  !!process.env.WC_CONSUMER_KEY &&
  !!process.env.WC_CONSUMER_SECRET;

const PLACEHOLDER_IMG = "/images/p/1.jpg";

function stripHtml(html?: string): string | undefined {
  if (!html) return undefined;
  return html.replace(/<[^>]*>/g, "").trim() || undefined;
}

function paginate<T>(rows: T[], page: number, pageSize: number): ListResult {
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const items = rows.slice((page - 1) * pageSize, page * pageSize);
  return { items, page, pageSize, total, totalPages };
}

function mockList(params: ListParams): ListResult {
  const { category, sort = "newest", page = 1, pageSize = 12 } = params;
  let rows = [...MOCK];
  if (category) {
    const s = normalizeSlug(category);
    rows = rows.filter((p) => (p.category ?? "") === s);
  }
  if (sort === "price-asc") rows.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") rows.sort((a, b) => b.price - a.price);
  else if (sort === "rating-desc") rows.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  return paginate(rows, page, pageSize);
}

// 401 durumunda query auth fallback + User-Agent
async function wooFetch(url: URL, init?: RequestInit) {
  const headers: Record<string, string> = {
    "User-Agent": "DigitalSiparisApp/1.0",
    ...(init?.headers as any),
  };

  const basic = "Basic " + Buffer.from(
    `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
  ).toString("base64");

  // 1) Basic Auth
  let r = await fetch(url.toString(), { ...init, headers: { ...headers, Authorization: basic }, cache: "no-store" });
  if (r.status !== 401) return r;

  // 2) Query auth fallback (HTTPS’te güvenli)
  const u2 = new URL(url);
  u2.searchParams.set("consumer_key", process.env.WC_CONSUMER_KEY!);
  u2.searchParams.set("consumer_secret", process.env.WC_CONSUMER_SECRET!);
  r = await fetch(u2.toString(), { ...init, headers, cache: "no-store" });
  return r;
}

// -------------------- KATEGORI NORMALIZATION --------------------
// UI tarafındaki ana kategori sekmeleri için alias -> isim adayları
const MAIN_CATEGORY_ALIASES: Record<string, string[]> = {
  "kadin": [
    "Kadın", "Kadın Giyim", "Kadın Ayakkabıları", "Çanta & Aksesuar", "Çantalar ve Cüzdanlar",
  ],
  "erkek": [
    "Erkek", "Erkek Giyim", "Erkek Ayakkabı", "Çanta & Aksesuar",
  ],
  "anne-cocuk": [
    "Anne & Çocuk", "Bebek", "Bebek Giyim", "Bebek Bakım", "Bebek Odası", "Beslenme & Emzirme", "Taşıma & Güvenlik", "Oyuncak",
  ],
  "ev-ve-yasam": [
    "Ev & Yaşam", "Ev ve Yaşam", "Ev & Mobilya", "Ev Dekorasyonu", "Ev Tekstili", "Ev Gereçleri", "Ev ve Mutfak Gereçleri", "Sofra & Mutfak", "Mobilya",
  ],
  "elektronik": [
    "Elektronik", "Elektronik ve Aksesuarlar", "Bilgisayarlar ve Çevre Birimleri", "TV ve Projeksiyon", "Video Oyunları", "Telefonlar ve Ahizeler", "Ses",
  ],
  "kozmetik": [
    "Kozmetik & Kişisel Bakım", "KOZMETİK KİŞİSEL BAKIM", "Banyo ve Güzellik", "Makyaj ve Kozmetik", "Parfüm & Deodorant", "Kişisel Bakım",
  ],
  "ayakkabi-canta": [
    "Ayakkabı", "Ayakkabı & Çanta", "Çantalar ve Cüzdanlar", "Çanta & Aksesuar",
  ],
  "oto-bahce-yapi-market": [
    "OTO, BAHÇE, YAPI MARKET", "Bahçe", "Elektrikli Alet / El Aletleri", "El Aletleri", "Motosiklet Aksesuarları", "Oto Aksesuar",
  ],
  "spor-outdoor": [
    "SPOR OUTDOOR", "Spor Ürünleri", "Spor Giyim & Aksesuar", "Spor Ayakkabıları", "Paten, Kaykay & Scooter",
  ],
  "supermarket": [
    "SÜPERMARKET PETSHOP", "Gıda Ürünleri", "Deterjan & Temizlik Ürünleri", "Bebek Bezleri & Alt Açma",
  ],
  "petshop": [
    "Evcil Hayvan Malzemeleri", "Petshop",
  ],
  "kitap-muzik-film-hobi": [
    "KİTAP, MÜZİK FİLM, HOBİ", "Kitap & Dergi", "Müzik Enstrümanları ve Ekipmanları", "Hobi & Oyun",
  ],
  "ofis-kirtasiye": [
    "Ofis / Kırtasiye", "Kağıt ve Parti Malzemeleri",
  ],
  "moda-taki": [
    "MODA TAKI", "Takı", "Saatler",
  ],
  "saglik-medikal": [
    "Sağlık & Medikal",
  ],
  "hediyeler": [
    "Hediyeler",
  ],
};

// Türkçe -> slug
function normalizeSlug(s: string) {
  return s
    .toLowerCase()
    .replaceAll(" & ", " ")
    .replaceAll("&", " ")
    .replaceAll("/", " ")
    .replaceAll(/[ğ]/g, "g")
    .replaceAll(/[ü]/g, "u")
    .replaceAll(/[ş]/g, "s")
    .replaceAll(/[ı]/g, "i")
    .replaceAll(/[ö]/g, "o")
    .replaceAll(/[ç]/g, "c")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// Basit cache’ler
const categoryIdBySlugCache = new Map<string, string>();   // exact Woo slug -> id
const aliasToIdsCache = new Map<string, string[]>();        // UI slug -> id[]

async function getCategoryIdByExactSlug(slug: string): Promise<string | null> {
  if (categoryIdBySlugCache.has(slug)) return categoryIdBySlugCache.get(slug)!;
  try {
    const u = new URL("/wp-json/wc/v3/products/categories", process.env.WC_BASE_URL);
    u.searchParams.set("slug", slug);
    u.searchParams.set("per_page", "1");
    const r = await wooFetch(u);
    if (!r.ok) return null;
    const arr = (await r.json()) as any[];
    const id = arr?.[0]?.id ? String(arr[0].id) : null;
    if (id) categoryIdBySlugCache.set(slug, id);
    return id;
  } catch {
    return null;
  }
}

async function searchCategoryIdsByNames(names: string[]): Promise<string[]> {
  // Woo tarafında isimler sluga birebir uymayabilir; search ile yakalıyoruz.
  const found = new Set<string>();
  for (const name of names) {
    try {
      const u = new URL("/wp-json/wc/v3/products/categories", process.env.WC_BASE_URL);
      u.searchParams.set("search", name);
      u.searchParams.set("per_page", "50");
      const r = await wooFetch(u);
      if (!r.ok) continue;
      const arr = (await r.json()) as any[];
      for (const c of arr) {
        // en üst veya aradığımız “gruba” denk gelenleri toplayalım
        found.add(String(c.id));
      }
    } catch {}
  }
  return [...found];
}

// UI’dan gelen kategori ifadesini Woo’da ID’lere çevir
async function resolveCategoryIds(input?: string): Promise<string[] | null> {
  if (!input) return null;
  const uiSlug = normalizeSlug(input);

  // 1) Doğrudan Woo slug’ı verildiyse
  const directId = await getCategoryIdByExactSlug(uiSlug);
  if (directId) return [directId];

  // 2) Alias (bizim ana sekmeler)
  if (MAIN_CATEGORY_ALIASES[uiSlug]) {
    if (aliasToIdsCache.has(uiSlug)) return aliasToIdsCache.get(uiSlug)!;
    const ids = await searchCategoryIdsByNames(MAIN_CATEGORY_ALIASES[uiSlug]);
    if (ids.length) {
      aliasToIdsCache.set(uiSlug, ids);
      return ids;
    }
  }

  // 3) “Adı” direkt verilmiş olabilir (ör: “Ev & Yaşam”)
  const byNameIds = await searchCategoryIdsByNames([input]);
  if (byNameIds.length) return byNameIds;

  return null;
}

// -------------------- PUBLIC API --------------------
export async function listProducts(params: ListParams = {}): Promise<ListResult> {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = params.pageSize ?? 12;
  const sort = params.sort ?? "newest";

  if (!hasWoo) return mockList({ ...params, page, pageSize, sort });

  try {
    // Birden fazla kategori (örn. ayakkabi-canta) -> ayrı çağrılar, sonra birleştir
    const categoryIds = await resolveCategoryIds(params.category);
    const orderby = sort === "price-asc" || sort === "price-desc" ? "price" : "date";
    const order = sort === "price-asc" ? "asc" : "desc";

    // Tek kategori -> normal istek
    if (!categoryIds || categoryIds.length <= 1) {
      const u = new URL("/wp-json/wc/v3/products", process.env.WC_BASE_URL);
      u.searchParams.set("page", String(page));
      u.searchParams.set("per_page", String(pageSize));
      u.searchParams.set("status", "publish");
      u.searchParams.set("orderby", orderby);
      u.searchParams.set("order", order);
      if (categoryIds?.[0]) u.searchParams.set("category", categoryIds[0]);

      const r = await wooFetch(u);
      if (!r.ok) {
        const text = await r.text().catch(() => "");
        console.error("Woo listProducts failed:", r.status, text.slice(0, 300));
        return mockList({ ...params, page, pageSize, sort });
      }

      const raw = (await r.json()) as any[];
      const items: Product[] = raw.map((it) => ({
        id: String(it.id),
        title: it.name,
        price: Number(it.price ?? it.regular_price ?? 0),
        image: it.images?.[0]?.src ?? PLACEHOLDER_IMG,
        rating: Number(it.average_rating ?? 0) || undefined,
        description: stripHtml(it.short_description),
        category: it.categories?.[0]?.slug,
      }));

      const total = Number(r.headers.get("x-wp-total") ?? items.length);
      return { items, page, pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) };
    }

    // Çoklu ana kategori -> her id için çek, birleştir, sırala, sayfala
    const chunks: Product[] = [];
    for (const cid of categoryIds) {
      const u = new URL("/wp-json/wc/v3/products", process.env.WC_BASE_URL);
      u.searchParams.set("page", "1"); // iç birleştirme yapacağımız için 1. sayfadan bolca çekelim
      u.searchParams.set("per_page", String(Math.max(pageSize, 24)));
      u.searchParams.set("status", "publish");
      u.searchParams.set("orderby", orderby);
      u.searchParams.set("order", order);
      u.searchParams.set("category", cid);

      const r = await wooFetch(u);
      if (!r.ok) continue;
      const raw = (await r.json()) as any[];
      const items = raw.map((it) => ({
        id: String(it.id),
        title: it.name,
        price: Number(it.price ?? it.regular_price ?? 0),
        image: it.images?.[0]?.src ?? PLACEHOLDER_IMG,
        rating: Number(it.average_rating ?? 0) || undefined,
        description: stripHtml(it.short_description),
        category: it.categories?.[0]?.slug,
      })) as Product[];
      chunks.push(...items);
    }

    // tekilleştir (aynı ürün birden fazla üst kategoriye düşebilir)
    const uniqMap = new Map<string, Product>();
    for (const p of chunks) uniqMap.set(p.id, p);
    let merged = Array.from(uniqMap.values());

    // sıralama
    if (sort === "price-asc") merged.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") merged.sort((a, b) => b.price - a.price);
    else if (sort === "rating-desc") merged.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    // newest -> Woo’dan gelen sırayı koruyoruz (order=desc, date)

    return paginate(merged, page, pageSize);
  } catch (err) {
    console.error("Woo listProducts error:", err);
    return mockList({ ...params, page, pageSize, sort });
  }
}

export async function getProduct(idOrSlug: string): Promise<Product | null> {
  // mock id'ler (p-101 vs.) Woo açık olsa bile mock'tan dön
  const mockHit = idOrSlug.startsWith("p-") ? MOCK.find((m) => m.id === idOrSlug) : undefined;
  if (mockHit) return mockHit;

  if (!hasWoo) return MOCK.find((p) => p.id === idOrSlug) ?? null;

  try {
    const isNumericId = /^\d+$/.test(idOrSlug);

    if (isNumericId) {
      const u = new URL(`/wp-json/wc/v3/products/${idOrSlug}`, process.env.WC_BASE_URL);
      const r = await wooFetch(u);
      if (!r.ok) {
        const text = await r.text().catch(() => "");
        console.error("Woo getProduct (id) failed:", r.status, text.slice(0, 300));
        return null;
      }
      const it = await r.json();
      return {
        id: String(it.id),
        title: it.name,
        price: Number(it.price ?? it.regular_price ?? 0),
        image: it.images?.[0]?.src ?? PLACEHOLDER_IMG,
        rating: Number(it.average_rating ?? 0) || undefined,
        description: stripHtml(it.description),
        category: it.categories?.[0]?.slug,
      };
    }

    // slug ile
    const u = new URL(`/wp-json/wc/v3/products`, process.env.WC_BASE_URL);
    u.searchParams.set("slug", normalizeSlug(idOrSlug));
    u.searchParams.set("per_page", "1");
    const r = await wooFetch(u);
    if (!r.ok) {
      const text = await r.text().catch(() => "");
      console.error("Woo getProduct (slug) failed:", r.status, text.slice(0, 300));
      return null;
    }
    const arr = (await r.json()) as any[];
    const it = arr?.[0];
    if (!it) return null;

    return {
      id: String(it.id),
      title: it.name,
      price: Number(it.price ?? it.regular_price ?? 0),
      image: it.images?.[0]?.src ?? PLACEHOLDER_IMG,
      rating: Number(it.average_rating ?? 0) || undefined,
      description: stripHtml(it.description),
      category: it.categories?.[0]?.slug,
    };
  } catch (e) {
    console.error("Woo getProduct error:", e);
    return null;
  }
}
