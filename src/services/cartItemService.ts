import { prisma } from "@/prisma/client";
import { CartItemEntity } from "@/entities/cartEntity";

export class CartItemService {
  static async addItem(data: CartItemEntity) {
    const product = await prisma.product.findUnique({
      where: {
        id: data.productId,
      },
      select: {
        price: true,
      },
    });

    if (!product) {
      throw new Error(`Product with ID ${data.productId} not found.`);
    }

    const quantity = data.quantity ?? 1;
    const subtotal = product.price.toNumber() * quantity;

    return prisma.cartItem.create({
      data: {
        cartId: data.cartId,
        productId: data.productId ?? undefined,
        quantity: quantity,
        price: product.price,
        subtotal: subtotal,
      },
    });
  }

  static async getAllItems() {
    return prisma.cartItem.findMany({
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getItemsByCart(cartId: number) {
    return prisma.cartItem.findMany({
      where: { cartId },
      include: { product: true },
    });
  }

  static async updateItem(id: number, data: Partial<CartItemEntity>) {
    return prisma.cartItem.update({ where: { id }, data });
  }

  static async deleteItem(id: number) {
    return prisma.cartItem.delete({ where: { id } });
  }
}
