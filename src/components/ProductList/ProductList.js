// ProductList.js
import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import PropTypes from "prop-types";

const ProductList = ({ products, onAddToCart }) => {
  if (!products || products.length === 0) {
    return null;
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
      "@search.score": PropTypes.number.isRequired,
      Codigo: PropTypes.string.isRequired,
      Product: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Store: PropTypes.string.isRequired,
      Price: PropTypes.string.isRequired,
      Link: PropTypes.number.isRequired,
      Address: PropTypes.string.isRequired,
      Distance: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductList;
