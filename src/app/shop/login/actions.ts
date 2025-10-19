"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function backToLogin(msg?: string) {
  const qs = msg ? `?error=${encodeURIComponent(msg)}` : "";
  redirect(`/shop/login${qs}`);
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const remember = formData.get("remember") === "on";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return backToLogin("Lütfen geçerli bir e-posta girin.");
  }
  if (!password || password.length < 6) {
    return backToLogin("Şifre en az 6 karakter olmalı.");
  }

  // DEMO kimlik
  const DEMO_EMAIL = "demo@digitalsiparis.com";
  const DEMO_PASS = "123456";
  if (!(email === DEMO_EMAIL && password === DEMO_PASS)) {
    return backToLogin("E-posta veya şifre hatalı.");
  }

  // sahte token (gerçekte JWT/Session kullanın)
  const token = Buffer.from(JSON.stringify({ email, role: "user", ts: Date.now() })).toString("base64url");

  cookies().set("ds_auth", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
  });

  redirect("/shop");
}
