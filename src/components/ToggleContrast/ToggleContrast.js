import { useState, useEffect } from "react";
import "./ToggleContrast.css";

function ToggleContrast() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("high-contrast", isHighContrast);
  }, [isHighContrast]);

  return (
    <div className="toggle-container">
      <button onClick={() => setIsHighContrast(!isHighContrast)}>
        Toggle High Contrast
      </button>
    </div>
  );
}

export default ToggleContrast;
