from fastapi import APIRouter, Depends, HTTPException
from deps import get_current_user
from db import db
from datetime import datetime
router = APIRouter(prefix="/seller", tags=["seller"])
def ensure_vendor(user):
    if user.get("role") not in ["vendor","admin"]:
        raise HTTPException(403, "vendor only")
@router.get("/me")
async def me(user=Depends(get_current_user)):
    ensure_vendor(user)
    v = await db.vendors.find_one({"user_id": user["user_id"]})
    if not v:
        slug = f"vendor-{user['user_id'][:6]}"
        v = {"user_id": user["user_id"], "slug": slug, "display_name": "Mağazam", "rating": 4.5, "followers": 0, "badges": []}
        await db.vendors.insert_one(v)
        v = await db.vendors.find_one({"user_id": user["user_id"]})
    v["id"] = str(v.get("_id")); v.pop("_id", None)
    return v
@router.get("/products")
async def my_products(page: int = 1, page_size: int = 24, user=Depends(get_current_user)):
    ensure_vendor(user)
    v = await db.vendors.find_one({"user_id": user["user_id"]}) or {}
    slug = v.get("slug")
    cur = db.products.find({"vendor_slug": slug}).skip((page-1)*page_size).limit(page_size)
    data=[]; async for p in cur: p["id"]=str(p["_id"]); p.pop("_id",None); data.append(p)
    total = await db.products.count_documents({"vendor_slug": slug})
    return {"data": data, "page": page, "pageSize": page_size, "total": total}
@router.post("/products")
async def create_product(payload: dict, user=Depends(get_current_user)):
    ensure_vendor(user)
    v = await db.vendors.find_one({"user_id": user["user_id"]}) or {}
    # brand permission check
    brand = payload.get("brand_name")
    if brand:
        perm = await db.brand_permissions.find_one({"user_id": user["user_id"], "brand_name": brand, "approved": True})
        if not perm:
            raise HTTPException(403, "brand not approved for this seller")
    payload["vendor_slug"] = v.get("slug")
    payload.setdefault("created_at", datetime.utcnow())
    res = await db.products.insert_one(payload)
    return {"id": str(res.inserted_id)}
@router.put("/products/{pid}")
async def update_product(pid: str, payload: dict, user=Depends(get_current_user)):
    ensure_vendor(user)
    v = await db.vendors.find_one({"user_id": user["user_id"]}) or {}
    r = await db.products.update_one({"_id": pid, "vendor_slug": v.get("slug")}, {"$set": payload})
    if r.matched_count == 0: raise HTTPException(404, "product not found")
    return {"ok": True}
@router.delete("/products/{pid}")
async def delete_product(pid: str, user=Depends(get_current_user)):
    ensure_vendor(user)
    v = await db.vendors.find_one({"user_id": user["user_id"]}) or {}
    await db.products.delete_one({"_id": pid, "vendor_slug": v.get("slug")})
    return {"ok": True}
@router.get("/orders/summary")
async def orders_summary(user=Depends(get_current_user)):
    ensure_vendor(user)
    # Simplified summary; real system would filter by vendor
    total = await db.orders.count_documents({})
    latest = []
    async for o in db.orders.find().sort("created_at",-1).limit(10):
        o["id"]=str(o["_id"]); o.pop("_id",None); latest.append(o)
    return {"orderCount": total, "latest": latest}
@router.post("/brand-docs/upload")
async def upload_brand_doc(payload: dict, user=Depends(get_current_user)):
    ensure_vendor(user)
    doc = {"user_id": user["user_id"], "status": "pending", **payload, "uploaded_at": datetime.utcnow()}
    await db.brand_docs.insert_one(doc)
    return {"ok": True, "status": "pending"}
@router.get("/brand-docs")
async def my_brand_docs(user=Depends(get_current_user)):
    ensure_vendor(user)
    cur = db.brand_docs.find({"user_id": user["user_id"]}).sort("uploaded_at",-1)
    out=[]; async for d in cur: d["id"]=str(d["_id"]); d.pop("_id",None); out.append(d)
    return {"data": out}
