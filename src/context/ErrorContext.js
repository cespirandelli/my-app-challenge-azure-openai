import React, { createContext, useState, useContext } from "react";

const ErrorContext = createContext();

function ErrorProvider({ children }) {
  const [error, setError] = useState(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
}

function useError() {
  const context = useContext(ErrorContext);
  if (!context)
    throw new Error("useError must be used within an ErrorProvider");
  return context;
}

export { ErrorProvider, useError };
