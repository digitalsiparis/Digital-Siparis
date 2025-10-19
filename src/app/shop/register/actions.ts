"use server";

import { redirect } from "next/navigation";

function back(msg?: string) {
  const qs = msg ? `?error=${encodeURIComponent(msg)}` : "";
  redirect(`/shop/register${qs}`);
}

export async function registerAction(formData: FormData) {
  const first_name = String(formData.get("first_name") || "").trim();
  const last_name  = String(formData.get("last_name") || "").trim();
  const email      = String(formData.get("email") || "").trim().toLowerCase();
  const password   = String(formData.get("password") || "");
  const password2  = String(formData.get("password2") || "");

  if (!first_name || !last_name) return back("Ad ve soyad zorunlu.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return back("Geçerli bir e-posta girin.");
  if (password.length < 6) return back("Şifre en az 6 karakter olmalı.");
  if (password !== password2) return back("Şifreler eşleşmiyor.");

  const base = process.env.WC_BASE_URL!;
  const key  = process.env.WC_CONSUMER_KEY!;
  const sec  = process.env.WC_CONSUMER_SECRET!;
  const auth = "Basic " + Buffer.from(`${key}:${sec}`).toString("base64");

  const url = new URL("/wp-json/wc/v3/customers", base).toString();

  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      email,
      username: email,
      first_name,
      last_name,
      password,
      billing: { first_name, last_name, email },
      shipping: { first_name, last_name },
    }),
  });

  if (!res.ok) {
    let msg = "Kayıt sırasında bir sorun oluştu.";
    try {
      const j = await res.json();
      if (typeof j?.message === "string") msg = j.message.replace(/<[^>]+>/g, "");
    } catch {}
    if (/email.*exist/i.test(msg)) msg = "Bu e-posta ile zaten bir hesap var.";
    return back(msg);
  }

  redirect("/shop/login?registered=1");
}
