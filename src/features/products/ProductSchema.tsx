import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters"),

  sku: z
    .string()
    .min(2, "SKU must be at least 2 characters"),

  category: z
    .string()
    .min(1, "Please select a category"),

  description: z
    .string()
    .optional(),

  purchasePrice: z
    .number()
    .min(0, "Purchase price cannot be negative"),

  sellingPrice: z
    .number()
    .min(0, "Selling price cannot be negative"),

  stockQuantity: z
    .number()
    .min(0, "Stock quantity cannot be negative"),

  lowStockThreshold: z
    .number()
    .min(0, "Low stock threshold cannot be negative"),

  unit: z
    .string()
    .min(1, "Please select a unit"),

  status: z.enum([
    "active",
    "inactive",
  ]),
});

export type ProductFormData =
  z.infer<typeof productSchema>;