import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ProductListingPage from "./pages/ProductListingPage/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import CartPage from "./pages/CartPage/CartPage";
import ShippingInfoPage from "./pages/Checkout/ShippingInfoPage";
import ShippingMethodPage from "./pages/Checkout/ShippingMethodPage";
import PaymentPage from "./pages/Checkout/PaymentPage";
import ConfirmationPage from "./pages/ConfirmationPage/ConfirmationPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/category/women" replace />} />
        <Route
          path="/category/:categoryName"
          element={<ProductListingPage />}
        />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout/shipping" element={<ShippingInfoPage />} />
        <Route
          path="/checkout/shipping-method"
          element={<ShippingMethodPage />}
        />
        <Route path="/checkout/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
