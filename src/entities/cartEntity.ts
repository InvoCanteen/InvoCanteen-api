import { CartStatus } from "../../generated/prisma";

export interface CartEntity {
  id?: number;
  userId: number;
  customerName?: string;
  subtotal?: number;
  tax?: number;
  total?: number;
  status?: CartStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItemEntity {
  id?: number;
  cartId: number;
  productId: number;
  quantity: number;
  price: number;
  subtotal: number;
  createdAt?: Date;
}
