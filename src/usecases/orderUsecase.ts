import { OrderService } from "../services/orderService";
import { CartService } from "../services/cartService";

export class OrderUsecase {
  static async createOrderFromCart(cartId: number, userId: number) {
    const cart = await CartService.getCartById(cartId);
    if (!cart) throw new Error("Cart not found");

    return OrderService.create({
      userId,
      customerName: cart.customerName ?? null,
      subtotal: Number(cart.subtotal),
      tax: Number(cart.tax),
      total: Number(cart.total),
      payStatus: "UNPAID",
    });
  }

  static createOrder = OrderService.create;
  static getAllOrders = OrderService.findAll;
  static getOrderById = OrderService.findById;
  static updateOrder = OrderService.update;
  static deleteOrder = OrderService.delete;
  static getAllUnpaidOrders = OrderService.findAllUnpaid;
  static getAllPaidOrders = OrderService.findAllPaid;
}
