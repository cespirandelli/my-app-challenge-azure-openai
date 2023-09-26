import React from "react";
import { useError } from "../context/ErrorContext"; // Adjust the import according to your folder structure

function ErrorDisplay() {
  const { error, setError } = useError();

  if (!error) return null;

  return (
    <div
      className="notification is-danger"
      role="alert"
      aria-live="assertive" // This will make screen readers announce this alert immediately.
    >
      <button
        className="delete"
        onClick={() => setError(null)}
        aria-label="Fechar mensagem de erro" // This provides a readable name for the button
      ></button>
      {error}
    </div>
  );
}

export default ErrorDisplay;
