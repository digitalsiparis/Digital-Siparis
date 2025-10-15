export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  rating?: number;
  category?: string;
};

type ListParams = {
  category?: string;
  page?: number;   // 1-based
  pageSize?: number;
  sort?: "price-asc" | "price-desc" | "rating-desc" | "newest";
};

// Mock data (placeholder görseller public/images/p/*.jpg içinde)
const ALL: Product[] = [
  { id: "p-101", title: "Bluetooth Kulaklık Pro ANC", price: 899, image: "/images/p/1.jpg", rating: 4.6, category: "elektronik" },
  { id: "p-102", title: "Akıllı Saat X 44mm",        price: 1299, image: "/images/p/2.jpg", rating: 4.4, category: "elektronik" },
  { id: "p-103", title: "Robot Süpürge Max",         price: 5499, image: "/images/p/3.jpg", rating: 4.7, category: "elektronik" },
  { id: "p-104", title: "Dizüstü Bilgisayar 14\" i5",price: 15499,image: "/images/p/4.jpg", rating: 4.5, category: "elektronik" },
  { id: "p-201", title: "Kışlık Mont Su Geçirmez",   price: 1299, image: "/images/p/5.jpg", rating: 4.3, category: "giyim" },
  { id: "p-202", title: "Koşu Ayakkabısı",           price: 1399, image: "/images/p/9.jpg", rating: 4.4, category: "ayakkabi" },
  { id: "p-203", title: "Airfryer XL",               price: 3299, image: "/images/p/13.jpg",rating: 4.7, category: "ev" },
  { id: "p-204", title: "Akıllı Ampul Seti",         price: 299,  image: "/images/p/11.jpg",rating: 4.3, category: "elektronik" },
  { id: "p-205", title: "Ofis Sandalyesi Ergonomik", price: 2799, image: "/images/p/12.jpg",rating: 4.5, category: "ev" },
];

export async function listProducts(params: ListParams = {}) {
  const pageSize = params.pageSize ?? 12;
  const page = Math.max(1, params.page ?? 1);

  let rows = [...ALL];

  if (params.category) {
    rows = rows.filter(p => p.category === params.category);
  }

  switch (params.sort) {
    case "price-asc":   rows.sort((a,b)=> a.price - b.price); break;
    case "price-desc":  rows.sort((a,b)=> b.price - a.price); break;
    case "rating-desc": rows.sort((a,b)=> (b.rating ?? 0) - (a.rating ?? 0)); break;
    case "newest":
    default:
      // mock için değişiklik yok; gerçek API’de tarihe göre sırala
      break;
  }

  const total = rows.length;
  const start = (page - 1) * pageSize;
  const items = rows.slice(start, start + pageSize);

  return {
    items,
    page,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}
