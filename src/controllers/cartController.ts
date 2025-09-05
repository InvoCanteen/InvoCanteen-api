import { Request, Response } from "express";
import { CartUsecase } from "@/usecases/cartUsecase";

export class CartController {
  static async createCart(req: Request, res: Response) {
    const userId = (req as any).user.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized, Login First" });
    }
    const cart = await CartUsecase.createCart(userId);
    res.status(201).json(cart);
  }

  static async getAllCarts(req: Request, res: Response) {
    const carts = await CartUsecase.getAllCarts();
    res.json(carts);
  }

  static async updateCart(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const updated = await CartUsecase.updateCart(id, data);
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
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
