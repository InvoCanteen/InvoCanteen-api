export enum payStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID'
};
export interface Order {
  id?: number;
  userId: number;
  customerName?: string | null;
  subtotal: number;
  tax: number;
  total: number;
  payStatus: "UNPAID" | "PAID";
  paidAt?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
