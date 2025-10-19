import Link from "next/link";
import { ShieldCheck, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { loginAction } from "./actions";
import PasswordField from "./password-field";
import SubmitButton from "./submit-button";

export default function LoginPage({ searchParams }: { searchParams?: { [k: string]: string | string[] } }) {
  const err = typeof searchParams?.error === "string" ? searchParams?.error : "";

  return (
    <div className="min-h-[70vh] grid place-items-center">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-2 size-12 rounded-2xl bg-amber-500/10 ring-1 ring-amber-200 flex items-center justify-center">
              <ShieldCheck className="size-6 text-amber-600" />
            </div>
            <h1 className="text-xl font-semibold">Hesabınıza Giriş Yapın</h1>
            <p className="mt-1 text-sm text-slate-600">
              Demo kullanıcı: <span className="font-medium">demo@digitalsiparis.com</span> / <span className="font-medium">123456</span>
            </p>
          </div>

          <form action={loginAction} className="space-y-4">
            {/* Email */}
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
                  className="w-full rounded-xl border bg-white px-10 py-2.5 text-sm outline-none ring-1 ring-slate-200 transition focus:ring-amber-300"
                  defaultValue=""
                />
              </div>
            </div>

            {/* Password (client-only küçük bileşen) */}
            <PasswordField icon={<Lock className="size-5" />} eye={<Eye className="size-5" />} eyeOff={<EyeOff className="size-5" />} />

            {/* Hatırla + Şifremi unuttum */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" name="remember" className="size-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500" defaultChecked />
                Beni hatırla
              </label>
              <Link href="/shop/forgot" className="text-sm text-amber-700 hover:underline">
                Şifremi unuttum
              </Link>
            </div>

            {/* Hata mesajı */}
            {err && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {err}
              </div>
            )}

            {/* Submit (useFormStatus ile pending) */}
            <SubmitButton>
              <Loader2 className="size-4 animate-spin" />
              Giriş Yap
            </SubmitButton>
          </form>

          <div className="mt-4 text-center text-sm text-slate-600">
            Hesabın yok mu?{" "}
            <Link href="/shop/register" className="font-medium text-amber-700 hover:underline">
              Hemen kayıt ol
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          Giriş yap butonuna basarak <Link href="/legal/kvkk" className="underline">KVKK</Link> ve{" "}
          <Link href="/legal/terms" className="underline">Kullanım Koşulları</Link>’nı kabul etmiş olursunuz.
        </p>
      </div>
    </div>
  );
}
