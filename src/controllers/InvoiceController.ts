import { Request, Response } from "express";
import { CreateInvoiceUseCase } from "../usecases/createInvoiceUseCase";
export class InvoiceController {
  static async createInvoice(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const { cartId, notes } = req.body;
      const order = await CreateInvoiceUseCase.execute(userId, cartId, notes);
      return res.status(201).json({ success: true, order });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }
}
