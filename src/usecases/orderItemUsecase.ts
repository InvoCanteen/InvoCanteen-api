import { OrderItemService } from "@/services/orderItemService";

export class OrderItemUsecase {
  static createOrderItem = OrderItemService.create;
  static getItemsByOrder = OrderItemService.findAllByOrder;
  static updateOrderItem = OrderItemService.update;
  static deleteOrderItem = OrderItemService.delete;
}
