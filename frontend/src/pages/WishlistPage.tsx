import React,{useEffect,useState} from "react"; import client from "../api/client"; import Protected from "../components/Protected";
export default function WishlistPage(){ const [ids,setIds]=useState<string[]>([]);
  const refresh=async()=>{const {data}=await client.get("/wishlist"); setIds(data.items||[]);};
  const toggle=async(pid:string)=>{await client.post("/wishlist/toggle",{product_id:pid}); refresh();};
  useEffect(()=>{refresh();},[]);
  return (<Protected><div className="container"><h1>Favorilerim</h1>{!ids.length?<p>Favori ürün yok.</p>:ids.map(id=>(<div key={id} style={{display:"flex",justifyContent:"space-between",borderBottom:"1px solid #eee",padding:"8px 0"}}><span>Ürün #{id}</span><button className="btn" onClick={()=>toggle(id)}>Kaldır</button></div>))}</div></Protected>); }
