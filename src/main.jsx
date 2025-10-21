import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./Router/Router";
import { RouterProvider } from "react-router";
import AuthProvider from "./Contexts/AuthContext/AuthProvider";
import ThemeProvider from "./Contexts/ThemeContext/ThemeProvider";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
