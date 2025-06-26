import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import "./CartOverlay.css"; 

const CartOverlay = () => {
  const {
    cart,
    currency,
    updateCartQuantity,
    getCartTotal,
    getCartItemCount,
    isCartOpen,
    setIsCartOpen,
  } = useContext(ShopContext);
  const navigate = useNavigate();

  const overlayClassName = `cart-overlay ${
    isCartOpen ? "cart-overlay-open" : ""
  }`;

  const handleViewBag = () => {
    setIsCartOpen(false);
    navigate("/cart");
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout/shipping");
  };

  return (
    <div className={overlayClassName}>
      <h2 className="cart-overlay-title">
        My Bag,{" "}
        <span className="cart-overlay-item-count">
          {getCartItemCount()} items
        </span>
      </h2>

      {cart.length === 0 ? (
        <p className="cart-overlay-empty-message">
          Your shopping bag is empty.
        </p>
      ) : (
        <div className="cart-overlay-item-list">
          {cart.map((item, index) => {
            const priceInfo = item.prices.find(
              (p) => p.currency.label === currency.label
            );
            const displayPrice = priceInfo
              ? `${priceInfo.currency.symbol}${priceInfo.amount.toFixed(2)}`
              : "N/A";
            const sizeAttribute = item.attributes.find(
              (attr) => attr.id === "Size"
            );
            return (
              <div
                key={`${item.id}-${item.selectedSize}-${index}`}
                className="cart-overlay-item"
              >
                <div className="cart-overlay-item-details">
                  <div>
                    <p className="cart-overlay-brand-name">{item.brand}</p>
                    <p className="cart-overlay-product-name">{item.name}</p>
                  </div>
                  <p className="cart-overlay-item-price">{displayPrice}</p>
                  {sizeAttribute && (
                    <div className="cart-overlay-attribute-container">
                      <span className="cart-overlay-attribute-title">
                        {sizeAttribute.name}:
                      </span>
                      <div className="cart-overlay-size-box">
                        {item.selectedSize}
                      </div>
                    </div>
                  )}
                </div>
                <div className="cart-overlay-quantity-controls">
                  <button
                    onClick={() =>
                      updateCartQuantity(item.id, item.selectedSize, 1)
                    }
                  >
                    +
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateCartQuantity(item.id, item.selectedSize, -1)
                    }
                  >
                    -
                  </button>
                </div>
                <div className="cart-overlay-item-image">
                  <img src={item.gallery[0]} alt={item.name} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="cart-overlay-footer">
        <div className="cart-overlay-total">
          <span>Total</span>
          <span>
            {currency.symbol}
            {getCartTotal()}
          </span>
        </div>
        <div className="cart-overlay-actions">
          <button
            onClick={handleViewBag}
            className="cart-overlay-view-bag-button"
          >
            View Bag
          </button>
          <button
            onClick={handleCheckout}
            className="cart-overlay-checkout-button"
            disabled={cart.length === 0}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;
