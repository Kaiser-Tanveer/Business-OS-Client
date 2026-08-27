export type StockMovementType =
  | "IN"
  | "OUT"
  | "ADJUSTMENT";

export type StockMovementReason =
  | "PURCHASE"
  | "SALE"
  | "DAMAGE"
  | "RETURN"
  | "CORRECTION"
  | "OTHER";

export interface StockMovement {
  id: string;

  productId: string;

  type: StockMovementType;

  reason: StockMovementReason;

  quantity: number;

  note?: string;

  createdAt: string;
}