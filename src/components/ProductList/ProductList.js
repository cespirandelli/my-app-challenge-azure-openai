import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import PropTypes from "prop-types";

const ProductList = ({ products, onAddToCart }) => {
  if (!products || products.length === 0) {
    return (
      <div role="alert" aria-live="assertive">
        <p>Nenhum produto disponível no momento.</p>
      </div>
    );
  }

  return (
    <div
      className="product-list-container"
      role="list"
      aria-label="Lista de Produtos Disponíveis"
    >
      {products.map((product) => (
        <ProductCard
          key={product.productId}
          product={product}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      product: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      store: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
      distance: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductList;
