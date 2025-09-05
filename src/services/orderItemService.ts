import { prisma } from "@/prisma/client";
import { OrderItem } from "@/entities/orderItemEntity";

export class OrderItemService {
  static async create(data: OrderItem) {
    const orderExists = await prisma.orders.findUnique({
      where: { id: data.orderId },
    });
    if (!orderExists)
      throw new Error(`Order with id ${data.orderId} not found`);

    const productExists = await prisma.product.findUnique({
      where: { id: data.productId },
    });
    if (!productExists)
      throw new Error(`Product with id ${data.productId} not found`);

    return prisma.orderItem.create({
      data: {
        orderId: data.orderId,
        productId: data.productId,
        quantity: data.quantity,
        price: data.price,
        subtotal: data.subtotal,
      },
    });
  }

  static async findAllByOrder(orderId: number) {
    return prisma.orderItem.findMany({
      where: { orderId },
    });
  }

  static async update(id: number, data: Partial<OrderItem>) {
    return prisma.orderItem.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number) {
    return prisma.orderItem.delete({
      where: { id },
    });
  }
}
