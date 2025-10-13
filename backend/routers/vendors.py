from fastapi import APIRouter, HTTPException
from db import db
router = APIRouter(prefix="/vendors", tags=["vendors"])
@router.get("")
async def list_vendors(q: str | None = None, page: int = 1, page_size: int = 24):
    filt = {}
    if q:
        filt = {"$or": [{"slug": {"$regex": q, "$options": "i"}}, {"display_name": {"$regex": q, "$options": "i"}}]}
    cur = db.vendors.find(filt).skip((page-1)*page_size).limit(page_size)
    data = []
    async for v in cur:
        v["id"] = str(v["_id"]); v.pop("_id", None); data.append(v)
    total = await db.vendors.count_documents(filt)
    return {"data": data, "page": page, "pageSize": page_size, "total": total}
@router.get("/{slug}")
async def vendor_detail(slug: str):
    v = await db.vendors.find_one({"slug": slug})
    if not v: raise HTTPException(404, "vendor not found")
    v["id"] = str(v["_id"]); v.pop("_id", None)
    products = []
    async for p in db.products.find({"vendor_slug": slug}).limit(24):
        p["id"]=str(p["_id"]); p.pop("_id",None); products.append(p)
    return {"vendor": v, "products": products}
