import React from "react";

const Cart = ({ cart, itemCount, lastAddedItem, onFinalizePurchase }) => {
  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + parseFloat(product.price),
      0
    );
  };

  const formattedTotal = calculateTotal().toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="cart">
      <h2 id="cart-title">Carrinho</h2>
      {cart.length > 0 ? (
        <div>
          {lastAddedItem && (
            <p>{`"${lastAddedItem.product}" adicionado ao carrinho`}</p>
          )}
          <p>
            {`${itemCount} ${itemCount === 1 ? "item" : "itens"} no carrinho`}
          </p>
          <ul aria-labelledby="cart-title">
            {cart.map((product) => (
              <li key={product.id}>
                {product.product} - R$ {parseFloat(product.price).toFixed(2)}
              </li>
            ))}
          </ul>
          <p>Total: {formattedTotal}</p>
        </div>
      ) : (
        <p>O carrinho está vazio</p>
      )}
      <button
        onClick={onFinalizePurchase}
        disabled={cart.length === 0}
        title="Botão para finalizar compra"
      >
        Finalizar Compra
      </button>
    </div>
  );
};

export default Cart;
