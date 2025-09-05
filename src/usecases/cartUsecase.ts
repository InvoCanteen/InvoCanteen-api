
import { CartService } from "../services/cartService";
import { CartItemService } from "../services/cartItemService";
import { CartEntity } from "../entities/cartEntity";

export class CartUsecase {
  static async createCart(userId: number) {
    return CartService.createCart({ userId });
  }

  static async getAllCarts() {
    return CartService.getAllCarts();
  }

  static async getCart(id: number) {
    return CartService.getCartById(id);
  }

  static async updateCart(id: number, data: Partial<CartEntity>) {
    return CartService.updateCart(id, data);
  }

  static async deleteCart(id: number) {
    return CartService.deleteCart(id);
  }

  static async recomputeTotals(cartId: number) {
    const items = await CartItemService.getItemsByCart(cartId);
    const subtotal = items.reduce((acc: number, i: any) => acc + Number(i.subtotal), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    return CartService.updateCart(cartId, { subtotal, tax, total });
  }
}
