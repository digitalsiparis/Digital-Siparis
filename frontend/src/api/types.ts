export type Address = { full_name:string; phone:string; line1:string; line2?:string; city:string; district:string; postal_code:string; country?:string; };
export type CartItem = { product_id:string; title:string; slug:string; price:number; qty:number; vendor_id?:string; variant?:Record<string,any>; };
export type Order = { id:string; user_id:string; items:CartItem[]; vendor_breakdown:Record<string,number>; total:number; status:string; address:Address; created_at:string; };
