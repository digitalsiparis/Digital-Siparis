from fastapi import APIRouter, Depends, HTTPException
from deps import get_current_user
from db import db
router = APIRouter(prefix="/admin", tags=["admin"])
def check_admin(user):
    if user.get("role")!="admin":
        raise HTTPException(403, "admin only")
@router.post("/product")
async def admin_create_product(payload: dict, user=Depends(get_current_user)):
    check_admin(user); res = await db.products.insert_one(payload)
    return {"id": str(res.inserted_id)}
@router.put("/product/{pid}")
async def admin_update_product(pid: str, payload: dict, user=Depends(get_current_user)):
    check_admin(user); await db.products.update_one({"_id": pid}, {"$set": payload})
    return {"ok": True}
