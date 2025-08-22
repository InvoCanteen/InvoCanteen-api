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
      return res.status(200).json({
        code: 200,
        message: "Register success",
        status: "success",
        data: {
          cashier
        }
      });
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
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.json({
        message: 'Login success',
        data: { ...result }
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      res.json({
        message: 'Logout successful'
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Logout failed' });
    }
  }
}
