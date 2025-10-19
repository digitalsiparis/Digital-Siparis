"use server";

import { CORE_API_BASE, coreClient } from "./core";
import { mockSubmitApplication } from "./mock-store";

export async function submitPartnerApplication(_: any, formData: FormData) {
  const payload = {
    flow: (formData.get("flow") as "download"|"marketplace"|"market") || "marketplace",
    companyName: String(formData.get("companyName") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    companyType: String(formData.get("companyType") || "").trim(),
    province: String(formData.get("province") || "").trim(),
    district: String(formData.get("district") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    refCode: String(formData.get("refCode") || "").trim(),
    consent: formData.get("consent") === "on",
  };

  if (!payload.companyName || !payload.email || !payload.consent) {
    return { ok: false, message: "Lütfen zorunlu alanları doldurun." };
  }

  if (CORE_API_BASE) {
    const { ok, id, message } = await coreClient.submitPartnerApplication(payload as any);
    return { ok, message: message ?? (ok ? "Başvurun alındı." : "Hata oluştu"), id };
  }
  // MOCK persist
  const res = mockSubmitApplication(payload as any);
  return { ok: true, message: res.message, id: res.id };
}
