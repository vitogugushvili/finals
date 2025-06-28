import React, { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import "./ConfirmationPage.css";

const ConfirmationPage = () => {
  const location = useLocation();
  const [orderNumber] = useState(Math.floor(Math.random() * 10000) + 2000);

  if (!location.state?.orderDetails) {
    return <Navigate to="/" />;
  }

  const { cart, currency, shippingMethod, subtotal, total } =
    location.state.orderDetails;

  const shippingCost =
    shippingMethod?.cost > 0 ? shippingMethod.cost.toFixed(2) : "Free";

  return (
    <div className="confirmation-page-container">
      <div className="confirmation-details">
        <div className="confirmation-icon-container">
          <div className="confirmation-icon">✓</div>
        </div>
        <h2 className="confirmation-title">Payment Confirmed</h2>
        <p className="confirmation-order-number">ORDER #{orderNumber}</p>
        <Link to="/" className="confirmation-back-button">
          Back to shopping
        </Link>
      </div>
      <div className="order-summary">
        {cart.map((item) => (
          <div key={item.id} className="summary-item">
            <div className="summary-item-image">
              <img src={item.gallery[0]} alt={item.name} />
              <span className="summary-item-qty">{item.quantity}</span>
            </div>
            <div className="summary-item-details">
              <p>{item.name}</p>
              <p>
                {currency.symbol}
                {
                  item.prices.find((p) => p.currency.label === currency.label)
                    ?.amount
                }
              </p>
            </div>
          </div>
        ))}
        <div className="summary-total">
          <p>
            <span>Subtotal</span>
            <span>
              {currency.symbol}
              {subtotal}
            </span>
          </p>
          <p>
            <span>Shipping</span>
            <span>
              {typeof shippingCost === "string"
                ? shippingCost
                : `${currency.symbol}${shippingCost}`}
            </span>
          </p>
          <p className="paid-total">
            <span>Paid</span>
            <span>
              {currency.symbol}
              {total}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
