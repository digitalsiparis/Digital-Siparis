from typing import List, Dict
from db import db
def calc_total(items: List[dict]) -> float:
    return round(sum(float(i.get("price",0)) * int(i.get("qty",1)) for i in items), 2)
async def vendor_breakdown(items: List[dict]) -> Dict[str, float]:
    out: Dict[str, float] = {}
    for it in items:
        vid = it.get("vendor_id") or "unknown"
        out[vid] = round(out.get(vid, 0.0) + (float(it.get("price",0)) * int(it.get("qty",1))), 2)
    return out
async def revalidate_cart_items(items: List[dict]) -> List[dict]:
    new_items = []
    for it in items:
        prod = await db.products.find_one({"_id": {"$eq": it["product_id"]}})
        if not prod: continue
        if int(prod.get("stock", 0)) < int(it.get("qty",1)): continue
        price = float(prod.get("price", it.get("price",0)))
        it["price"] = price
        it["title"] = prod.get("title", it.get("title","Ürün"))
        it["slug"] = prod.get("slug", it.get("slug","urun"))
        it["vendor_id"] = str(prod.get("vendor_id", it.get("vendor_id","unknown")))
        new_items.append(it)
    return new_items
