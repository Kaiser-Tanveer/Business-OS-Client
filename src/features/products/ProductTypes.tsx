import type { BaseEntity } from "../../types/common";

export type ProductStatus =
  | "active"
  | "inactive";

export interface Product extends BaseEntity {
  name: string;
  sku: string;
  category: string;

  description?: string;

  purchasePrice: number;
  sellingPrice: number;

  stockQuantity: number;
  lowStockThreshold: number;

  unit: string;

  status: ProductStatus;

  image?: string;
}