import React from "react";
const brand=import.meta.env.VITE_BRAND_NAME||"DigitalSipariş"; const accent=import.meta.env.VITE_BRAND_ACCENT||"#4C6857E6";
export default function DSNavbar(){ return (<div style={{position:"sticky",top:0,zIndex:10,background:"#fff",borderBottom:"1px solid #e5e7eb"}}>
  <div className="container" style={{display:"flex",alignItems:"center",gap:16}}>
    <div style={{fontWeight:800,fontSize:22,color:accent}}>{brand}</div>
    <input placeholder="Ara: ürün, mağaza, kategori" style={{flex:1,padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:12}}/>
    <a href="/stores" className="btn" style={{background:accent}}>Mağazalar</a>
    <a href="/cart" className="btn" style={{background:accent}}>Sepet</a>
    <a href="/seller" className="btn" style={{background:"#111827",borderColor:"#111827"}}>Satıcı Paneli</a>
  </div></div>); }
