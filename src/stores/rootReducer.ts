import { combineReducers } from "@reduxjs/toolkit";

import productReducer from "../features/products/ProductSlice";

const rootReducer = combineReducers({
  products: productReducer,
});

export default rootReducer;