"use server";

import { cookies } from "next/headers";

export async function mockLoginAction(formData: FormData) {
  const email = String(formData.get("email") || "");
  const name = String(formData.get("name") || "");
  cookies().set("partner_user", JSON.stringify({ email, name }), { httpOnly: true, path: "/" });
  return { ok: true };
}

export async function mockLogoutAction() {
  cookies().delete("partner_user");
  return { ok: true };
}

export function getPartnerUser(): { email: string; name: string } | null {
  try {
    const c = cookies().get("partner_user")?.value;
    return c ? JSON.parse(c) : null;
  } catch {
    return null;
  }
}
