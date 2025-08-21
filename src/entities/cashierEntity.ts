export interface Cashier {
  id: number;
  email: string;
  name?: string;
  password: string;
  photoProfile?: string;
  createdAt: Date;
  updatedAt: Date;
}
