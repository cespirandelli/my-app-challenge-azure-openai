import React, { useEffect, useRef } from "react";

const PurchaseConfirmation = ({ onRestart }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);

  return (
    <div className="confirmation" role="status" aria-live="assertive">
      <h2>Compra realizada com sucesso, muito obrigado!</h2>
      <button
        onClick={onRestart}
        aria-label="Clique para fazer uma nova compra"
        ref={buttonRef}
      >
        Fazer Nova Compra
      </button>
    </div>
  );
};

export default PurchaseConfirmation;
