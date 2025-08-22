export interface OrderEntity {
  id?: number;
  sourceCartId: number;
  userId: number;
  subtotal: number;
  tax: number;
  total: number;
  payStatus?: "UNPAID" | "PAID";
  paidAt?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
