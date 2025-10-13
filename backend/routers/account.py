from fastapi import APIRouter, Depends
from deps import get_current_user
from db import db
router = APIRouter(prefix="/account", tags=["account"])
@router.get("/orders")
async def account_orders(user=Depends(get_current_user)):
    cur = db.orders.find({"user_id": user["user_id"]}).sort("created_at",-1)
    out=[]; async for o in cur: o["id"]=str(o["_id"]); o.pop("_id",None); out.append(o)
    return {"data": out}
@router.get("/address")
async def get_address(user=Depends(get_current_user)):
    doc = await db.addresses.find_one({"user_id": user["user_id"]}) or {}
    if doc.get("_id"): doc["id"]=str(doc["_id"]); doc.pop("_id",None)
    return doc or {}
@router.put("/address")
async def put_address(payload: dict, user=Depends(get_current_user)):
    await db.addresses.update_one({"user_id": user["user_id"]},
        {"$set": {**payload, "user_id": user["user_id"]}}, upsert=True)
    return {"ok": True}
