import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import "./ProductDetailPage.css"; 

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, loading } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (!loading && products.length > 0) {
      const foundProduct = products.find((p) => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setMainImage(foundProduct.gallery[0]);
        if (foundProduct.attributes[0]?.items[0]) {
          setSelectedSize(foundProduct.attributes[0].items[0].value);
        }
      }
    }
  }, [productId, products, loading]);

  if (loading || !product) {
    return <p className="pdp-message">Loading product...</p>;
  }

  const price = product.prices.find((p) => p.currency.label === currency.label);
  const sizeAttribute = product.attributes.find((attr) => attr.id === "Size");

  const handleAddToCart = () => {
    if (product.inStock) {
      addToCart(product, selectedSize);
    }
  };

  return (
    <div className="pdp-page-container">
      <div className="pdp">
        <div className="pdp-thumbnails">
          {product.gallery.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} thumbnail`}
              onClick={() => setMainImage(img)}
              className={mainImage === img ? "pdp-thumbnail-active" : ""}
            />
          ))}
        </div>
        <div className="pdp-main-image">
          <img src={mainImage} alt={product.name} />
        </div>
        <div className="pdp-details">
          <h1 className="pdp-brand-name">{product.brand}</h1>
          <h2 className="pdp-product-name">{product.name}</h2>
          {sizeAttribute && (
            <div className="pdp-size-section">
              <h4 className="pdp-section-title">{sizeAttribute.name}:</h4>
              <div className="pdp-size-options">
                {sizeAttribute.items.map((item) => (
                  <button
                    key={item.id}
                    className={`pdp-size-button ${
                      selectedSize === item.value ? "pdp-size-selected" : ""
                    }`}
                    onClick={() => setSelectedSize(item.value)}
                  >
                    {item.value}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="pdp-price-section">
            <h4 className="pdp-section-title">PRICE:</h4>
            <p className="pdp-price-amount">
              {price.currency.symbol}
              {price.amount.toFixed(2)}
            </p>
          </div>
          <button
            className="pdp-add-to-cart-button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
          </button>
          <p className="pdp-description">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
