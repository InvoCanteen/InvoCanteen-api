import { prisma } from "../connection/prisma";
import bcrypt from "bcrypt";

export class CashierService {
  static async create(data: {
    email: string;
    name?: string;
    password: string;
    photoProfile?: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name || "user",
        password: hashedPassword,
        photoProfile: data.photoProfile || "",
      },
    });
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
}
