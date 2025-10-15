// src/lib/i18n.ts
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  // locale her zaman string olsun (fallback: 'tr')
  const l = (locale ?? "tr") as "tr" | "en";

  const messages = (await import(`../messages/${l}.json`)).default;

  return {
    locale: l, // string garanti
    messages,
  };
});
