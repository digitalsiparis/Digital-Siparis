// basit fetcher + mock fallback
const API = process.env.NEXT_PUBLIC_API_URL ?? "";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const url = API ? `${API}${path}` : path;
  try {
    const res = await fetch(url, { next: { revalidate: 60 }, ...init });
    if (!res.ok) throw new Error(await res.text());
    return res.json() as Promise<T>;
  } catch {
    // Mock fallback (API hazır olana kadar)
    if (path.startsWith("/v1/products")) {
      // /v1/products or /v1/products/[slug]
      const mock = [
        { id: "p1", slug: "telefon-x", title: "Telefon X", price: 12999, image: "/mock/phone.jpg", vendor: { slug:"magaza-ali", name:"Mağaza Ali" } },
        { id: "p2", slug: "kulaklik-pro", title: "Kulaklık Pro", price: 1999, image: "/mock/headset.jpg", vendor: { slug:"ses-market", name:"Ses Market" } },
      ];
      if (path.includes("?")) return mock as any;
      const slug = path.split("/").pop();
      return (mock.find(m => m.slug === slug) ?? mock[0]) as any;
    }
    if (path.startsWith("/v1/vendors/")) {
      const slug = path.split("/").pop();
      return {
        slug, name: slug?.replace("-", " ").toUpperCase(), rating: 4.7,
        products: [
          { id:"p1", slug:"telefon-x", title:"Telefon X", price:12999, image:"/mock/phone.jpg" }
        ]
      } as any;
    }
    throw new Error("Mock yok");
  }
}

export const api = {
  listProducts: (q = "") => http<any[]>("/v1/products" + (q ? `?q=${encodeURIComponent(q)}`:"")),
  getProduct: (slug: string) => http<any>(`/v1/products/${slug}`),
  getVendor:  (slug: string) => http<any>(`/v1/vendors/${slug}`),
};
