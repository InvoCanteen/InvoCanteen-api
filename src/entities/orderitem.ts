export interface OrderItemEntity {
  id?: number;
  orderId?: number;
  productId: number;
  quantity: number;
  price: number;
  subtotal: number;
  createdAt?: Date;
}
