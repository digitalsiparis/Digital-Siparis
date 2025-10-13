from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any
from deps import get_current_user
from utils import revalidate_cart_items, calc_total, vendor_breakdown
from db import db
from datetime import datetime
router = APIRouter(prefix="/orders", tags=["orders"])
@router.post("")
async def create_order(payload: Dict[str, Any], user=Depends(get_current_user)):
    items = payload.get("items", []); address = payload.get("address")
    if not items or not address: raise HTTPException(400, "items/address required")
    valid = await revalidate_cart_items(items)
    if not valid: raise HTTPException(400, "no valid items")
    total = calc_total(valid); vbd = await vendor_breakdown(valid)
    doc = {"user_id": user["user_id"], "items": valid, "vendor_breakdown": vbd, "total": total,
           "status": "created", "address": address, "created_at": datetime.utcnow()}
    res = await db.orders.insert_one(doc); doc["id"] = str(res.inserted_id); return doc
@router.get("")
async def list_orders(user=Depends(get_current_user)):
    cur = db.orders.find({"user_id": user["user_id"]}).sort("created_at", -1)
    out = []; async for o in cur: o["id"]=str(o["_id"]); o.pop("_id",None); out.append(o)
    return {"data": out}
