import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./context/AppContext";
import App from "./App.jsx";
import PasswordGate from "./components/PasswordGate.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PasswordGate>
      <AppProvider>
        <App />
      </AppProvider>
    </PasswordGate>
  </StrictMode>
);
