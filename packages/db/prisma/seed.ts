import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function run() {
  const cat = await prisma.category.upsert({
    where: { slug: "kadin-ayakkabi" },
    create: { name: "Kadın Ayakkabı", slug: "kadin-ayakkabi" },
    update: {},
  });

  const p1 = await prisma.product.upsert({
    where: { slug: "madamra-cizme" },
    create: {
      title: "Madamra Kadın Çizme",
      slug: "madamra-cizme",
      description: "Şıklık ve rahatlık bir arada.",
      categoryId: cat.id,
      ratingAvg: 4.6,
      ratingCnt: 404,
      images: { create: [{ url: "/placeholder.png", position: 0 }] },
      variants: { create: [{ sku: "MR-CHZ-36", attrs: { color: "Kahverengi", size: "36" } }] },
    },
    update: {},
    include: { variants: true },
  });

  const vendor = await prisma.vendor.upsert({
    where: { slug: "magaza-a" },
    create: { name: "Mağaza A", slug: "magaza-a", score: 9.2, status: "active" },
    update: {},
  });

  await prisma.offer.upsert({
    where: { id: "seed-offer-1" },
    create: {
      id: "seed-offer-1",
      vendorId: vendor.id,
      productId: p1.id,
      variantId: p1.variants[0].id,
      priceMinor: BigInt(245990),
      currency: "TRY",
      isBest: true,
      active: true,
    },
    update: {},
  });

  console.log("Seed OK");
}

run().finally(() => prisma.$disconnect());
