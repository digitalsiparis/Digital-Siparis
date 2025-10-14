import Link from "next/link";

export default function PartnerLanding() {
  return (
    <section className="grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl border bg-white p-6">
        <h1 className="text-xl font-semibold">Partner Alanına Hoş Geldiniz</h1>
        <p className="text-slate-600 mt-2">Satıcı başvurusu yapın veya mevcut hesabınızla panele giriş yapın.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Panele Git</Link>
          <Link href="/products/new" className="px-4 py-2 border rounded-lg text-sm">İlk Ürünü Ekle</Link>
        </div>
      </div>
      <ul className="grid sm:grid-cols-2 gap-4">
        {[
          { title: "Komisyon Oranları", desc: "Şeffaf ücretlendirme" },
          { title: "Hızlı Ödeme", desc: "Haftalık ödeme" },
          { title: "API Erişimi", desc: "Kurumsal & bireysel" },
          { title: "Destek", desc: "7/24 yardım" },
        ].map((f) => (
          <li key={f.title} className="rounded-xl border bg-white p-4">
            <div className="font-medium">{f.title}</div>
            <div className="text-sm text-slate-600">{f.desc}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
