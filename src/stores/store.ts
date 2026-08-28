import { combineReducers } from "@reduxjs/toolkit";

import productReducer from "../features/products/productSlice";
import inventoryReducer from "../features/inventory/inventorySlice";
import salesReducer from "../features/sales/salesSlice";

const rootReducer = combineReducers({
  products: productReducer,
  inventory: inventoryReducer,
  sales: salesReducer,
});

export default rootReducer;