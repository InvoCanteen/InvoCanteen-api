// controllers/cartController.ts
import { Request, Response } from "express";
import { CartUsecase } from "../usecases/cartUsecase";

export class CartController {
  static async createCart(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const cart = await CartUsecase.createCart(userId);
      res.status(201).json(cart);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async addCartItem(req: Request, res: Response) {
    try {
      const { cartId, productId, quantity, price } = req.body;
      const item = await CartUsecase.addCartItem(
        cartId,
        productId,
        quantity,
        price
      );
      res.status(201).json(item);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
