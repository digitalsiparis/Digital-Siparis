export type BundleItem = { id: string; title: string; image: string; price: number; };
export type Bundle = { items: BundleItem[]; savingText?: string; total: number; };

export async function getBundle(productId: string): Promise<Bundle | null> {
  // demo: ürün + çanta
  const items: BundleItem[] = [
    { id: productId, title: "Seçtiğin Ürün", image: "/images/p/1.jpg", price: 2336.9 },
    { id: "b-1001", title: "Kahverengi Shopper Omuz Çantası", image: "/images/p/7.jpg", price: 799 },
  ];
  const total = items.reduce((s, i) => s + i.price, 0) - 40; // 40 TL kazan
  return { items, savingText: "Kazancın: 40 TL", total };
}
