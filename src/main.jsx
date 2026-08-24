import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { MusicProvider } from "./context/MusicContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <MusicProvider>
          <App />
        </MusicProvider>
      </AuthProvider>
    </ToastProvider>
  </StrictMode>
);