import { NextRequest, NextResponse } from "next/server";
const WC = process.env.WC_STORE_API_BASE!; // https://site.com/wp-json/wc/store/v1

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // { id, quantity, variation?, attributes? }
    const cookie = req.headers.get("cookie") || "";

    const wpRes = await fetch(`${WC}/cart/add-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie,
        "User-Agent": req.headers.get("user-agent") || "Next.js",
        "X-Forwarded-For": req.headers.get("x-forwarded-for") || "",
        Origin: process.env.NEXT_PUBLIC_SITE_URL || "",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const text = await wpRes.text();
    let data: any;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    const res = NextResponse.json(data, { status: wpRes.status });
    const setCookie = wpRes.headers.get("set-cookie");
    if (setCookie) res.headers.set("Set-Cookie", setCookie);

    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "add-to-cart failed" }, { status: 500 });
  }
}
