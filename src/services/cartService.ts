import { prisma } from "../connection/prisma";

export class CartService {
  static async getCartById(cartId: number) {
    return prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  static async clearCart(cartId: number) {
    return prisma.cartItem.deleteMany({ where: { cartId } });
  }
}
