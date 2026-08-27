import type { Product } from "./productTypes";

export const calculateProfit = (
  product: Product
) => {
  return (
    product.sellingPrice -
    product.purchasePrice
  );
};

export const calculateProfitMargin = (
  product: Product
) => {
  if (product.sellingPrice === 0) {
    return 0;
  }

  return (
    ((product.sellingPrice -
      product.purchasePrice) /
      product.sellingPrice) *
    100
  );
};

export const isLowStock = (
  product: Product
) => {
  return (
    product.stockQuantity <=
    product.lowStockThreshold
  );
};

export const isOutOfStock = (
  product: Product
) => {
  return product.stockQuantity <= 0;
};