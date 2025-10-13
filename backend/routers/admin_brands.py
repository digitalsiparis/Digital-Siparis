from fastapi import APIRouter, Depends, HTTPException
from deps import get_current_user
from db import db
router = APIRouter(prefix="/admin/brands", tags=["admin-brands"])
def ensure_admin(user):
    if user.get("role") != "admin": raise HTTPException(403, "admin only")
@router.get("/docs")
async def list_docs(user=Depends(get_current_user)):
    ensure_admin(user)
    cur = db.brand_docs.find().sort("uploaded_at",-1)
    out=[]; async for d in cur: d["id"]=str(d["_id"]); d.pop("_id",None); out.append(d)
    return {"data": out}
@router.post("/docs/{doc_id}/approve")
async def approve_doc(doc_id: str, user=Depends(get_current_user)):
    ensure_admin(user)
    doc = await db.brand_docs.find_one({"_id": doc_id})
    if not doc: raise HTTPException(404, "doc not found")
    await db.brand_docs.update_one({"_id": doc_id}, {"$set": {"status":"approved"}})
    await db.brand_permissions.update_one(
        {"user_id": doc["user_id"], "brand_name": doc.get("brand_name")},
        {"$set": {"user_id": doc["user_id"], "brand_name": doc.get("brand_name"), "approved": True}},
        upsert=True
    )
    return {"ok": True}
