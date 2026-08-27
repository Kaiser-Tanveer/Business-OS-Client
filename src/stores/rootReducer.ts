import { combineReducers } from "@reduxjs/toolkit";

import productReducer from "../features/products/productSlice";
import inventoryReducer from "../features/inventory/inventorySlice";

const rootReducer = combineReducers({
  products: productReducer,
  inventory: inventoryReducer,
});

export default rootReducer;