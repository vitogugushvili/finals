import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import "./CheckoutLayout.css"; 

const CheckoutLayout = ({ children }) => {
  const { cart, currency, getCartTotal, shippingMethod, getGrandTotal } =
    useContext(ShopContext);
  const location = useLocation();

  const getStep = () => {
    switch (location.pathname) {
      case "/checkout/shipping":
        return 1;
      case "/checkout/shipping-method":
        return 2;
      case "/checkout/payment":
        return 3;
      default:
        return 0;
    }
  };
  const step = getStep();

  return (
    <div className="checkout-page">
      <div className="checkout-breadcrumbs">
        <Link to="/cart">Cart</Link>
        <span> - </span>
        <span className={step >= 1 ? "active" : ""}>Details</span>
        <span> - </span>
        <span className={step >= 2 ? "active" : ""}>Shipping</span>
        <span> - </span>
        <span className={step >= 3 ? "active" : ""}>Payment</span>
      </div>
      <div className="checkout-main-content">
        <div className="checkout-form-section">{children}</div>
        <aside className="checkout-summary-section">
          <h4>Order Summary</h4>
          <div className="checkout-summary-items">
            {cart.map((item, index) => {
              const price = item.prices.find(
                (p) => p.currency.label === currency.label
              );
              const displayPrice = price
                ? `${price.currency.symbol}${price.amount.toFixed(2)}`
                : "N/A";
              return (
                <div key={index} className="checkout-summary-item">
                  <img src={item.gallery[0]} alt={item.name} />
                  <div className="checkout-item-info">
                    <span>
                      {item.brand} {item.name}
                    </span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <span className="checkout-item-price">{displayPrice}</span>
                </div>
              );
            })}
          </div>
          <div className="checkout-summary-total">
            <span>Subtotal</span>
            <span>
              {currency.symbol}
              {getCartTotal()}
            </span>
          </div>
          <div className="checkout-summary-total">
            <span>Shipping</span>
            <span>
              {shippingMethod.cost > 0
                ? `${currency.symbol}${shippingMethod.cost.toFixed(2)}`
                : "Free"}
            </span>
          </div>
          <div className="checkout-summary-total checkout-grand-total">
            <span>Total</span>
            <span>
              {currency.symbol}
              {getGrandTotal()}
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutLayout;
