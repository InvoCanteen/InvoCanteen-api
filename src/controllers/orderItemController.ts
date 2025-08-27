import { Request, Response } from "express";
import { OrderItemUsecase } from "../usecases/orderItemUsecase";

export class OrderItemController {
  static async create(req: Request, res: Response) {
    const item = await OrderItemUsecase.createOrderItem(req.body);
    res.json(item);
  }

  static async getByOrder(req: Request, res: Response) {
    const items = await OrderItemUsecase.getItemsByOrder(
      Number(req.params.orderId)
    );
    res.json(items);
  }

  static async update(req: Request, res: Response) {
    const item = await OrderItemUsecase.updateOrderItem(
      Number(req.params.id),
      req.body
    );
    res.json(item);
  }

  static async delete(req: Request, res: Response) {
    await OrderItemUsecase.deleteOrderItem(Number(req.params.id));
    res.json({ message: "OrderItem deleted" });
  }
}
