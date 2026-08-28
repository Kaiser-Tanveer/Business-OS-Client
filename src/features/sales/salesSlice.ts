import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { Sale } from "./salesTypes";

interface SalesState {
  sales: Sale[];
}

const initialState: SalesState = {
  sales: [],
};

const salesSlice = createSlice({
  name: "sales",

  initialState,

  reducers: {
    // =========================================
    // SET SALES
    // =========================================

    setSales: (
      state,
      action: PayloadAction<Sale[]>
    ) => {
      state.sales = action.payload;
    },

    // =========================================
    // ADD SALE
    // =========================================

    addSale: (
      state,
      action: PayloadAction<Sale>
    ) => {
      state.sales.unshift(action.payload);
    },

    // =========================================
    // UPDATE SALE
    // =========================================

    updateSale: (
      state,
      action: PayloadAction<Sale>
    ) => {
      const index =
        state.sales.findIndex(
          (sale) =>
            sale.id === action.payload.id
        );

      if (index !== -1) {
        state.sales[index] =
          action.payload;
      }
    },

    // =========================================
    // DELETE SALE
    // =========================================

    deleteSale: (
      state,
      action: PayloadAction<string>
    ) => {
      state.sales =
        state.sales.filter(
          (sale) =>
            sale.id !== action.payload
        );
    },
  },
});

export const {
  setSales,
  addSale,
  updateSale,
  deleteSale,
} = salesSlice.actions;

export default salesSlice.reducer;