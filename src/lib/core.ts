// src/lib/core.ts

// ── Tipler ────────────────────────────────────────────────────────────────────
export type Product = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  image: string;
  images?: string[];
  price?: number;
  category?: string; // slug
  rating?: number;
  attributes?: { name: string; value: string }[];
  variants?: { colors?: { name: string; thumb: string }[]; sizes?: string[] };
};

export type ProductList = { items: Product[]; total: number; page: number; pageSize: number };

export type Offer = {
  vendorId: string;
  vendorName: string;
  vendorScore?: number;
  price: number;
  shippingBadge?: string;
  isBest?: boolean;
};

export type PartnerApplication = {
  id: string;
  flow: 'download' | 'marketplace' | 'market';
  companyName: string;
  email: string;
  phone?: string;
  companyType?: string;
  province?: string;
  district?: string;
  category?: string;
  refCode?: string;
  status: 'received' | 'review' | 'approved' | 'rejected';
  createdAt: string;
};

// ── Base URL seçimi ───────────────────────────────────────────────────────────
// 1) Varsayılan: /api  (Next.js rewrites ile CORS'suz proxy)
// 2) Eğer .env'de NEXT_PUBLIC_CORE_API_BASE verilmişse onu dener,
//    AĞ HATASI (ECONNREFUSED/TypeError) olursa otomatik /api'ye düşer.
const ENV_BASE_RAW = (process.env.NEXT_PUBLIC_CORE_API_BASE || '').trim();
const ENV_BASE = ENV_BASE_RAW.replace(/\/+$/, '');
const DEFAULT_BASE = '/api';

// iç kullanım için iki aday base:
const PRIMARY_BASE = ENV_BASE || DEFAULT_BASE;
const FALLBACK_BASE = PRIMARY_BASE === DEFAULT_BASE ? '' : DEFAULT_BASE; // env varsa /api fallback

type ApiInit = RequestInit & { timeoutMs?: number };

const joinUrl = (base: string, path: string) =>
  `${base}${path.startsWith('/') ? '' : '/'}${path}`;

/** Ağ (network) hatası mı? Status < 400 değil; fetch seviyesinde patlar */
function isNetworkError(e: unknown) {
  const msg = (e as any)?.message || '';
  const name = (e as any)?.name || '';
  // Node fetch: TypeError + ECONNREFUSED / aborted vs.
  return name === 'TypeError' || /ECONNREFUSED|ENOTFOUND|EAI_AGAIN|aborted/i.test(msg);
}

async function doFetch<T>(base: string, path: string, init: ApiInit): Promise<T> {
  const url = joinUrl(base, path);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), init.timeoutMs ?? 10_000);

  try {
    const res = await fetch(url, {
      ...init,
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(init.headers || {}),
      },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status} ${res.statusText} @ ${url}\n${text}`);
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

/** Dışa açık API helper: önce PRIMARY_BASE, ağ hatasıysa FALLBACK_BASE */
async function api<T>(path: string, init: ApiInit = {}): Promise<T> {
  try {
    return await doFetch<T>(PRIMARY_BASE, path, init);
  } catch (e) {
    // Sadece AĞ HATASINDA fallback dene (örn. ::1:4000 ECONNREFUSED)
    if (FALLBACK_BASE && isNetworkError(e)) {
      return await doFetch<T>(FALLBACK_BASE, path, init);
    }
    // Diğer hatalarda (HTTP 4xx/5xx) aynen fırlat
    throw e;
  }
}

// ── Public client ─────────────────────────────────────────────────────────────
export const coreClient = {
  listProducts: (q: URLSearchParams) =>
    api<ProductList>(`/catalog/products?${q.toString()}`),

  getProduct: (idOrSlug: string) =>
    api<Product>(`/catalog/products/${encodeURIComponent(idOrSlug)}`),

  getOffers: (productId: string) =>
    api<Offer[]>(`/catalog/products/${encodeURIComponent(productId)}/offers`),

  submitPartnerApplication: (
    payload: Omit<PartnerApplication, 'id' | 'status' | 'createdAt'>
  ) =>
    api<{ ok: boolean; id: string; message: string }>(`/applications`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
