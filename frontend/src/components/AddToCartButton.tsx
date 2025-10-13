import React from "react"; import {useCart} from "../context/CartContext"; import type {CartItem} from "../api/types";
export default function AddToCartButton({item}:{item: CartItem}){ const {add,validate}=useCart(); const onClick=async()=>{add(item); await validate();}; return <button className="btn" onClick={onClick}>Sepete Ekle</button>; }
