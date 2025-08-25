import { CartService } from "../services/cartService";
import { CartEntity, CartItemEntity } from "../entities/cartEntity";
import { prisma } from "../prisma/client";

export class CartUsecase {
  static async createCart(userId: number) {
    return CartService.createCart({ userId });
  }

  static async addCartItem(
    cartId: number,
    productId: number,
    quantity: number,
    price: number
  ) {
    const subtotal = quantity * Number(price);

    const cartItem: CartItemEntity = {
      cartId,
      productId,
      quantity,
      price,
      subtotal,
    };

    // simpan cart item
    const item = await CartService.addCartItem(cartItem);

    // update subtotal cart
    const cart = await CartService.getCartById(cartId);
    if (!cart) throw new Error("Cart not found");

    const newSubtotal = cart.items.reduce(
      (acc, i) => acc + Number(i.subtotal),
      0
    );
    const tax = newSubtotal * 0.1;
    const total = newSubtotal + tax;

    await prisma.cart.update({
      where: { id: cartId },
      data: { subtotal: newSubtotal, tax, total },
    });

    return item;
  }
}
