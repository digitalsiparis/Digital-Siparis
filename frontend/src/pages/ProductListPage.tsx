import React from "react"; import { useParams } from "react-router-dom";
export default function ProductListPage(){ const { slug } = useParams();
  return (<div className="container"><h2>Kategori: {slug}</h2><p>Filtreler, sıralama ve ürün kartları burada.</p></div>);
}
