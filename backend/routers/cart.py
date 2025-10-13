from fastapi import APIRouter, Depends
from typing import List, Dict, Any
from deps import get_current_user
from utils import revalidate_cart_items, calc_total
router = APIRouter(prefix="/cart", tags=["cart"])
@router.post("/validate")
async def cart_validate(payload: Dict[str, Any], user=Depends(get_current_user)):
    items: List[Dict[str, Any]] = payload.get("items", [])
    valid = await revalidate_cart_items(items)
    total = calc_total(valid)
    return {"items": valid, "total": total, "currency": "TRY"}
