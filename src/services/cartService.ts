// services/cartService.ts
import { prisma } from "../prisma/client";
import { CartEntity, CartItemEntity } from "../entities/cartEntity";
import { CartStatus } from "../../generated/prisma";
export class CartService {
  static async createCart(data: CartEntity) {
    return prisma.cart.create({
      data: {
        userId: data.userId,
        subtotal: 0,
        tax: 0,
        total: 0,
        status: CartStatus.ACTIVE, // pakai enum, lebih aman
      },
    });
  }

  static async addCartItem(data: CartItemEntity) {
    return prisma.cartItem.create({
      data: {
        cartId: data.cartId,
        productId: data.productId,
        quantity: data.quantity,
        price: data.price,
        subtotal: data.subtotal,
      },
    });
  }

  static async getCartById(cartId: number) {
    return prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            product: true, // ✅ include product biar langsung dapat detail
          },
        },
      },
    });
  }

  static async clearCart(cartId: number) {
    return prisma.cartItem.deleteMany({
      where: { cartId },
    });
  }
}
