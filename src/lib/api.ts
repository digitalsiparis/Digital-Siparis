export type Product = {
  id: string; slug: string; title: string; price: number; currency: string;
  images: string[]; category?: string; vendorSlug?: string; stock?: number;
};

export type ListProductsInput = {
  q?: string; min?: number; max?: number; sort?: 'price_asc'|'price_desc'|'newest';
  category?: string; page?: number; perPage?: number;
};

export function buildProductsQuery(params: ListProductsInput = {}): string {
  const qs = new URLSearchParams();
  (Object.entries(params) as [keyof ListProductsInput, any][])
    .forEach(([k,v])=>{ if (v === undefined || v === null || v === '') return; qs.set(String(k), String(v)); });
  return qs.toString();
}

export async function listProducts(params: ListProductsInput = {}){
  const qs = buildProductsQuery(params);
  const r = await fetch(`/api/v1/products?${qs}`, {cache:'no-store'});
  if (!r.ok) throw new Error('listProducts failed');
  return r.json();
}

export async function getProduct(slug: string){
  const r = await fetch(`/api/v1/products/${slug}`, {cache:'no-store'});
  if (!r.ok) throw new Error('getProduct failed');
  return r.json();
}

export async function getVendor(slug: string){
  const r = await fetch(`/api/v1/vendors/${slug}`, {cache:'no-store'});
  if (!r.ok) throw new Error('getVendor failed');
  return r.json();
}