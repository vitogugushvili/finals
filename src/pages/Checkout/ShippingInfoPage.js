import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import CheckoutLayout from "./CheckoutLayout";
import "./ShippingInfoPage.css"; 

const ShippingInfoPage = () => {
  const { setShippingInfo } = useContext(ShopContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    zip: "",
    country: "USA",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (!formData[key]) {
        setError(
          `Please fill out the ${key
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} field.`
        );
        return;
      }
    }
    setError("");
    setShippingInfo(formData);
    navigate("/checkout/shipping-method");
  };

  return (
    <CheckoutLayout>
      <div className="shipping-info-page">
        <h4>Contact Information</h4>
        <form onSubmit={handleSubmit} className="shipping-form">
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email or mobile phone number"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <h4>Shipping Address</h4>
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="zip"
                placeholder="Postal Code"
                value={formData.zip}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="USA">United States</option>
              <option value="Canada">Canada</option>
              <option value="Mexico">Mexico</option>
            </select>
          </div>
          {error && <p className="form-error">{error}</p>}
          <div className="form-actions">
            <button type="submit" className="form-continue-button">
              Go to shipping
            </button>
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="form-back-button"
            >
              Back to cart
            </button>
          </div>
        </form>
      </div>
    </CheckoutLayout>
  );
};

export default ShippingInfoPage;
