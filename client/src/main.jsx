import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";

import App from "./App";

import AuthProvider from "./context/AuthContext";
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster position="top-right" />
    </AuthProvider>
  </StrictMode>
);