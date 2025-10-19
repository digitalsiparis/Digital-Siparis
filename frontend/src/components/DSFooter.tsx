import React from "react";
export default function DSFooter(){ return (<div style={{marginTop:40,borderTop:"1px solid #e5e7eb",padding:"20px 0",background:"#fff"}}>
  <div className="container" style={{display:"flex",justifyContent:"space-between",color:"#475569"}}>
    <div>© {new Date().getFullYear()} DigitalSipariş</div>
    <div style={{display:"flex",gap:16}}><a href="/help">Yardım</a><a href="/returns">İade Koşulları</a><a href="/contact">İletişim</a></div>
  </div></div>); }
