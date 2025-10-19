"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  Search,
  UserRound,
  Heart,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";

/** Ana kategori şeridi */
const MAIN_CATEGORIES: { label: string; slug: string }[] = [
  { label: "Kadın", slug: "kadin" },
  { label: "Erkek", slug: "erkek" },
  { label: "Anne & Çocuk", slug: "anne-cocuk" },
  { label: "Ev & Yaşam", slug: "ev-ve-yasam" },
  { label: "Süpermarket", slug: "supermarket" },
  { label: "Kozmetik", slug: "kozmetik-kisisel-bakim" },
  { label: "Ayakkabı & Çanta", slug: "ayakkabi-canta" },
  { label: "Elektronik", slug: "elektronik" },
  { label: "Spor & Outdoor", slug: "spor-outdoor" },
  { label: "Oto, Bahçe & Yapı Market", slug: "oto-bahce-yapi-market" },
  { label: "Ofis & Kırtasiye", slug: "ofis-kirtasiye" },
  { label: "Evcil Hayvan", slug: "evcil-hayvan-malzemeleri" },
  { label: "Takı & Saat", slug: "taki-saat" },
  { label: "Sağlık & Medikal", slug: "saglik-medikal" },
  { label: "Hediyeler", slug: "hediyeler" },
];

/** Mega dropdown içinde göstereceğimiz (kısa) alt kırılımlar — örnek */
const SUBMAP: Record<string, string[]> = {
  "Kadın": ["Giyim", "Ayakkabı", "Çanta & Aksesuar", "Ev & İç Giyim", "Tesettür"],
  "Erkek": ["Giyim", "Ayakkabı", "Çanta & Aksesuar", "Kişisel Bakım"],
  "Anne & Çocuk": ["Bebek", "Kız Çocuk", "Erkek Çocuk", "Bebek Bakım", "Taşıma & Güvenlik"],
  "Ev & Yaşam": ["Ev Tekstili", "Ev Dekorasyonu", "Ev Gereçleri", "Sofra & Mutfak", "Mobilya"],
  "Kozmetik": ["Makyaj", "Cilt Bakımı", "Saç Bakımı", "Parfüm & Deodorant"],
  "Elektronik": ["Telefon", "Bilgisayar", "TV & Projeksiyon", "Ses", "Aksesuar"],
  "Spor & Outdoor": ["Spor Giyim", "Spor Ayakkabı", "Ekipman", "Fitness & Yoga"],
  "Ayakkabı & Çanta": ["Kadın Ayakkabı", "Erkek Ayakkabı", "Sırt Çantası", "Omuz Çantası"],
  "Oto, Bahçe & Yapı Market": ["Bahçe", "El Aletleri", "Oto Aksesuar", "İş Güvenliği"],
  "Ofis & Kırtasiye": ["Kırtasiye", "Ofis Mobilyaları", "Okul Ürünleri"],
  "Evcil Hayvan": ["Kedi", "Köpek", "Kuş", "Akvaryum", "Aksesuar"],
  "Takı & Saat": ["Kolye", "Küpe", "Bileklik", "Saat"],
  "Sağlık & Medikal": ["Medikal Ürünler", "Ortopedi", "Cinsel Sağlık"],
  "Süpermarket": ["Gıda", "İçecek", "Temizlik", "Kağıt Ürünleri"],
  "Hediyeler": ["Doğum Günü", "Yıldönümü", "Kişiselleştirilmiş"],
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replaceAll(/[ğüşıöç]/g, (m) => ({ ğ: "g", ü: "u", ş: "s", ı: "i", ö: "o", ç: "c" } as any)[m])
    .replace(/[^a-z0-9\s\-&]/g, "")
    .replace(/\s*&\s*/g, "-")
    .replace(/\s+/g, "-");
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // dışarı tıklama & ESC kapatma
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur" ref={wrapRef}>
      {/* Üst satır: Logo - Arama - Kısa menü */}
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
        <div className="flex items-center gap-4 py-3">
          <Link href="/shop" className="shrink-0 font-semibold text-2xl">
            Digital <span className="text-slate-600">Sipariş</span>
          </Link>

          <form
            action="/shop/search"
            className="hidden md:flex items-center gap-2 flex-1 rounded-2xl bg-slate-100 ring-1 ring-slate-200/80 focus-within:ring-slate-300 px-3 py-2"
          >
            <Search className="size-5 shrink-0 text-slate-500" />
            <input
              name="q"
              placeholder="Aradığınız ürün, kategori veya markayı yazınız"
              className="w-full bg-transparent outline-none text-sm placeholder:text-slate-500"
              autoComplete="off"
            />
          </form>

          <nav className="ml-auto flex items-center gap-5 text-sm">
            <Link href="/shop/login" className="flex items-center gap-2 hover:text-amber-600">
              <UserRound className="size-5" />
              <span className="hidden sm:inline">Giriş Yap</span>
            </Link>
            <Link href="/shop/favorites" className="flex items-center gap-2 hover:text-amber-600">
              <Heart className="size-5" />
              <span className="hidden sm:inline">Favorilerim</span>
            </Link>
            <Link href="/shop/cart" className="flex items-center gap-2 hover:text-amber-600">
              <ShoppingCart className="size-5" />
              <span className="hidden sm:inline">Sepetim</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Kategori satırı + Mega menü */}
      <div className="border-t bg-white/90">
        <div className="relative mx-auto w-full max-w-7xl px-4 lg:px-6">
          <div className="flex items-center gap-4 py-2 overflow-x-auto">
            {/* TÜM KATEGORİLER */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              <Menu className="size-5" />
              <span className="text-sm font-medium">TÜM KATEGORİLER</span>
              <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-red-600/10 px-2 py-0.5 text-[10px] font-semibold text-red-700 ring-1 ring-red-200">
                Yeni
              </span>
              <ChevronDown className={`size-4 text-slate-500 transition ${open ? "rotate-180" : ""}`} />
            </button>

            {/* Hızlı ana kategoriler */}
            <nav className="flex items-center gap-5 text-sm">
              {MAIN_CATEGORIES.slice(0, 8).map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop/category/${c.slug}`}
                  className="whitespace-nowrap hover:text-amber-600"
                >
                  {c.label}
                </Link>
              ))}
              <Link href="/shop/best-sellers" className="whitespace-nowrap hover:text-amber-600">
                Çok Satanlar
                <span className="ml-1 align-middle inline-flex items-center gap-1 rounded-full bg-red-600/10 px-1.5 py-[2px] text-[10px] font-semibold text-red-700 ring-1 ring-red-200">
                  Yeni
                </span>
              </Link>
              <Link href="/shop/flash" className="whitespace-nowrap hover:text-amber-600">
                Flaş Ürünler
                <span className="ml-1 align-middle inline-flex items-center gap-1 rounded-full bg-red-600/10 px-1.5 py-[2px] text-[10px] font-semibold text-red-700 ring-1 ring-red-200">
                  Hot
                </span>
              </Link>
            </nav>

            {/* Mobil arama */}
            <form
              action="/shop/search"
              className="md:hidden ml-auto flex items-center gap-2 rounded-xl bg-slate-100 ring-1 ring-slate-200/80 px-2 py-1.5"
            >
              <Search className="size-5 text-slate-600" />
              <input name="q" placeholder="Ara" className="w-28 bg-transparent outline-none text-sm" />
            </form>
          </div>

          {/* MEGA DROPDOWN */}
          {open && (
            <div
              className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 rounded-2xl border bg-white shadow-xl ring-1 ring-black/5"
              role="menu"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 max-h-[60vh] overflow-auto">
                {MAIN_CATEGORIES.map((cat) => (
                  <div key={cat.slug} className="min-w-[200px]">
                    <Link
                      href={`/shop/category/${cat.slug}`}
                      className="font-semibold text-slate-900 hover:text-amber-600"
                    >
                      {cat.label}
                    </Link>
                    <ul className="mt-2 space-y-1 text-sm text-slate-600">
                      {(SUBMAP[cat.label] ?? []).map((sublabel) => (
                        <li key={sublabel}>
                          <Link
                            href={`/shop/category/${cat.slug}/${slugify(sublabel)}`}
                            className="hover:text-amber-600"
                          >
                            {sublabel}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
