import React from "react";
import { useError } from "../../context/ErrorContext";
import "./ErrorDisplay.css"; // Importando o arquivo CSS

function ErrorDisplay() {
  const { error, setError } = useError();

  if (!error) return null;

  return (
    <div className="error-backdrop">
      <div className="error-modal">
        <p>{error}</p>
        <button onClick={() => setError(null)} aria-label="Close error message">
          Fechar
        </button>
      </div>
    </div>
  );
}

export default ErrorDisplay;
