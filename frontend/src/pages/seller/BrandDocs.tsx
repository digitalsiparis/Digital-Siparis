import React, {useEffect, useState} from "react";
import client from "../../api/client";
export default function BrandDocs(){
  const [brand_name, setBrand] = useState(""); const [doc_type, setType] = useState("Yetki Belgesi");
  const [url, setUrl] = useState(""); const [items, setItems] = useState<any[]>([]);
  const upload = async ()=>{ await client.post("/seller/brand-docs/upload", {brand_name, doc_type, url}); load(); };
  const load = async ()=>{ const {data}=await client.get("/seller/brand-docs"); setItems(data.data); };
  useEffect(()=>{ load(); },[]);
  return (
    <div className="container">
      <h1>Marka Belgeleri</h1>
      <div className="card" style={{display:"grid",gap:8,maxWidth:520}}>
        <input placeholder="Marka adı" value={brand_name} onChange={e=>setBrand(e.target.value)}/>
        <input placeholder="Belge türü" value={doc_type} onChange={e=>setType(e.target.value)}/>
        <input placeholder="Belge URL veya referans" value={url} onChange={e=>setUrl(e.target.value)}/>
        <button className="btn" onClick={upload}>Yükle</button>
      </div>
      <div style={{marginTop:16}}>
        {items.map((d:any)=>(<div key={d.id} className="card">{d.brand_name} — {d.doc_type} — durum: <b>{d.status}</b></div>))}
      </div>
      <div className="card" style={{marginTop:16}}>
        Ürün eklerken marka adı girildiğinde, sadece <b>onaylı</b> markalar için yükleme yapılabilir (entegrasyon API'si de aynı kuralı kullanır).
      </div>
    </div>
  );
}
