"use client";
import Link from "next/link";
import { useMemo } from "react";
import type { ComponentType, SVGProps } from "react";
import {
  LayoutDashboard,
  Activity,
  PackageSearch,
  ShoppingCart,
  Wallet,
  FileCog,
  BarChart3,
  LifeBuoy,
  MessageSquareText,
  HelpCircle,
  RotateCcw,
  Star,
  BadgeCheck,
  Crown,
  Headphones,
  Braces,
  Plug,
  Megaphone,
  Tag,
  Percent,
  PieChart,
  DownloadCloud,
  Truck,
  Sparkles,
  GraduationCap,
  Bell,
  LogOut,
} from "lucide-react";

export default function VendorDashboard() {
  const metrics = {
    ordersPending: 8,
    liveSupportUnread: 2,
    ordersRecent: 31,
    followers: 3,
  } as const;

  const items = useMemo(
    () =>
      [
        { key: "panel", label: "Gösterge Paneli", href: "/partner/dashboard", icon: LayoutDashboard },
        { key: "status", label: "Güncel Durum", href: "/partner/status", icon: Activity },
        { key: "products", label: "Ürünler", href: "/partner/products", icon: PackageSearch },
        { key: "orders", label: "Siparişler", href: "/partner/orders", icon: ShoppingCart, badge: String(metrics.ordersPending) },
        { key: "withdraw", label: "Para Çekme", href: "/partner/withdraw", icon: Wallet },

        { key: "gib", label: "GİB Ayarları", href: "/partner/gib", icon: FileCog },
        { key: "reports", label: "Raporlar", href: "/partner/reports", icon: BarChart3 },
        { key: "product-support", label: "Ürün Destekleri", href: "/partner/product-support", icon: LifeBuoy },
        { key: "reviews", label: "Yorumlarım", href: "/partner/reviews", icon: MessageSquareText },
        { key: "qa", label: "Soru Cevaplarım", href: "/partner/questions", icon: HelpCircle },

        { key: "refund", label: "İptal / İade", href: "/partner/refunds", icon: RotateCcw },
        { key: "score", label: "Mağaza Puanım", href: "/partner/store-score", icon: Star },
        { key: "brand-docs", label: "Marka Belgelerim", href: "/partner/brand-docs", icon: BadgeCheck },
        { key: "brand-owner", label: "Marka Sahibi Portalı", href: "/partner/brand-owner", icon: Crown },
        { key: "live", label: "Canlı Destek", href: "/partner/live", icon: Headphones, badge: String(metrics.liveSupportUnread) },

        { key: "api-calls", label: "API Çağrılarım", href: "/partner/api/calls", icon: Braces },
        { key: "api-access", label: "API Erişim Talebi", href: "/partner/api/access", icon: Plug },
        { key: "campaigns", label: "Kampanyalar", href: "/partner/campaigns", icon: Megaphone },
        { key: "ads", label: "Reklamlar", href: "/partner/ads", icon: Tag },
        { key: "coupons", label: "Kuponlar", href: "/partner/coupons", icon: Percent },

        { key: "profit", label: "Kârlılık", href: "/partner/profit", icon: PieChart },
        { key: "import", label: "Ürün Çek", href: "/partner/import", icon: DownloadCloud },
        { key: "sla", label: "SLA & Kargo", href: "/partner/sla-shipping", icon: Truck },
        { key: "score2", label: "Ürün Skoru", href: "/partner/product-score", icon: Sparkles },
        { key: "edu", label: "Eğitim", href: "/partner/edu", icon: GraduationCap },

        { key: "bulletins", label: "Duyurular", href: "/partner/announcements", icon: Bell },
        { key: "logout", label: "Çıkış", href: "/logout", icon: LogOut },
      ] as const,
    [metrics.liveSupportUnread, metrics.ordersPending]
  );

  return (
    <section className="space-y-6 p-6">
      <VendorHeader followers={metrics.followers} recentOrders={metrics.ordersRecent} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((it) => (
          <CardLink key={it.key} href={it.href} label={it.label} Icon={it.icon} badge={it.badge} />
        ))}
      </div>
    </section>
  );
}

function VendorHeader({ followers, recentOrders }: { followers: number; recentOrders: number }) {
  return (
    <div className="rounded-2xl bg-slate-900 text-white p-5 shadow-sm ring-1 ring-white/10 flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-white/10 grid place-items-center">
        <span className="text-2xl">🔔</span>
      </div>
      <div className="flex-1">
        <div className="text-lg font-semibold leading-tight">Digital Sipariş</div>
        <div className="text-xs text-white/70">Yeni Üye • Skor: 0</div>
        <div className="text-xs text-white/70 mt-1">
          Takipçi: {followers} • Son 30 gün sipariş: {recentOrders}
        </div>
      </div>
      <span className="inline-flex items-center rounded-full bg-emerald-500/15 text-emerald-300 text-xs px-2.5 py-1 ring-1 ring-inset ring-emerald-400/30">
        Aktif
      </span>
    </div>
  );
}

function CardLink({
  href,
  label,
  Icon,
  badge,
}: {
  href: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl bg-white ring-1 ring-slate-200/70 hover:ring-slate-300 transition shadow-sm p-4 flex items-center gap-3"
    >
      <div className="w-10 h-10 rounded-2xl grid place-items-center ring-1 ring-slate-200/70 bg-gradient-to-br from-slate-50 to-slate-100">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 font-medium text-slate-800">{label}</div>

      <div className="ml-auto flex items-center gap-2">
        {badge && (
          <span className="min-w-[1.5rem] h-6 px-2 inline-flex items-center justify-center text-xs rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
            {badge}
          </span>
        )}
        <span className="text-xs px-3 py-1.5 rounded-xl ring-1 ring-slate-200 text-slate-700 bg-slate-50 group-hover:bg-slate-100">
          Aç
        </span>
      </div>
    </Link>
  );
}
