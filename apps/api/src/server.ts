import Fastify from "fastify";
import cors from "@fastify/cors";
// alias kullan: tsconfig.json -> paths "@db/*"
import prisma from "@db/index";

const app = Fastify({ logger: true });

async function start() {
  await app.register(cors, { origin: true, credentials: true });

  app.get("/health", async () => ({ ok: true }));

  // LIST products
  app.get("/catalog/products", async (req: any, reply) => {
    const q = (req as any).query ?? {};
    const page = Number(q.page ?? 1);
    const pageSize = Math.min(Number(q.pageSize ?? 12), 48);

    const where: any = {};
    if (q.category) where.category = { slug: String(q.category) };
    if (q.q) where.title = { contains: String(q.q), mode: "insensitive" };

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: { images: { orderBy: { position: "asc" } } }
      }),
      prisma.product.count({ where })
    ]);

    reply.send({
      items: items.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        description: p.description ?? "",
        image: (p as any).images?.[0]?.url ?? "",
        images: (p as any).images?.map((i: any) => i.url) ?? [],
        price: undefined,
        category: q.category ?? undefined,
        rating: p.ratingAvg ? Number(p.ratingAvg) : undefined,
        attributes: [],
        variants: {}
      })),
      total,
      page,
      pageSize
    });
  });

  // GET product by id/slug
  app.get<{ Params: { idOrSlug: string } }>("/catalog/products/:idOrSlug", async (req, reply) => {
    const { idOrSlug } = req.params;
    const p = await prisma.product.findFirst({
      where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
      include: { images: { orderBy: { position: "asc" } } }
    });
    if (!p) return reply.code(404).send({ error: "not_found" });

    reply.send({
      id: p.id,
      slug: p.slug,
      title: p.title,
      description: p.description ?? "",
      image: (p as any).images?.[0]?.url ?? "",
      images: (p as any).images?.map((i: any) => i.url) ?? [],
      price: undefined,
      category: undefined,
      rating: p.ratingAvg ? Number(p.ratingAvg) : undefined,
      attributes: [],
      variants: {}
    });
  });

  // OFFERS for product
  app.get<{ Params: { id: string } }>("/catalog/products/:id/offers", async (req, reply) => {
    const { id } = req.params;
    const offers = await prisma.offer.findMany({
      where: { productId: id, active: true },
      include: { vendor: true }
    });

    reply.send(
      offers
        .map((o) => ({
          vendorId: o.vendorId,
          vendorName: o.vendor.name,
          vendorScore: o.vendor.score ? Number(o.vendor.score) : undefined,
          price: Number(o.priceMinor) / 100,
          shippingBadge: "Kargo Bedava",
          isBest: o.isBest
        }))
        .sort((a, b) => a.price - b.price)
    );
  });

  // PARTNER application
  app.post("/applications", async (req: any, reply) => {
    const body = req.body ?? {};
    if (!body.companyName || !body.email) {
      return reply.code(400).send({ ok: false, message: "Eksik alanlar" });
    }
    const appRow = await prisma.partnerApplication.create({
      data: {
        flow: body.flow ?? "marketplace",
        companyName: body.companyName,
        email: body.email,
        phone: body.phone ?? null,
        companyType: body.companyType ?? null,
        province: body.province ?? null,
        district: body.district ?? null,
        category: body.category ?? null,
        refCode: body.refCode ?? null,
        status: "received"
      }
    });
    reply.send({ ok: true, id: appRow.id, message: "Başvurun alındı." });
  });

  const PORT = Number(process.env.PORT ?? 4000);
  await app.listen({ port: PORT, host: "0.0.0.0" });
  console.log(`API running on http://localhost:${PORT}`);
}

start().catch((err) => {
  app.log.error(err);
  process.exit(1);
});
