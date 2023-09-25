import React from "react";
import { useError } from "../context/ErrorContext"; // Adjust the import according to your folder structure

function ErrorDisplay() {
  const { error, setError } = useError();

  if (!error) return null;

  return (
    <div className="notification is-danger">
      <button className="delete" onClick={() => setError(null)}></button>
      {error}
    </div>
  );
}

export default ErrorDisplay;
