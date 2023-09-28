import { useState, useEffect } from "react";
import "./ToggleContrast.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdjust } from "@fortawesome/free-solid-svg-icons";

function ToggleContrast() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("high-contrast", isHighContrast);
  }, [isHighContrast]);

  return (
    <div className="toggle-container">
      <button
        onClick={() => setIsHighContrast(!isHighContrast)}
        title="Toggle High Contrast"
      >
        <div className="contrastButton">
          <FontAwesomeIcon icon={faAdjust} />
        </div>
      </button>
    </div>
  );
}

export default ToggleContrast;
