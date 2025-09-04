import { prisma } from "../prisma/client";
import { CartEntity } from "../entities/cartEntity";

export class CartService {
  static async createCart(data: CartEntity) {
    return prisma.cart.create({
      data: {
        userId: data.userId ?? undefined,
        customerName: data.customerName ?? null,
        subtotal: data.subtotal ?? 0,
        tax: data.tax ?? 0,
        total: data.total ?? 0,
        status: data.status ?? "ACTIVE",
      },
    });
  }

  static async getAllCarts() {
    return prisma.cart.findMany({
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getCartById(id: number) {
    return prisma.cart.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    });
  }

  static async updateCart(id: number, data: Partial<CartEntity>) {
    return prisma.cart.update({ where: { id }, data });
  }

  static async deleteCart(id: number) {
    return prisma.cart.delete({ where: { id } });
  }
  
}
