from fastapi import APIRouter, Depends, Header, HTTPException
from deps import get_current_user
from db import db
import secrets
router = APIRouter(prefix="/api-keys", tags=["api-keys"])
@router.post("/issue")
async def issue_key(user=Depends(get_current_user)):
    k = secrets.token_hex(24)
    await db.api_keys.insert_one({"user_id": user["user_id"], "key": k})
    return {"key": k}
ext = APIRouter(prefix="/ext/v1", tags=["ext-api"])
async def ext_auth(x_api_key: str | None = Header(None)):
    if not x_api_key: raise HTTPException(401, "X-API-Key header missing")
    owner = await db.api_keys.find_one({"key": x_api_key})
    if not owner: raise HTTPException(403, "invalid api key")
    return owner
@ext.post("/products")
async def ext_create_product(payload: dict, owner=Depends(ext_auth)):
    brand = payload.get("brand_name")
    if brand:
        perm = await db.brand_permissions.find_one({"user_id": owner["user_id"], "brand_name": brand, "approved": True})
        if not perm: raise HTTPException(403, "brand not approved for this seller")
    v = await db.vendors.find_one({"user_id": owner["user_id"]}) or {}
    payload["vendor_slug"] = v.get("slug","ext-"+owner["user_id"][:6])
    res = await db.products.insert_one(payload)
    return {"id": str(res.inserted_id)}
@ext.put("/stock/{pid}")
async def ext_update_stock(pid: str, payload: dict, owner=Depends(ext_auth)):
    qty = int(payload.get("stock", 0))
    await db.products.update_one({"_id": pid}, {"$set": {"stock": qty}})
    return {"ok": True}
@ext.get("/orders")
async def ext_orders(owner=Depends(ext_auth)):
    cur = db.orders.find({"user_id": owner["user_id"]}).sort("created_at",-1)
    out = []; async for o in cur: o["id"]=str(o["_id"]); o.pop("_id",None); out.append(o)
    return {"data": out}
