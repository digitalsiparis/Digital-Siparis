from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import cart, orders, account, wishlist, admin, vendors, seller, admin_brands, api_keys
from routers.api_keys import ext as ext_api
app = FastAPI(title="DigitalSiparis API")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(cart.router)
app.include_router(orders.router)
app.include_router(account.router)
app.include_router(wishlist.router)
app.include_router(admin.router)
app.include_router(vendors.router)
app.include_router(seller.router)
app.include_router(admin_brands.router)
app.include_router(api_keys.router)
app.include_router(ext_api)
@app.get("/health")
async def health(): return {"ok": True}
