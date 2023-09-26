import { useState, useEffect } from "react";

function ToggleContrast() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("high-contrast", isHighContrast);
  }, [isHighContrast]);

  return (
    <button onClick={() => setIsHighContrast(!isHighContrast)}>
      Toggle High Contrast
    </button>
  );
}

export default ToggleContrast;
