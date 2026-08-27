import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { Product } from "./productTypes";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    // =========================================
    // SET PRODUCTS
    // =========================================

    setProducts: (
      state,
      action: PayloadAction<Product[]>
    ) => {
      state.products = action.payload;
    },

    // =========================================
    // ADD PRODUCT
    // =========================================

    addProduct: (
      state,
      action: PayloadAction<Product>
    ) => {
      state.products.push(
        action.payload
      );
    },

    // =========================================
    // UPDATE PRODUCT
    // =========================================

    updateProduct: (
      state,
      action: PayloadAction<Product>
    ) => {
      const index =
        state.products.findIndex(
          (product) =>
            product.id ===
            action.payload.id
        );

      if (index !== -1) {
        state.products[index] =
          action.payload;
      }
    },

    // =========================================
    // DELETE PRODUCT
    // =========================================

    deleteProduct: (
      state,
      action: PayloadAction<string>
    ) => {
      state.products =
        state.products.filter(
          (product) =>
            product.id !==
            action.payload
        );
    },

    // =========================================
    // UPDATE STOCK
    // =========================================

    updateProductStock: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
      }>
    ) => {
      const product =
        state.products.find(
          (item) =>
            item.id ===
            action.payload.productId
        );

      if (!product) {
        return;
      }

      product.stockQuantity =
        action.payload.quantity;

      product.updatedAt =
        new Date().toISOString();
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
} = productSlice.actions;

export default productSlice.reducer;