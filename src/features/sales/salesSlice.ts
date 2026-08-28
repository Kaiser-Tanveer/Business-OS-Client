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
    addSale: (
      state,
      action: PayloadAction<Sale>
    ) => {
      state.sales.unshift(action.payload);
    },

    updateSale: (
      state,
      action: PayloadAction<Sale>
    ) => {
      const index = state.sales.findIndex(
        (sale) =>
          sale.id === action.payload.id
      );

      if (index !== -1) {
        state.sales[index] = action.payload;
      }
    },

    deleteSale: (
      state,
      action: PayloadAction<string>
    ) => {
      state.sales = state.sales.filter(
        (sale) =>
          sale.id !== action.payload
      );
    },
  },
});

export const {
  addSale,
  updateSale,
  deleteSale,
} = salesSlice.actions;

export default salesSlice.reducer;