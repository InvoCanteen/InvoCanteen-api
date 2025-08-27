import { prisma } from "../prisma/client";
import { Prisma } from "../../generated/prisma";
import { Order } from "../entities/orderEntity";
export class OrderService {
  // Create order
  static async create(data: Order) {
    // Pastikan user ada
    const userExists = await prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!userExists) throw new Error(`User with id ${data.userId} not found`);

    // Create order
    return prisma.orders.create({
      data: {
        user: { connect: { id: data.userId } }, // nested connect ke user
        subtotal: data.subtotal,
        tax: data.tax,
        total: data.total,
        payStatus: data.payStatus || "UNPAID",
        paidAt: data.paidAt ?? null, // ganti undefined jadi null
        notes: data.notes ?? null, // ganti undefined jadi null
      },
    });
  }

  static async findAll() {
    return prisma.orders.findMany({
      include: { items: true },
    });
  }

  static async findById(id: number) {
    return prisma.orders.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  static async update(id: number, data: Prisma.OrdersUpdateInput) {
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
