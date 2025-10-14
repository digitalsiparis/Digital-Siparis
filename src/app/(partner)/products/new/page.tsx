'use client';
import {useState} from 'react';

type Variant = {sku:string; attrs: Record<string,string>; price:number; stock:number};

export default function NewProduct(){
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);

  function addVariant(){
    setVariants(v=>[...v, {sku:'', attrs:{}, price: price||0, stock:0}]);
  }
  function updateVariant(i:number, patch:Partial<Variant>){
    setVariants(v=> v.map((it,idx)=> idx===i? {...it, ...patch}: it));
  }
  async function onSubmit(e:React.FormEvent){
    e.preventDefault();
    const fd = new FormData();
    fd.set('title', title); fd.set('price', String(price)); fd.set('stock', String(stock));
    variants.forEach((v,i)=>{ fd.set(`variants[${i}]`, JSON.stringify(v)); });
    images.forEach((f,i)=> fd.set(`images[${i}]`, f));
    const r = await fetch('/api/v1/products', {method:'POST', body:fd});
    if (!r.ok) alert('Kaydedilemedi'); else alert('Kaydedildi');
  }

  return (
    <form onSubmit={onSubmit} className="container mx-auto max-w-3xl space-y-4">
      <h1 className="text-xl font-semibold">Yeni Ürün</h1>
      <input className="w-full p-3 rounded-xl border" placeholder="Başlık" value={title} onChange={e=>setTitle(e.target.value)}/>
      <div className="grid grid-cols-2 gap-3">
        <input type="number" className="p-3 rounded-xl border" placeholder="Fiyat" value={price} onChange={e=>setPrice(Number(e.target.value))}/>
        <input type="number" className="p-3 rounded-xl border" placeholder="Stok" value={stock} onChange={e=>setStock(Number(e.target.value))}/>
      </div>
      <div className="rounded-2xl border p-3">
        <div className="font-medium mb-2">Görseller</div>
        <input type="file" multiple accept="image/*" onChange={e=> setImages(Array.from(e.target.files||[])) }/>
        <div className="mt-2 flex gap-2 flex-wrap">
          {images.map((f,i)=> <span key={i} className="text-xs border rounded px-2 py-1">{f.name}</span>)}
        </div>
      </div>
      <div className="rounded-2xl border p-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-medium">Varyantlar</div>
          <button type="button" onClick={addVariant} className="px-3 py-1 rounded-xl border">Varyant Ekle</button>
        </div>
        {variants.map((v,i)=> (
          <div key={i} className="grid grid-cols-4 gap-2 items-center">
            <input className="p-2 rounded-xl border" placeholder="SKU" value={v.sku} onChange={e=>updateVariant(i,{sku:e.target.value})}/>
            <input className="p-2 rounded-xl border" placeholder="Renk:Kırmızı,Beden:M" onChange={e=>updateVariant(i,{attrs: Object.fromEntries(e.target.value.split(',').map(p=>p.split(':').map(s=>s.trim())) as any)})}/>
            <input type="number" className="p-2 rounded-xl border" placeholder="Fiyat" value={v.price} onChange={e=>updateVariant(i,{price:Number(e.target.value)})}/>
            <input type="number" className="p-2 rounded-xl border" placeholder="Stok" value={v.stock} onChange={e=>updateVariant(i,{stock:Number(e.target.value)})}/>
          </div>
        ))}
      </div>
      <button className="px-4 py-2 rounded-xl border">Kaydet</button>
    </form>
  );
}
