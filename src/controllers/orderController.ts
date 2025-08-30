import { Request, Response } from "express";
import { OrderUsecase } from "@/usecases/orderUsecase";

export class OrderController {
  static async create(req: Request, res: Response) {
    try {
      const order = await OrderUsecase.createOrder(req.body);
      res.json(order);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    const orders = await OrderUsecase.getAllOrders();
    res.json(orders);
  }

  static async getById(req: Request, res: Response) {
    const order = await OrderUsecase.getOrderById(Number(req.params.id));
    res.json(order);
  }

  static async update(req: Request, res: Response) {
    const order = await OrderUsecase.updateOrder(
      Number(req.params.id),
      req.body
    );
    res.json(order);
  }

  static async delete(req: Request, res: Response) {
    await OrderUsecase.deleteOrder(Number(req.params.id));
    res.json({ message: "Order deleted" });
  }
}
