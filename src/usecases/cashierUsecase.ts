// src/usecases/cashierUsecase.ts
import bcrypt from "bcrypt";
import { CashierService } from "../services/cashierService";
import { generateToken } from "../utils/jwt";

export class CashierUsecase {
  static async register(data: {
    email: string;
    name?: string;
    password: string;
    photoProfile?: string | null;
  }) {
    const existing = await CashierService.findByEmail(data.email);
    if (existing) throw new Error("Email already registered");

    const cashier = await CashierService.create(data);
    return cashier;
  }

  static async login(data: { email: string; password: string }) {
    const cashier = await CashierService.findByEmail(data.email);
    if (!cashier) throw new Error("Invalid email or password");

    const valid = await bcrypt.compare(data.password, cashier.password);
    if (!valid) throw new Error("Invalid email or password");

    const token = generateToken({ id: cashier.id, email: cashier.email });
    return { cashier, token };
  }
}
