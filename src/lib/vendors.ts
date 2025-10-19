import { CORE_API_BASE, coreClient, type Offer } from "./core";
import { mockGetOffers } from "./mock-store";

export async function getVendorOffers(productId: string): Promise<Offer[]> {
  if (CORE_API_BASE) return coreClient.getOffers(productId);
  return Promise.resolve(mockGetOffers(productId));
}
