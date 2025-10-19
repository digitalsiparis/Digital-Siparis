export type Review = {
  id: string;
  author: string; // "A*** B***"
  rating: number; // 1-5
  date: string;   // ISO
  body: string;
  sizeInfo?: string; // "Beden: 38" gibi
};

export type ReviewSummary = {
  avg: number; // 4.6
  count: number; // 404
  suggestNote?: string; // "Kullanıcıların çoğu kendi bedeninizi almanızı öneriyor."
};

export type QAItem = {
  id: string;
  question: string;
  askedAt: string;
  answer?: string;
  answeredAt?: string;
  vendorName?: string;
};

export async function getReviewSummary(productId: string): Promise<ReviewSummary> {
  return {
    avg: 4.6,
    count: 404,
    suggestNote: "Kullanıcıların çoğu kendi bedeninizi almanızı öneriyor.",
  };
}

export async function listReviews(productId: string, page = 1, pageSize = 6): Promise<{items: Review[]; total: number;}> {
  const seed: Review[] = Array.from({ length: 18 }).map((_, i) => ({
    id: `r-${i}`,
    author: `${"★".repeat(2)} **`,
    rating: [4, 5, 5, 4, 3][i % 5],
    date: new Date(Date.now() - i * 86400000).toISOString(),
    body:
      i % 3 === 0
        ? "36 giyiyorum 36 aldım tam oldu, bacaklarınız genişse demişler ama bana bol bile oldu."
        : i % 3 === 1
        ? "Kaliteli ve rahat. Kendi numaranızı alın. Kargo hızlıydı."
        : "Beklediğimden iyi, rengini çok beğendim. Topuk boyu günlük için ideal.",
    sizeInfo: ["Beden: 36", "Beden: 38", "Beden: 40"][i % 3],
  }));
  const start = (page - 1) * pageSize;
  return { items: seed.slice(start, start + pageSize), total: seed.length };
}

export async function listQA(productId: string, page = 1, pageSize = 5): Promise<{items: QAItem[]; total: number;}> {
  const data: QAItem[] = [
    {
      id: "q1",
      question: "Taban 1-4 cm yazıyor. 42 numara topuk yüksekliği kaç cm?",
      askedAt: "2025-09-23",
      answer: "42 numarada iç taban topuk kısmı 7 cm olarak ölçülmüştür. Keyifli alışverişler.",
      answeredAt: "2025-09-24",
      vendorName: "Madamra",
    },
    {
      id: "q2",
      question: "Kahverengi ile acı kahve rengi aynı mı?",
      askedAt: "2025-01-04",
      answer: "Aynı renk gönderilmektedir. Acı kahve tonunda diyebiliriz.",
      answeredAt: "2025-01-04",
      vendorName: "Madamra",
    },
  ];
  const start = (page - 1) * pageSize;
  return { items: data.slice(start, start + pageSize), total: data.length };
}
