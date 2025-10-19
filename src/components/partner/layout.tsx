import PartnerHeader from "@/components/partner/PartnerHeader";

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* üst bar */}
      {/* @ts-expect-error Server Component */}
      <PartnerHeader />
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
