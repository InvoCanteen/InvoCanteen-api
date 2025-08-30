export enum payStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID'
};
export interface Order {
  id?: number;
  userId: number;
  subtotal: number;
  tax: number;
  total: number;
  payStatus?: payStatus;
  paidAt?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
