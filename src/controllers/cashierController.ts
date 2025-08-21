import { Request, Response } from "express";
import { registerCashierSchema, loginCashierSchema } from "../validation/cashierValidation";
import { CashierUsecase } from "../usecases/cashierUsecase";

export class CashierController {
  static async register(req: Request, res: Response) {
    try {
      const { error, value } = registerCashierSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details?.[0]?.message || "Validation error" });
      }

      const cashier = await CashierUsecase.register(value);
      return res.status(201).json({ message: "Register success", cashier });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { error, value } = loginCashierSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ error: error.details?.[0]?.message || "Validation error" });
      }

      const result = await CashierUsecase.login(value);
      return res.status(200).json({ message: "Login success", ...result });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
