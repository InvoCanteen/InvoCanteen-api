import { Request, Response } from "express";
import { CartItemUsecase } from "@/usecases/cartItemUsesace";

export class CartItemController {
  static async addItem(req: Request, res: Response) {
    const item = await CartItemUsecase.addItem(req.body);
    res.status(201).json(item);
  }

  static async getAllItems(req: Request, res: Response) {
    const items = await CartItemUsecase.getAllItems();
    res.json(items);
  }

  static async updateItem(req: Request, res: Response) {
    const { id } = req.params;
    const { cartId, ...data } = req.body;
    const item = await CartItemUsecase.updateItem(Number(id), cartId, data);
    res.json(item);
  }

  static async deleteItem(req: Request, res: Response) {
    const { id } = req.params;
    const { cartId } = req.body;
    if (!cartId) {
      return res.status(400).json({ message: "cartId is required in the body" });
    }
    await CartItemUsecase.deleteItem(Number(id), Number(cartId));
    res.json({ success: true, message: "Item deleted successfully" });
  }

  static async getItems(req: Request, res: Response) {
    const { cartId } = req.params;
    const items = await CartItemUsecase.getItems(Number(cartId));
    res.json(items);
  }
}
