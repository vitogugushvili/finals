import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import "./ProductCard.css"; 
import cartIconGreen from "../../assets/cart-icon-green.svg";

const ProductCard = ({ product }) => {
  const { currency, addToCart } = useContext(ShopContext);
  const price = product.prices.find((p) => p.currency.label === currency.label);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.attributes[0].items[0].value;
    addToCart(product, defaultSize);
  };

  const cardClassName = `product-card ${
    !product.inStock ? "product-card-out-of-stock" : ""
  }`;

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className={cardClassName}>
        <div className="product-card-image-container">
          <img
            src={product.gallery[0]}
            alt={product.name}
            className="product-card-image"
          />
          {!product.inStock && (
            <div className="product-card-stock-overlay">
              <span>OUT OF STOCK</span>
            </div>
          )}
          {product.inStock && (
            <button
              className="product-card-add-button"
              onClick={handleAddToCart}
            >
              <img src={cartIconGreen} alt="Add to cart" />
            </button>
          )}
        </div>
        <div className="product-card-info">
          <p className="product-card-name">
            {product.brand} {product.name}
          </p>
          <p className="product-card-price">
            {price.currency.symbol}
            {price.amount.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
