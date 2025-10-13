import React,{createContext,useContext,useEffect,useMemo,useState} from "react";
import client from "../api/client"; import type {CartItem} from "../api/types";
type Ctx = {items:CartItem[]; total:number; add:(i:CartItem)=>void; remove:(id:string)=>void; updateQty:(id:string,q:number)=>void; validate:()=>Promise<void>; clear:()=>void;};
const C = createContext<Ctx>(null!);
export const CartProvider: React.FC<{children:React.ReactNode}> = ({children})=>{
  const [items,setItems]=useState<CartItem[]>(()=>JSON.parse(localStorage.getItem("cart")||"[]"));
  const [total,setTotal]=useState(0);
  useEffect(()=>{localStorage.setItem("cart",JSON.stringify(items));},[items]);
  const validate=async()=>{const {data}=await client.post("/cart/validate",{items}); setItems(data.items); setTotal(data.total);};
  useEffect(()=>{validate();},[]);
  const add=(i:CartItem)=>setItems(p=>{const idx=p.findIndex(x=>x.product_id===i.product_id); if(idx>=0){const n=[...p]; n[idx].qty+=i.qty||1; return n;} return [...p,{...i,qty:i.qty||1}];});
  const remove=(id:string)=>setItems(p=>p.filter(x=>x.product_id!==id));
  const updateQty=(id:string,q:number)=>setItems(p=>p.map(x=>x.product_id===id?{...x,qty:Math.max(1,q)}:x));
  const clear=()=>{setItems([]); setTotal(0); localStorage.removeItem("cart");};
  const v=useMemo(()=>({items,total,add,remove,updateQty,validate,clear}),[items,total]);
  return <C.Provider value={v}>{children}</C.Provider>;
}; export const useCart=()=>useContext(C);
