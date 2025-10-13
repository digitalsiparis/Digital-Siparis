import React from "react"; import AddToCartButton from "../components/AddToCartButton";
export default function ProductDetailPage(){ const item={product_id:"demo-1",title:"Örnek Ürün",slug:"ornek-urun",price:299.90,qty:1};
  return (<div className="container"><div className="grid" style={{gridTemplateColumns:"1fr 1fr"}}><div className="card" style={{height:320}}>Galeri</div><div className="card"><h1>{item.title}</h1><div style={{fontSize:20,fontWeight:700}}>{item.price.toFixed(2)} ₺</div><div style={{marginTop:12}}><AddToCartButton item={item as any}/></div></div></div></div>);
}
