"use server";

type ApplyPayload = {
  flow: "download" | "marketplace" | "market";
  companyName: string;
  email: string;
  phone: string;
  companyType: string;
  province: string;
  district: string;
  category: string;
  refCode?: string;
  consent: boolean;
};

export async function submitPartnerApplication(_: any, formData: FormData) {
  const payload: ApplyPayload = {
    flow: (formData.get("flow") as any) || "marketplace",
    companyName: String(formData.get("companyName") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    companyType: String(formData.get("companyType") || ""),
    province: String(formData.get("province") || ""),
    district: String(formData.get("district") || ""),
    category: String(formData.get("category") || ""),
    refCode: String(formData.get("refCode") || ""),
    consent: formData.get("consent") === "on",
  };

  // TODO: burada gerçek DB/CRM entegrasyonu
  console.log("PARTNER APPLY (mock):", payload);

  return {
    ok: true,
    message: "Başvurun alındı. Ekibimiz en kısa sürede iletişime geçecek.",
  };
}
