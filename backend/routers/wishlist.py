from fastapi import APIRouter, Depends
from deps import get_current_user
from db import db
router = APIRouter(prefix="/wishlist", tags=["wishlist"])
@router.get("")
async def get_wishlist(user=Depends(get_current_user)):
    doc = await db.wishlists.find_one({"user_id": user["user_id"]}) or {"items":[]}
    return {"items": doc.get("items",[])}
@router.post("/toggle")
async def toggle_wishlist(payload: dict, user=Depends(get_current_user)):
    pid = payload.get("product_id")
    wl = await db.wishlists.find_one({"user_id": user["user_id"]}) or {"user_id": user["user_id"], "items":[]}
    items = set(wl.get("items", []))
    if pid in items: items.remove(pid)
    else: items.add(pid)
    await db.wishlists.update_one({"user_id": user["user_id"]},{"$set":{"items": list(items)}}, upsert=True)
    return {"items": list(items)}
