import { Request, Response } from "express";
import { OrderUsecase } from "@/usecases/orderUsecase";

export class OrderController {

  static async createFromCart(req: Request, res: Response) {
    try {
      const { cartId } = req.body;
      const userId = (req as any).user?.id;
      const order = await OrderUsecase.createOrderFromCart(cartId, userId);
      res.status(201).json({ success: true, data: order });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    const orders = await OrderUsecase.getAllOrders();
    res.json({ success: true, data: orders });
  }

  static async getAllUnpaid(req: Request, res: Response) {
    try {
      const orders = await OrderUsecase.getAllUnpaidOrders();
      res.json({ success: true, data: orders });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getAllPaid(req: Request, res: Response) {
    try {
      const orders = await OrderUsecase.getAllPaidOrders();
      res.json({ success: true, data: orders });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid order ID" });
      }

      const order = await OrderUsecase.getOrderById(id);

      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }

      res.json({ success: true, data: order });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async markAsPaid(req: Request, res: Response) {
    try {
      const orderId = Number(req.params.id);

      if (isNaN(orderId)) {
        return res.status(400).json({ success: false, message: "Invalid order ID" });
      }

      const order = await OrderUsecase.markOrderAsPaid(orderId);
      res.json({ success: true, data: order });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    await OrderUsecase.deleteOrder(Number(req.params.id));
    res.json({ success: true, message: "Order deleted" });
  }
}
