import React from "react";

const PurchaseConfirmation = ({ onRestart }) => {
  return (
    <div className="confirmation">
      <h2>Compra realizada, muito obrigado!</h2>
      <button onClick={onRestart}>Fazer Nova Compra</button>
    </div>
  );
};

export default PurchaseConfirmation;
