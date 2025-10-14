export type CartItem = { id:string; slug:string; title:string; price:number; qty:number; image?:string };
const KEY = "ds_cart_v1";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function setCart(items: CartItem[]) { if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(items)); }

export function addToCart(item: CartItem) {
  const list = getCart();
  const i = list.findIndex(x => x.id === item.id);
  if (i >= 0) list[i].qty += item.qty; else list.push(item);
  setCart(list);
}
export function removeFromCart(id: string) { setCart(getCart().filter(x => x.id !== id)); }
export function total() { return getCart().reduce((s,x)=>s+x.price*x.qty, 0); }
