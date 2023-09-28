import React from "react";

const Cart = ({ cart, itemCount, lastAddedItem, onFinalizePurchase }) => {
  // Função para calcular o total dos preços dos produtos no carrinho
  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + parseFloat(product.price),
      0
    );
  };

  // Formata o total com vírgula como separador decimal
  const formattedTotal = calculateTotal().toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="cart">
      <h2>Carrinho</h2>
      {cart.length > 0 ? (
        <div>
          {lastAddedItem && (
            <p>{`"${lastAddedItem.product}" adicionado ao carrinho`}</p>
          )}
          <p>
            {`${itemCount} ${itemCount === 1 ? "item" : "itens"} no carrinho`}
          </p>
          <ul>
            {cart.map((product, index) => (
              <li key={index}>
                {product.product} - R$ {parseFloat(product.price).toFixed(2)}
              </li>
            ))}
          </ul>
          <p>Total: {formattedTotal}</p>
        </div>
      ) : (
        <p>O carrinho está vazio</p>
      )}
      <button onClick={onFinalizePurchase}>Finalizar Compra</button>
    </div>
  );
};

export default Cart;
