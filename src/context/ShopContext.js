import React, { createContext, useState, useEffect } from "react";
import { fetchProducts } from "../api";

export const ShopContext = createContext(null);

const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to get items fromlocalStorage", error);
    return [];
  }
};

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(getInitialCart);
  const [currency, setCurrency] = useState({ symbol: "$", label: "USD" });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [shippingInfo, setShippingInfo] = useState(null);
  const [shippingMethod, setShippingMethod] = useState({
    name: "Standard",
    cost: 0,
  });

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError(null);
      const productsData = await fetchProducts();
      setProducts(productsData);
      setLoading(false);
    };
    getProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const changeCurrency = (newCurrency) => {
    const symbols = { USD: "$", EUR: "€", JPY: "¥" };
    setCurrency({ label: newCurrency, symbol: symbols[newCurrency] });
  };

  const addToCart = (product, selectedSize) => {
    if (!selectedSize) {
      alert("Please select a size!");
      return;
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      const productToAdd = {
        ...product,
        selectedSize: selectedSize,
        quantity: 1,
      };
      return [...prevCart, productToAdd];
    });
  };

  const updateCartQuantity = (productId, size, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId && item.selectedSize === size
            ? { ...item, quantity: Math.max(0, item.quantity + amount) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getCartTotal = () => {
    return cart
      .reduce((total, item) => {
        if (!Array.isArray(item.prices)) return total;
        const priceInfo = item.prices.find(
          (p) => p.currency.label === currency.label
        );
        if (priceInfo && typeof priceInfo.amount === "number") {
          return total + priceInfo.amount * item.quantity;
        }
        return total;
      }, 0)
      .toFixed(2);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const getGrandTotal = () => {
    const subtotal = parseFloat(getCartTotal());
    const shippingCost = shippingMethod ? shippingMethod.cost : 0;
    return (subtotal + shippingCost).toFixed(2);
  };

  const clearCart = () => {
    setCart([]);
    setShippingMethod({ name: "Standard", cost: 0 });
  };

  const value = {
    products,
    loading,
    error,
    cart,
    currency,
    isCartOpen,
    shippingInfo,
    shippingMethod,
    setIsCartOpen,
    setShippingInfo,
    setShippingMethod,
    changeCurrency,
    addToCart,
    updateCartQuantity,
    getCartItemCount,
    getCartTotal,
    getGrandTotal,
    clearCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
