import type { StockMovement } from "./inventoryTypes";

export const mockStockMovements: StockMovement[] = [
  {
    id: "movement-001",
    productId: "product-001",
    type: "IN",
    reason: "PURCHASE",
    quantity: 100,
    note: "Initial stock purchase",
    createdAt: "2026-08-20T09:30:00.000Z",
  },

  {
    id: "movement-002",
    productId: "product-002",
    type: "IN",
    reason: "PURCHASE",
    quantity: 50,
    note: "Supplier delivery",
    createdAt: "2026-08-21T10:15:00.000Z",
  },

  {
    id: "movement-003",
    productId: "product-001",
    type: "OUT",
    reason: "SALE",
    quantity: 20,
    note: "Customer sale",
    createdAt: "2026-08-22T14:20:00.000Z",
  },

  {
    id: "movement-004",
    productId: "product-003",
    type: "OUT",
    reason: "DAMAGE",
    quantity: 5,
    note: "Damaged items",
    createdAt: "2026-08-23T11:00:00.000Z",
  },
];