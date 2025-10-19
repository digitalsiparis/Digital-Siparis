"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Menu, Search, UserRound, Heart, ShoppingCart, ChevronDown } from "lucide-react";

type Me = { id: number; name: string; email?: string } | null;

function slugify(s: string) {
  return s
    .toLowerCase()
    .replaceAll(/[ğüşıöç]/g, (m) => ({ ğ: "g", ü: "u", ş: "s", ı: "i", ö: "o", ç: "c" } as any)[m])
    .replace(/\s+/g, "-");
}

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [me, setMe] = useState<Me>(null);

  const topCats = useMemo(
    () => ["Kadın","Erkek","Anne & Çocuk","Ev & Yaşam","Süpermarket","Kozmetik","Ayakkabı & Çanta","Elektronik","Çok Satanlar","Flaş Ürünler"],
    []
  );

  async function refreshCart() {
    try {
      const r = await fetch("/api/cart", { cache: "no-store", credentials: "include" });
      if (!r.ok) return;
      const d = await r.json();
      const items = d?.items || d?.cartItems || [];
      setCartCount(items.length || 0);
    } catch {}
  }
  function refreshFavs() {
    try {
      const arr = JSON.parse(localStorage.getItem("ds_favs") || "[]");
      setFavCount(Array.isArray(arr) ? arr.length : 0);
    } catch { setFavCount(0); }
  }
  async function refreshMe() {
    try {
      const r = await fetch("/api/me", { cache: "no-store", credentials: "include" });
      setMe(r.ok ? (await r.json())?.user ?? null : null);
    } catch { setMe(null); }
  }

  useEffect(() => {
    refreshCart(); refreshFavs(); refreshMe();
    const onCart = () => refreshCart();
    const onFav  = () => refreshFavs();
    window.addEventListener("ds-cart-updated", onCart);
    window.addEventListener("ds-favs-updated", onFav);
    return () => {
      window.removeEventListener("ds-cart-updated", onCart);
      window.removeEventListener("ds-favs-updated", onFav);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      {/* Üst satır */}
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
        <div className="flex items-center gap-4 py-3">
          {/* Logo */}
          <Link href="/shop" className="shrink-0 font-semibold text-2xl">
            Digital <span className="text-slate-600">Sipariş</span>
          </Link>

          {/* Arama */}
          <form action="/shop/search" className="hidden md:flex items-center gap-2 flex-1 rounded-2xl bg-slate-100 ring-1 ring-slate-200/80 focus-within:ring-slate-300 px-3 py-2">
            <Search className="size-5 shrink-0 text-slate-500" />
            <input name="q" placeholder="Aradığınız ürün, kategori veya markayı yazınız" className="w-full bg-transparent outline-none text-sm placeholder:text-slate-500" autoComplete="off" />
          </form>

          {/* Sağ menü */}
          <nav className="ml-auto flex items-center gap-5 text-sm">
            {me ? (
              <Link href="/shop/account" className="flex items-center gap-2 hover:text-amber-600">
                <UserRound className="size-5" />
                <span className="hidden sm:inline">Hesabım</span>
              </Link>
            ) : (
              <Link href="/shop/login" className="flex items-center gap-2 hover:text-amber-600">
                <UserRound className="size-5" />
                <span className="hidden sm:inline">Giriş Yap</span>
              </Link>
            )}

            <Link href="/shop/favorites" className="relative flex items-center gap-2 hover:text-amber-600">
              <Heart className="size-5" />
              <span className="hidden sm:inline">Favorilerim</span>
              {favCount > 0 && <span className="absolute -top-2 -right-3 rounded-full bg-amber-500 text-white text-[10px] px-1.5 py-0.5">{favCount}</span>}
            </Link>

            <Link href="/shop/cart" className="relative flex items-center gap-2 hover:text-amber-600">
              <ShoppingCart className="size-5" />
              <span className="hidden sm:inline">Sepetim</span>
              {cartCount > 0 && <span className="absolute -top-2 -right-3 rounded-full bg-amber-500 text-white text-[10px] px-1.5 py-0.5">{cartCount}</span>}
            </Link>
          </nav>
        </div>
      </div>

      {/* Alt satır: Kategori şeridi */}
      <div className="border-t bg-white/90">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
          <div className="flex items-center gap-4 py-2 overflow-x-auto">
            <button type="button" className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 ring-1 ring-slate-200 hover:bg-slate-50">
              <Menu className="size-5" />
              <span className="text-sm font-medium">TÜM KATEGORİLER</span>
              <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-red-600/10 px-2 py-0.5 text-[10px] font-semibold text-red-700 ring-1 ring-red-200">Yeni</span>
              <ChevronDown className="size-4 text-slate-500" />
            </button>

            <nav className="flex items-center gap-5 text-sm">
              {topCats.map((c) => (
                <Link
                  key={c}
                  href={c === "Çok Satanlar" ? "/shop/best-sellers" : c === "Flaş Ürünler" ? "/shop/flash" : `/shop/category/${slugify(c)}`}
                  className="whitespace-nowrap hover:text-amber-600"
                >
                  {c}
                  {(c === "Çok Satanlar" || c === "Flaş Ürünler") && (
                    <span className="ml-1 align-middle inline-flex items-center gap-1 rounded-full bg-red-600/10 px-1.5 py-[2px] text-[10px] font-semibold text-red-700 ring-1 ring-red-200">Yeni</span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobil arama */}
            <form action="/shop/search" className="md:hidden ml-auto flex items-center gap-2 rounded-xl bg-slate-100 ring-1 ring-slate-200/80 px-2 py-1.5">
              <Search className="size-5 text-slate-600" />
              <input name="q" placeholder="Ara" className="w-28 bg-transparent outline-none text-sm" />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
