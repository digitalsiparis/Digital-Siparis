"use server";

import { cookies } from "next/headers";

const CART_COOKIE = "ds_cart_id";
const API_URL = process.env.WC_API_URL || "https://digitalsiparis.com/wp-json/wc/store/v1";

async function getCartFromWoo() {
  const res = await fetch(`${API_URL}/cart`, { cache: "no-store", credentials: "include" });
  if (!res.ok) throw new Error("Cart fetch failed");
  return res.json();
}

export async function addToCart(productId: number, quantity = 1) {
  const res = await fetch(`${API_URL}/cart/add-item`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: productId, quantity }),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Add to cart failed");
  return res.json();
}

export async function removeFromCart(itemKey: string) {
  const res = await fetch(`${API_URL}/cart/remove-item/${itemKey}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res.ok;
}

export async function getCart() {
  try {
    return await getCartFromWoo();
  } catch (e) {
    console.error("Cart fetch error", e);
    return { items: [] };
  }
}
