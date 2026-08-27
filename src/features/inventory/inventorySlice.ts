import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type {
  StockMovement,
} from "./inventoryTypes";

interface InventoryState {
  movements: StockMovement[];
}

const initialState: InventoryState = {
  movements: [],
};

const inventorySlice = createSlice({
  name: "inventory",

  initialState,

  reducers: {

    // --------------------------------
    // SET MOVEMENTS
    // --------------------------------

    setMovements: (
      state,
      action: PayloadAction<StockMovement[]>
    ) => {
      state.movements = action.payload;
    },

    // --------------------------------
    // ADD MOVEMENT
    // --------------------------------

    addMovement: (
      state,
      action: PayloadAction<StockMovement>
    ) => {
      state.movements.unshift(
        action.payload
      );
    },

    // --------------------------------
    // DELETE MOVEMENT
    // --------------------------------

    deleteMovement: (
      state,
      action: PayloadAction<string>
    ) => {
      state.movements =
        state.movements.filter(
          (movement) =>
            movement.id !== action.payload
        );
    },

  },
});

export const {
  setMovements,
  addMovement,
  deleteMovement,
} = inventorySlice.actions;

export default inventorySlice.reducer;