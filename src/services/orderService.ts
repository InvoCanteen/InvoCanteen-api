import { prisma } from "@/prisma/client";
export class OrderService {

  static async findAll() {
    return prisma.orders.findMany({
      include: { items: true },
    });
  }

  static async findAllUnpaid() {
    return prisma.orders.findMany({
      where: { payStatus: "UNPAID" },
      include: { items: true },
    });
  }

  static async findAllPaid() {
    return prisma.orders.findMany({
      where: { payStatus: "PAID" },
      include: { items: true },
    });
  }

  static async findById(id: number) {
    const order = await prisma.orders.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true
              }
            }
          }
        }
      },
    });


    return order;
  }

  static async update(id: number, data: any) {
    return prisma.orders.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number) {
    return prisma.orders.delete({
      where: { id },
    });
  }
}
