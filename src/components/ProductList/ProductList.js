// ProductList.js
import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import PropTypes from "prop-types";

const ProductList = ({ products, onAddToCart }) => {
  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="product-list-container">
      {products.map((product) => (
        <ProductCard
          key={product.Codigo}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      Codigo: PropTypes.string.isRequired,
      // Adicione verificações para outras propriedades do produto conforme necessário
    })
  ),
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductList;
