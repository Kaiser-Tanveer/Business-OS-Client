import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./i18n/index";

import App from "./App";
import { ThemeProvider } from "./context/themeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);