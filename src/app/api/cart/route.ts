import { NextRequest, NextResponse } from "next/server";
const WC = process.env.WC_STORE_API_BASE!;

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie") || "";
  const wpRes = await fetch(`${WC}/cart`, {
    headers: {
      cookie,
      "User-Agent": req.headers.get("user-agent") || "Next.js",
      Origin: process.env.NEXT_PUBLIC_SITE_URL || "",
    },
    cache: "no-store",
  });

  const text = await wpRes.text();
  let data: any;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }

  const res = NextResponse.json(data, { status: wpRes.status });
  const setCookie = wpRes.headers.get("set-cookie");
  if (setCookie) res.headers.set("Set-Cookie", setCookie);

  return res;
}
