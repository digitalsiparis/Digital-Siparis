import { getPartnerUser, mockLogoutAction } from "@/lib/partner-auth";

export default async function PartnerHeader() {
  const user = getPartnerUser();

  return (
    <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="text-lg font-semibold">Digital Sipariş • Partner</div>

        {user ? (
          <form action={mockLogoutAction} className="flex items-center gap-3 text-sm">
            <span className="text-slate-700">Hoş geldin, <b>{user.name || user.email}</b></span>
            <button className="rounded-lg border px-3 py-1 hover:bg-slate-50" type="submit">Çıkış</button>
          </form>
        ) : (
          <a href="/partner/login" className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-50">
            Giriş Yap
          </a>
        )}
      </div>
    </header>
  );
}
