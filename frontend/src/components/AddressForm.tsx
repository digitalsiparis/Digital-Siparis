import React,{useEffect,useState} from "react"; import client from "../api/client"; import type {Address} from "../api/types";
const empty: Address={full_name:"",phone:"",line1:"",line2:"",city:"",district:"",postal_code:"",country:"TR"};
export default function AddressForm({onSaved}:{onSaved?:(a:Address)=>void}){ const [data,setData]=useState<Address>(empty);
  useEffect(()=>{(async()=>{const {data:res}=await client.get("/account/address"); if(res && Object.keys(res).length) setData(res as Address);})()},[]);
  const save=async()=>{await client.put("/account/address",data); onSaved?.(data);};
  return (<div className="card" style={{display:"grid",gap:8}}>
    <input placeholder="Ad Soyad" value={data.full_name} onChange={e=>setData({...data,full_name:e.target.value})}/>
    <input placeholder="Telefon" value={data.phone} onChange={e=>setData({...data,phone:e.target.value})}/>
    <input placeholder="Adres Satır 1" value={data.line1} onChange={e=>setData({...data,line1:e.target.value})}/>
    <input placeholder="Adres Satır 2" value={data.line2} onChange={e=>setData({...data,line2:e.target.value})}/>
    <input placeholder="İl" value={data.city} onChange={e=>setData({...data,city:e.target.value})}/>
    <input placeholder="İlçe" value={data.district} onChange={e=>setData({...data,district:e.target.value})}/>
    <input placeholder="PK" value={data.postal_code} onChange={e=>setData({...data,postal_code:e.target.value})}/>
    <button className="btn" onClick={save}>Kaydet</button></div>); }
