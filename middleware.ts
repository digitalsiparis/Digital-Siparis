import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Domain -> path prefix
const DOMAIN_TO_PREFIX: Record<string, "/shop" | "/partner"> = {
  "shop.digitalsiparis.com": "/shop",
  "partner.digitalsiparis.com": "/partner",

  // local & ana domain (wp ana domain şimdilik vitrini shop'a taşısın)
  "localhost:3000": "/shop",
  "digitalsiparis.com": "/shop",
  "www.digitalsiparis.com": "/shop",
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";

  // statik/asset/api yollarını geç
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/favicon") ||
    /\.[a-z0-9]+$/i.test(url.pathname)
  ) {
    return NextResponse.next();
  }

  const prefix = DOMAIN_TO_PREFIX[host] ?? "/shop";

  // Zaten doğru prefiks altındaysa devam
  if (url.pathname === prefix || url.pathname.startsWith(prefix + "/")) {
    return NextResponse.next();
  }

  // Örn: "/" -> "/shop", "/products" -> "/shop/products"
  const rewriteTo = new URL(prefix + (url.pathname === "/" ? "" : url.pathname), req.url);
  return NextResponse.rewrite(rewriteTo);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"],
};
