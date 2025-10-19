"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartButton() {
  const [count, setCount] = useState<number>(0);

  async function refreshCount() {
    try {
      const res = await fetch("/api/cart", { cache: "no-store", credentials: "include" });
      if (!res.ok) return;
      const data = await res.json();
      const items = data?.items || data?.cartItems || [];
      setCount(items.length || 0);
    } catch {}
  }

  useEffect(() => {
    refreshCount(); // ilk yüklemede çek
    // Sepete Ekle’den sonra veya başka sayfalarda tetiklemek için:
    const onUpd = () => refreshCount();
    window.addEventListener("ds-cart-updated", onUpd);
    return () => window.removeEventListener("ds-cart-updated", onUpd);
  }, []);

  return (
    <Link href="/shop/cart" className="relative inline-flex items-center gap-2">
      <ShoppingCart size={18} />
      <span>Sepetim</span>
      {count > 0 && (
        <span className="ml-1 rounded-full px-1.5 text-xs bg-amber-500 text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
