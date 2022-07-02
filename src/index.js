import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app";
import { AuthProvider } from "./context/AuthContext";
import { AnimatePresence } from "framer-motion";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <AnimatePresence>
      <App />
    </AnimatePresence>
  </AuthProvider>
);
reportWebVitals();
