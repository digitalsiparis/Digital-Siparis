import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get("ds_user")?.value;
    const user = cookie ? JSON.parse(cookie) : null; // mevcut mock persist’e uyumlu
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}
