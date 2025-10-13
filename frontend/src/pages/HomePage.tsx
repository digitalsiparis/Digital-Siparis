import React from "react";
export default function HomePage(){
  return (<div className="container">
    <div className="card" style={{padding:20, marginBottom:16}}>
      <h1 style={{margin:"0 0 8px"}}>DigitalSipariş</h1>
      <p>Türk pazarına uygun çok satıcılı pazar yeri. Moda, Elektronik, Ev & Yaşam ve daha fazlası.</p>
    </div>
    <div className="grid" style={{gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))"}}>
      {["Moda","Elektronik","Ev & Yaşam","Market","Kozmetik"].map((c)=>(
        <a key={c} href={`/list/${encodeURIComponent(c.toLowerCase())}`} className="card">{c}</a>
      ))}
    </div>
    <div className="card" style={{marginTop:16, display:"flex", gap:12}}>
      <a className="btn" href="/stores">Mağazaları Gör</a>
      <a className="btn" href="/seller">Satıcı Paneli</a>
    </div>
  </div>);
}
