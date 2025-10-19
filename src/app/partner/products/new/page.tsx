"use client";
import { useState } from "react";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [desc, setDesc] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify({ name, price, desc }, null, 2));
  };

  return (
    <section className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-4">Yeni Ürün</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Ürün Adı</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-lg border px-3 py-2" placeholder="Örn: Akıllı Saat S" required/>
        </div>
        <div>
          <label className="block text-sm mb-1">Fiyat (TL)</label>
          <input value={price} onChange={e=>setPrice(e.target.value === "" ? "" : Number(e.target.value))} type="number" className="w-full rounded-lg border px-3 py-2" placeholder="Örn: 1299" required/>
        </div>
        <div>
          <label className="block text-sm mb-1">Açıklama</label>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} className="w-full rounded-lg border px-3 py-2" rows={4} placeholder="Kısa açıklama"/>
        </div>
        <button className="rounded-lg bg-blue-600 text-white px-4 py-2">Kaydet</button>
      </form>
    </section>
  );
}
