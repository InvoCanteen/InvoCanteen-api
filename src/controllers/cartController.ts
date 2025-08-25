import { Request, Response } from "express";
import { CartUsecase } from "../usecases/cartUsecase";

export class CartController {
  static async createCart(req: Request, res: Response) {
    const userId = (req as any).user?.id ?? null;
    const cart = await CartUsecase.createCart(userId);
    res.status(201).json(cart);
  }

  static async getAllCarts(req: Request, res: Response) {
    const carts = await CartUsecase.getAllCarts();
    res.json(carts);
  }

  static async getCart(req: Request, res: Response) {
    const cart = await CartUsecase.getCart(Number(req.params.id));
    res.json(cart);
  }

  static async deleteCart(req: Request, res: Response) {
    const cart = await CartUsecase.deleteCart(Number(req.params.id));
    res.json(cart);
  }
}
