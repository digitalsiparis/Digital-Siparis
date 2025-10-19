import { mockLoginAction, getPartnerUser } from "@/lib/partner-auth";
import { redirect } from "next/navigation";

export default async function PartnerLoginPage() {
  const user = getPartnerUser();
  if (user) redirect("/partner");

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-2xl font-semibold">Partner Girişi</h1>
      <form action={mockLoginAction} className="space-y-4 rounded-2xl border bg-white p-4 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium">Ad Soyad</label>
          <input name="name" className="w-full rounded-xl border px-3 py-2" placeholder="Ad Soyad" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">E-posta</label>
          <input name="email" type="email" className="w-full rounded-xl border px-3 py-2" placeholder="ornek@firma.com" required />
        </div>
        <button className="h-11 w-full rounded-xl bg-amber-600 font-semibold text-white hover:bg-amber-700" type="submit">
          Giriş Yap
        </button>
      </form>

      <p className="text-sm text-slate-600">
        Henüz partner değil misiniz?{" "}
        <a href="/partner" className="font-medium text-amber-700 underline">Başvurunu başlat</a>
      </p>
    </div>
  );
}
