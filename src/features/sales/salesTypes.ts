export type PaymentStatus =
  | "PAID"
  | "PARTIAL"
  | "DUE";

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Sale {
  id: string;
  invoiceNumber: string;

  customerId?: string;
  customerName?: string;

  items: SaleItem[];

  subtotal: number;
  discount: number;
  total: number;

  paidAmount: number;
  dueAmount: number;

  paymentStatus: PaymentStatus;

  createdAt: string;
  updatedAt: string;
}