import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { Product } from "./productTypes";

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    setProducts: (
      state,
      action: PayloadAction<Product[]>
    ) => {
      state.products = action.payload;
    },

    addProduct: (
      state,
      action: PayloadAction<Product>
    ) => {
      state.products.push(action.payload);
    },

    updateProduct: (
      state,
      action: PayloadAction<Product>
    ) => {
      const index = state.products.findIndex(
        (product) =>
          product.id === action.payload.id
      );

      if (index !== -1) {
        state.products[index] =
          action.payload;
      }
    },

    deleteProduct: (
      state,
      action: PayloadAction<string>
    ) => {
      state.products =
        state.products.filter(
          (product) =>
            product.id !== action.payload
        );
    },

    selectProduct: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.selectedProduct =
        action.payload
          ? state.products.find(
              (product) =>
                product.id === action.payload
            ) ?? null
          : null;
    },

    setLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },

    setError: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  selectProduct,
  setLoading,
  setError,
} = productSlice.actions;

export default productSlice.reducer;