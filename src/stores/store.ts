import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";

import { storageService } from "../services/storageService";

// =========================================
// LOAD PERSISTED STATE
// =========================================

const persistedState =
  storageService.loadState();

// =========================================
// CREATE STORE
// =========================================

export const store = configureStore({
  reducer: rootReducer,

  preloadedState: persistedState,

  devTools: import.meta.env.DEV,
});

// =========================================
// SAVE STATE
// =========================================

store.subscribe(() => {
  storageService.saveState(
    store.getState()
  );
});

// =========================================
// TYPES
// =========================================

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;