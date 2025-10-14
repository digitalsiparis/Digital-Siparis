'use client';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';

export default function Orders(){
  const router = useRouter();
  const sp = useSearchParams();
  const [status, setStatus] = useState(sp.get('status')||'');
  const [page, setPage] = useState(Number(sp.get('page')||1));
  const [items, setItems] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(()=>{
    const q = new URLSearchParams(); if (status) q.set('status', status); q.set('page', String(page));
    fetch(`/api/v1/orders?${q.toString()}`).then(r=>r.json()).then(d=>{setItems(d.items||[]); setTotalPages(d.totalPages||1);});
    router.replace(`/partner/orders?${q.toString()}`);
  },[status,page,router]);

  return (
    <div className="container mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Siparişler</h1>
      <div className="flex gap-2 items-center">
        <select value={status} onChange={e=>setStatus(e.target.value)} className="p-2 rounded-xl border">
          <option value="">Tümü</option>
          <option value="pending">Beklemede</option>
          <option value="processing">Hazırlanıyor</option>
          <option value="completed">Tamamlandı</option>
          <option value="cancelled">İptal</option>
        </select>
      </div>
      <div className="grid gap-3">
        {items.map(o=> (
          <div key={o.id} className="rounded-2xl border p-4 flex justify-between">
            <div>
              <div className="font-semibold">#{o.code}</div>
              <div className="text-sm opacity-70">{o.date}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">{o.total} ₺</div>
              <div className="text-sm">{o.status}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        {Array.from({length: totalPages}, (_,i)=> (
          <button key={i} className={`px-3 py-1 rounded-xl border ${page===(i+1)?'font-bold':''}`} onClick={()=>setPage(i+1)}>{i+1}</button>
        ))}
      </div>
    </div>
  );
}
