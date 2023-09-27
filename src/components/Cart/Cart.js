import React from "react";

const Cart = ({ cart }) => (
  <div className="cart">
    <h2>Carrinho</h2>
    {cart.length === 0 ? (
      <p>O carrinho está vazio</p>
    ) : (
      <ul>
        {cart.map((product, index) => (
          <li key={index}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Cart;
