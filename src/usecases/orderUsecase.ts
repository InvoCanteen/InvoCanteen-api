import { OrderService } from "@/services/orderService";

export class OrderUsecase {
  static createOrder = OrderService.create;
  static getAllOrders = OrderService.findAll;
  static getOrderById = OrderService.findById;
  static updateOrder = OrderService.update;
  static deleteOrder = OrderService.delete;
}
