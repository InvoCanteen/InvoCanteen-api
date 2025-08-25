import { CartItemService } from "../services/cartItemService";
import { CartUsecase } from "./cartUsecase";
import { CartItemEntity } from "../entities/cartEntity";

export class CartItemUsecase {
  static async addItem(data: CartItemEntity) {
    const item = await CartItemService.addItem(data);
    await CartUsecase.recomputeTotals(data.cartId);
    return item;
  }

  static async getAllItems() {
    return CartItemService.getAllItems();
  }

  static async updateItem(
    id: number,
    cartId: number,
    data: Partial<CartItemEntity>
  ) {
    const item = await CartItemService.updateItem(id, data);
    await CartUsecase.recomputeTotals(cartId);
    return item;
  }

  static async deleteItem(id: number, cartId: number) {
    const item = await CartItemService.deleteItem(id);
    await CartUsecase.recomputeTotals(cartId);
    return item;
  }

  static async getItems(cartId: number) {
    return CartItemService.getItemsByCart(cartId);
  }
}
