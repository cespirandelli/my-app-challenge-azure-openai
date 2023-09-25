import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ErrorProvider } from "./context/ErrorContext";

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el);

root.render(
  <ErrorProvider>
    <App />
  </ErrorProvider>
);
