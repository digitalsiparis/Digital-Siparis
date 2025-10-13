import React, {useState} from "react";
import client from "../../api/client";
export default function APIKeys(){
  const [key, setKey] = useState<string>("");
  const issue = async ()=>{ const {data}=await client.post("/api-keys/issue"); setKey(data.key); };
  return (
    <div className="container">
      <h1>API Anahtarları</h1>
      <button className="btn" onClick={issue}>Yeni API Anahtarı Oluştur</button>
      {key && <div className="card" style={{marginTop:12}}>Anahtarınız: <code>{key}</code><div>Bu anahtarı dış entegratöre <b>X-API-Key</b> header'ı ile verin.</div></div>}
      <div className="card" style={{marginTop:12}}>
        Dış API uçları:
        <ul>
          <li>POST /ext/v1/products — ürün oluştur (header: X-API-Key)</li>
          <li>PUT /ext/v1/stock/:pid — stok güncelle</li>
          <li>GET /ext/v1/orders — siparişler</li>
        </ul>
      </div>
    </div>
  );
}
