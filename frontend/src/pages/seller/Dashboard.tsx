import React, {useEffect, useState} from "react";
import client from "../../api/client";
export default function SellerDashboard(){
  const [me, setMe] = useState<any>({});
  const [sum, setSum] = useState<any>({orderCount:0, latest:[]});
  useEffect(()=>{(async()=>{
    const m = await client.get("/seller/me"); setMe(m.data);
    const s = await client.get("/seller/orders/summary"); setSum(s.data);
  })();},[]);
  return (
    <div className="container">
      <h1>Satıcı Paneli</h1>
      <div className="card"><b>Mağaza:</b> {me.display_name} — <a href={`/vendor/${me.slug}`}>Görüntüle</a></div>
      <div className="grid" style={{gridTemplateColumns:"repeat(3,1fr)", marginTop:16}}>
        <div className="card"><div>Toplam Sipariş</div><b style={{fontSize:24}}>{sum.orderCount}</b></div>
        <a className="card" href="/seller/products">Ürünlerim</a>
        <a className="card" href="/seller/brand-docs">Marka Belgeleri</a>
      </div>
    </div>
  );
}
