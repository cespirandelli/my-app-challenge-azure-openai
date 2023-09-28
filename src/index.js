import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ErrorProvider } from "./context/ErrorContext";

//react-axe é uma biblioteca utilizada para verificar se a aplicação está acessível durante desenvolvimento
if (process.env.NODE_ENV !== "production") {
  const axe = require("react-axe");
  axe(React, ReactDOM, 1000);
}

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <ErrorProvider>
    <App />
  </ErrorProvider>
);
