import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import CheckoutLayout from "./CheckoutLayout";
import "./ShippingMethodPage.css"; 

const ShippingMethodPage = () => {
  const { shippingInfo, setShippingMethod, shippingMethod } =
    useContext(ShopContext);
  const navigate = useNavigate();
  const [selectedMethodName, setSelectedMethodName] = useState(
    shippingMethod.name
  );

  const shippingOptions = [
    { name: "Standard", cost: 0, label: "Free" },
    { name: "Express", cost: 4.99, label: "$4.99" },
  ];

  if (!shippingInfo) {
    return <Navigate to="/checkout/shipping" />;
  }

  const handleSelectMethod = (option) => {
    setSelectedMethodName(option.name);
    setShippingMethod({ name: option.name, cost: option.cost });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMethodName) {
      alert("Please select a shipping method.");
      return;
    }
    navigate("/checkout/payment");
  };

  return (
    <CheckoutLayout>
      <div className="shipping-method-page">
        <div className="shipping-info-box">
          <div className="shipping-info-row">
            <span>Contact</span>
            <span>{shippingInfo.email}</span>
          </div>
          <div className="shipping-info-row">
            <span>Ship to</span>
            <span>{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zip}`}</span>
          </div>
        </div>
        <h4>Shipping Method</h4>
        <form onSubmit={handleSubmit} className="shipping-method-form">
          {shippingOptions.map((option) => (
            <div
              key={option.name}
              className={`shipping-method-option ${
                selectedMethodName === option.name ? "selected" : ""
              }`}
              onClick={() => handleSelectMethod(option)}
            >
              <input
                type="radio"
                name="shippingMethod"
                value={option.name}
                checked={selectedMethodName === option.name}
                readOnly
              />
              <span>{option.name} Shipping</span>
              <span className="shipping-method-price">{option.label}</span>
            </div>
          ))}
          <div className="form-actions">
            <button type="submit" className="form-continue-button">
              Go to payment
            </button>
            <button
              type="button"
              onClick={() => navigate("/checkout/shipping")}
              className="form-back-button"
            >
              Back to details
            </button>
          </div>
        </form>
      </div>
    </CheckoutLayout>
  );
};

export default ShippingMethodPage;
