import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import "./CartPage.css"; 

const CartPage = () => {
  const { cart, currency, updateCartQuantity, getCartTotal, getCartItemCount } =
    useContext(ShopContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="cart-page-title">CART</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-page-title">CART</h1>
      <div className="cart-page-items">
        {cart.map((item, index) => {
          const price = item.prices.find(
            (p) => p.currency.label === currency.label
          );
          const sizeAttribute = item.attributes.find(
            (attr) => attr.id === "Size"
          );
          return (
            <div
              key={`${item.id}-${item.selectedSize}-${index}`}
              className="cart-page-item"
            >
              <div className="cart-page-item-details">
                <h2 className="cart-page-brand-name">{item.brand}</h2>
                <h3 className="cart-page-item-name">{item.name}</h3>
                <p className="cart-page-item-price">
                  {price.currency.symbol}
                  {price.amount.toFixed(2)}
                </p>
                {sizeAttribute && (
                  <div>
                    <p className="cart-page-attribute-title">
                      {sizeAttribute.name}:
                    </p>
                    <div className="cart-page-size-options">
                      {sizeAttribute.items.map((s) => (
                        <button
                          key={s.id}
                          className={`cart-page-size-button ${
                            item.selectedSize === s.value
                              ? "cart-page-size-selected"
                              : ""
                          }`}
                        >
                          {s.value}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="cart-page-quantity-and-image">
                <div className="cart-page-quantity-controls">
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
                <img
                  src={item.gallery[0]}
                  alt={item.name}
                  className="cart-page-item-image"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart-page-summary">
        <div className="cart-page-summary-row">
          <span className="cart-page-summary-label">Quantity:</span>
          <span className="cart-page-summary-value">{getCartItemCount()}</span>
        </div>
        <div className="cart-page-summary-row">
          <span className="cart-page-summary-label">Total:</span>
          <span className="cart-page-summary-value">
            {currency.symbol}
            {getCartTotal()}
          </span>
        </div>
        <button
          onClick={() => navigate("/checkout/shipping")}
          className="cart-page-order-button"
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
