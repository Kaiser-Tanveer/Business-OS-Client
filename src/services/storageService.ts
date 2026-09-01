const STORAGE_KEY = "business-os-state";

export const storageService = {
  // =========================================
  // LOAD STATE
  // =========================================

  loadState: <T>(): T | undefined => {
    try {
      const serializedState =
        localStorage.getItem(STORAGE_KEY);

      if (!serializedState) {
        return undefined;
      }

      return JSON.parse(
        serializedState
      ) as T;
    } catch (error) {
      console.error(
        "Failed to load application state:",
        error
      );

      return undefined;
    }
  },

  // =========================================
  // SAVE STATE
  // =========================================

  saveState: <T>(state: T): void => {
    try {
      const serializedState =
        JSON.stringify(state);

      localStorage.setItem(
        STORAGE_KEY,
        serializedState
      );
    } catch (error) {
      console.error(
        "Failed to save application state:",
        error
      );
    }
  },

  // =========================================
  // CLEAR STATE
  // =========================================

  clearState: (): void => {
    try {
      localStorage.removeItem(
        STORAGE_KEY
      );
    } catch (error) {
      console.error(
        "Failed to clear application state:",
        error
      );
    }
  },
};