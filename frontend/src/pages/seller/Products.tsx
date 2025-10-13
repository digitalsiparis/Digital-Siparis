import React, {useEffect, useState} from "react";
import client from "../../api/client";
export default function SellerProducts(){
  const [list, setList] = useState<any>({data:[]});
  const [form, setForm] = useState<any>({title:"", price:0, stock:0, brand_name:""});
  const load = async ()=>{ const {data}=await client.get("/seller/products"); setList(data); };
  useEffect(()=>{ load(); },[]);
  const create = async ()=>{ await client.post("/seller/products", form); setForm({title:"", price:0, stock:0, brand_name:""}); load(); };
  return (
    <div className="container">
      <h1>Ürünlerim</h1>
      <div className="card" style={{display:"grid",gap:8, maxWidth:520}}>
        <input placeholder="Ürün adı" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
        <input placeholder="Marka" value={form.brand_name} onChange={e=>setForm({...form, brand_name:e.target.value})}/>
        <input placeholder="Fiyat" type="number" value={form.price} onChange={e=>setForm({...form, price:parseFloat(e.target.value||"0")})}/>
        <input placeholder="Stok" type="number" value={form.stock} onChange={e=>setForm({...form, stock:parseInt(e.target.value||"0")})}/>
        <button className="btn" onClick={create}>Ürün Ekle</button>
      </div>
      <div className="grid" style={{gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", marginTop:16}}>
        {list.data.map((p:any)=>(
          <div key={p.id} className="card">
            <b>{p.title}</b>
            <div>{p.price?.toFixed ? p.price.toFixed(2) : p.price} ₺ — Stok: {p.stock||0}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
