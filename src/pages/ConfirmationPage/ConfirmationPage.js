import React from "react";
import { Link } from "react-router-dom";
import "./ConfirmationPage.css"; 

const ConfirmationPage = () => {
  const orderNumber = Math.floor(Math.random() * 10000) + 2000;

  return (
    <div className="confirmation-page">
      <div className="confirmation-icon-container">
        <div className="confirmation-icon">✓</div>
      </div>
      <h2 className="confirmation-title">Payment Confirmed</h2>
      <p className="confirmation-order-number">ORDER #{orderNumber}</p>
      <p className="confirmation-thank-you">Thank you for your purchase!</p>
      <Link to="/" className="confirmation-back-button">
        Back to Shopping
      </Link>
    </div>
  );
};

export default ConfirmationPage;
