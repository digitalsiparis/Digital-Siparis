import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.redirect(new URL("/shop/login", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
  res.cookies.set("ds_auth", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
