import { combineReducers } from "@reduxjs/toolkit";

import productReducer from "../features/products/productSlice";

const rootReducer = combineReducers({
  products: productReducer,
});

export default rootReducer;