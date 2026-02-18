import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./context/AppContext";
import App from "./App.jsx";

if (typeof __BUILD_TIME__ !== "undefined") console.debug("build:", __BUILD_TIME__);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);
