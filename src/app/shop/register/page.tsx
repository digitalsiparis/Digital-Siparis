import Link from "next/link";
import { UserPlus, Mail, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { registerAction } from "./actions";
import SubmitButton from "../login/submit-button";
import PasswordField from "./password-field";

type Props = {
  searchParams?: { error?: string };
};

// ⬇️ Varsayılan export: Next App Router'ın istediği React bileşeni
export default function RegisterPage({ searchParams }: Props) {
  const err = searchParams?.error;

  return (
    <div className="min-h-[70vh] grid place-items-center">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-2 size-12 rounded-2xl bg-amber-500/10 ring-1 ring-amber-200 flex items-center justify-center">
              <UserPlus className="size-6 text-amber-600" />
            </div>
            <h1 className="text-xl font-semibold">Hesap Oluştur</h1>
            <p className="mt-1 text-sm text-slate-600">Alışverişe başlamak için hızlıca kayıt olun.</p>
          </div>

          <form action={registerAction} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium">Ad</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500">
                    <User className="size-5" />
                  </span>
                  <input
                    name="first_name"
                    required
                    placeholder="Adınız"
                    className="w-full rounded-xl border bg-white px-10 py-2.5 text-sm outline-none ring-1 ring-slate-200 focus:ring-amber-300"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Soyad</label>
                <input
                  name="last_name"
                  required
                  placeholder="Soyadınız"
                  className="w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none ring-1 ring-slate-200 focus:ring-amber-300"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">E-posta</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500">
                  <Mail className="size-5" />
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  inputMode="email"
                  placeholder="ornek@eposta.com"
                  className="w-full rounded-xl border bg-white px-10 py-2.5 text-sm outline-none ring-1 ring-slate-200 focus:ring-amber-300"
                />
              </div>
            </div>

            <PasswordField eye={<Eye className="size-5" />} eyeOff={<EyeOff className="size-5" />} />

            {err && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {err}
              </div>
            )}

            <SubmitButton>
              <Loader2 className="size-4 animate-spin" />
              Kayıt Ol
            </SubmitButton>
          </form>

          <div className="mt-4 text-center text-sm text-slate-600">
            Zaten hesabın var mı?{" "}
            <Link href="/shop/login" className="font-medium text-amber-700 hover:underline">
              Giriş yap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
