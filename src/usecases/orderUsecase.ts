import { OrderService } from "../services/orderService";
import { CartService } from "../services/cartService";
import { prisma } from "@/prisma/client";

export class OrderUsecase {
  static async createOrderFromCart(cartId: number, userId: number) {

    return prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: { id: cartId },
        include: { items: true },
      });

      if (!cart) {
        throw new Error("Cart not found");
      }
      if (cart.items.length === 0) {
        throw new Error("Cannot checkout an empty cart");
      }
      if (cart.status === "CHECKED_OUT") {
        throw new Error("This cart has already been checked out");
      }

      const order = await tx.orders.create({
        data: {
          userId,
          sourceCartId: cart.id,
          customerName: cart.customerName,
          subtotal: cart.subtotal,
          tax: cart.tax,
          total: cart.total,
          payStatus: "UNPAID",
        },
      });

      const orderItemsData = cart.items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
      }));
      await tx.orderItem.createMany({ data: orderItemsData });

      await tx.cartItem.deleteMany({ where: { cartId: cartId } });

      await tx.cart.delete({ where: { id: cartId } });

      return order;
    });
  }

  static async markOrderAsPaid(orderId: number) {
    const order = await OrderService.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.payStatus === "PAID") {
      throw new Error("This order has already been paid");
    }

    return OrderService.update(orderId, {
      payStatus: "PAID",
      paidAt: new Date(),
    });
  }

  static getAllOrders = OrderService.findAll;
  static getOrderById = OrderService.findById;
  static deleteOrder = OrderService.delete;
  static getAllUnpaidOrders = OrderService.findAllUnpaid;
  static getAllPaidOrders = OrderService.findAllPaid;
}
