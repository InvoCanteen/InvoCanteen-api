import { prisma } from "@/prisma/client";

export const statisticService = {
  async findAll({ limit = 50, offset = 0 } = {}) {
    return prisma.orders.findMany({
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
      include: {
        items: { include: { product: { include: { category: true } } } },
      },
    });
  },

  async findByDay(date: Date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    return prisma.orders.findMany({
      where: { createdAt: { gte: start, lt: end } },
      orderBy: { createdAt: "desc" },
      include: {
        items: { include: { product: { include: { category: true } } } },
      },
    });
  },

  async findByMonth(date: Date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    return prisma.orders.findMany({
      where: { createdAt: { gte: start, lt: end } },
      orderBy: { createdAt: "desc" },
      include: {
        items: { include: { product: { include: { category: true } } } },
      },
    });
  },

  async findByYear(year: number) {
    const start = new Date(year, 0, 1); // 1 Jan
    const end = new Date(year + 1, 0, 1); // 1 Jan tahun berikutnya

    return prisma.orders.findMany({
      where: { createdAt: { gte: start, lt: end } },
      orderBy: { createdAt: "desc" },
      include: {
        items: { include: { product: { include: { category: true } } } },
      },
    });
  },

  async statsByCategory() {
    // Hitung jumlah jenis produk per kategori (makanan, minuman, cemilan)
    const products = await prisma.product.findMany({
      include: { category: true },
    });

    const result: Record<string, number> = {};

    products.forEach((p) => {
      if (!p.category?.name) return;
      result[p.category.name] = (result[p.category.name] ?? 0) + 1;
    });

    return result;
  },
};
