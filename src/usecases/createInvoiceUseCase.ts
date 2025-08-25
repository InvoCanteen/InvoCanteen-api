import { CartService } from "../services/cartService";
import { OrderService } from "../services/orderService";
import { calculateTotal } from "../utils/calculateTotal";
import { OrderEntity } from "../entities/order";
import { OrderItemEntity } from "../entities/orderitem";

export class CreateInvoiceUseCase {
  static async execute(userId: number, cartId: number, notes?: string) {
    const cart = await CartService.getCartById(cartId);

    if (!cart || !cart.items || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    const cartItems = cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: Number(item.price),
      subtotal: Number(item.subtotal),
    }));

    const { subtotal, tax, total } = calculateTotal(cartItems);

    const order: OrderEntity = {
      sourceCartId: cartId,
      userId,
      subtotal,
      tax,
      total,
      payStatus: "UNPAID",
      notes: notes || "",
    };

    const orderItems: OrderItemEntity[] = cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: Number(item.price),
      subtotal: Number(item.subtotal),
    }));
  }
}
