import bcrypt from "bcrypt";
import { CashierService } from "../services/userService";
import { generateToken } from "../utils/jwt";
import { User } from "../entities/userEntity";

export class CashierUsecase {
  static async register(data: {
    email: string;
    name?: string;
    password: string;
    photoProfile?: string | null;
  }) {
    // ⬅️ return type User
    const existing = await CashierService.findByEmail(data.email);
    if (existing) throw new Error("Email already registered");

    const cashier = await CashierService.create(data);
    return cashier;
  }

  static async login(data: {
    email: string;
    password: string;
  }): Promise<{ cashier: User; token: string }> {
    const cashier = (await CashierService.findByEmail(data.email)) as User; // ⬅️ kasih hint User
    if (!cashier) throw new Error("Invalid email or password");

    const valid = await bcrypt.compare(data.password, cashier.password);
    if (!valid) throw new Error("Invalid email or password");

    const token = generateToken({
      id: cashier.id,
      email: cashier.email,
      role: cashier.role, //
    });

    return { cashier, token };
  }
}
