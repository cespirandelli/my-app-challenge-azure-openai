import React from "react";
import "./ProductCard.css";
// import PropTypes from "prop-types";

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <h3>{product.product}</h3>
      <p>{product.description}</p>
      <p>Loja: {product.store}</p>
      <p>Preço: R$ {parseFloat(product.price).toFixed(2)}</p>
      <p>Distância: {product.distance}</p>
      <a href={product.link} target="_blank" rel="noopener noreferrer">
        Ver Produto
      </a>
      <button onClick={() => onAddToCart(product)}>
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

// ProductCard.propTypes = {
//   product: PropTypes.shape({
//     Codigo: PropTypes.string.isRequired,
//     Product: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     Store: PropTypes.string.isRequired,
//     Price: PropTypes.number.isRequired,
//     Link: PropTypes.string.isRequired,
//     Distance: PropTypes.string.isRequired,
//     productId: PropTypes.string.isRequired,
//   }).isRequired,
//   onAddToCart: PropTypes.func.isRequired,
// };

export default ProductCard;