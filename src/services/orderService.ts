import { prisma } from "../prisma/client";
import { OrderEntity } from "../entities/order";
import { OrderItemEntity } from "../entities/orderitem";

export class OrderService {
  static async createOrder(order: OrderEntity, items: OrderItemEntity[]) {
    return prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({ data: order });
      const orderItemsData = items.map((item) => ({
        ...item,
        orderId: newOrder.id,
      }));
      await tx.orderItem.createMany({ data: orderItemsData });
      return newOrder;
    });
  }
}
