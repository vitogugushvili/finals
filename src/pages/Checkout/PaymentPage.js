import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import CheckoutLayout from "./CheckoutLayout";
import "./PaymentPage.css"; 

const PaymentPage = () => {
  const { shippingMethod, clearCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!shippingMethod) {
    return <Navigate to="/checkout/shipping-method" />;
  }

  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !cardDetails.number ||
      !cardDetails.name ||
      !cardDetails.expiry ||
      !cardDetails.cvv
    ) {
      alert("Please fill in all card details.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      navigate("/confirmation");
    }, 1500);
  };

  return (
    <CheckoutLayout>
      <div className="payment-page">
        <h4>Payment Method</h4>
        <div className="payment-form-container">
          <div className="payment-form-header">Credit Card</div>
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group">
              <input
                type="text"
                name="number"
                placeholder="Card Number"
                value={cardDetails.number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Holder Name"
                value={cardDetails.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="expiry"
                  placeholder="Expiration (MM/YY)"
                  value={cardDetails.expiry}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-actions">
              <button
                type="submit"
                className="form-pay-button"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Pay Now"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/checkout/shipping-method")}
                className="form-back-button"
              >
                Back to shipping
              </button>
            </div>
          </form>
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default PaymentPage;
