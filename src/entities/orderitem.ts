export interface OrderItemEntity {
  id?: number;
  orderId?: number;
  productId: number | null;
  quantity: number;
  price: number;
  subtotal: number;
  createdAt?: Date;
}
