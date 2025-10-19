"use client";

import { useFormStatus } from "react-dom";
import { submitPartnerApplication } from "@/lib/partner-actions";
import { useEffect, useMemo, useState } from "react";

type Flow = "download" | "marketplace" | "market";
const FLOW_TABS: { key: Flow; label: string }[] = [
  { key: "download", label: "Digital İndirilebilir" },
  { key: "marketplace", label: "Digital Pazar Yeri" },
  { key: "market", label: "Digital Market" },
];

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="h-11 rounded-xl bg-amber-600 px-5 font-semibold text-white hover:bg-amber-700 disabled:opacity-60" disabled={pending}>
      {pending ? "Gönderiliyor..." : "Devam Et"}
    </button>
  );
}

export default function ApplyForm({ initialFlow = "marketplace" as Flow }) {
  const [flow, setFlow] = useState<Flow>(initialFlow);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("type", flow);
    window.history.replaceState({}, "", url.toString());
  }, [flow]);

  const categories = useMemo(() => {
    switch (flow) {
      case "download": return ["E-Kitap", "Yazılım Lisansı", "Dijital Sanat", "SaaS"];
      case "market": return ["Gıda", "İçecek", "Kişisel Bakım", "Temizlik"];
      default: return ["Moda", "Elektronik", "Ev & Yaşam", "Kozmetik"];
    }
  }, [flow]);

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <section className="space-y-4 rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {FLOW_TABS.map((t) => (
            <button key={t.key} onClick={() => setFlow(t.key)} className={`h-10 rounded-xl border px-3 text-sm font-medium ${flow === t.key ? "bg-slate-900 text-white border-slate-900" : "bg-white hover:shadow-sm"}`} type="button">
              {t.label}
            </button>
          ))}
        </div>

        <form
          action={async (fd) => {
            setError(null);
            setToast(null);
            fd.set("flow", flow);
            const res = await submitPartnerApplication(null, fd);
            if (!res.ok) setError(res.message);
            else setToast(res.message);
          }}
          className="grid gap-4 md:grid-cols-2"
        >
          <div>
            <label className="mb-1 block text-sm font-medium">Şirket İsmi</label>
            <input name="companyName" required className="w-full rounded-xl border px-3 py-2" placeholder="Şirket İsmi" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Cep Telefonunuz</label>
            <input name="phone" required className="w-full rounded-xl border px-3 py-2" placeholder="05__ ___ __ __" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">E-Posta Adresiniz</label>
            <input name="email" type="email" required className="w-full rounded-xl border px-3 py-2" placeholder="ornek@firma.com" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Satılacak Ürün Kategorisi</label>
            <select name="category" className="w-full rounded-xl border px-3 py-2">
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Şirket Türü</label>
            <select name="companyType" className="w-full rounded-xl border px-3 py-2">
              <option>Şahıs</option><option>Limited</option><option>Anonim</option><option>Diğer</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Vergi Kimlik Numaranız</label>
            <input name="taxId" className="w-full rounded-xl border px-3 py-2" placeholder="VKN / TCKN" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">İl</label>
            <input name="province" className="w-full rounded-xl border px-3 py-2" placeholder="Seçim yapınız" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">İlçe</label>
            <input name="district" className="w-full rounded-xl border px-3 py-2" placeholder="Seçim yapınız" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Referans Kodu (zorunlu değil)</label>
            <input name="refCode" className="w-full rounded-xl border px-3 py-2" placeholder="Varsa Referans Kodu Giriniz..." />
          </div>
          <div className="md:col-span-2 flex items-center gap-2">
            <input id="consent" name="consent" type="checkbox" className="size-4 rounded border" required />
            <label htmlFor="consent" className="text-sm"><a className="underline">Aydınlatma metnini</a> okudum ve anladım.</label>
          </div>
          <div className="md:col-span-2 flex items-center justify-end gap-3">
            <SubmitBtn />
          </div>
        </form>

        {error && <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-rose-800">{error}</div>}
        {toast && <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-800">{toast}</div>}
      </section>

      <aside className="space-y-3">
        <div className="rounded-2xl border bg-white p-4">
          <div className="font-medium">Başvuru Sonrası İpucu</div>
          <p className="mt-1 text-sm text-slate-600">İlk 15 günde ürün yükleyip 60 gün içinde aktif satışa başlarsanız özel komisyon oranlarından faydalanın.</p>
          <button className="mt-3 rounded-xl border px-3 py-2 text-sm hover:bg-slate-50">Hemen İncele</button>
        </div>
      </aside>
    </div>
  );
}
