import React,{useEffect,useState} from "react"; import {useParams} from "react-router-dom"; import client from "../api/client";
export default function VendorStorePage(){ const {slug}=useParams(); const [data,setData]=useState<any>(null);
  useEffect(()=>{(async()=>{const {data}=await client.get(`/vendors/${slug}`); setData(data);})()},[slug]);
  if(!data) return <div className="container">Yükleniyor…</div>;
  return (<div className="container"><div className="card"><h2>Mağaza: {data.vendor.display_name||data.vendor.slug}</h2><div>Takipçi: {data.vendor.followers||0} — Puan: {data.vendor.rating||"-"}</div></div><div className="grid" style={{gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", marginTop:16}}>{data.products.map((p:any)=>(<div className="card" key={p.id}><b>{p.title}</b><div>{p.price} ₺</div></div>))}</div></div>);
}
