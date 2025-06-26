import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import cartIcon from "../../assets/cart-icon.svg";

const Navbar = () => {
  const [categories, setCategories] = useState(["women", "men", "kids"]);
  const [isCurrencySwitcherOpen, setCurrencySwitcherOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    currency,
    changeCurrency,
    getCartItemCount,
    setIsCartOpen,
    isCartOpen,
  } = useContext(ShopContext);

  const handleCurrencyChange = (newCurrency) => {
    changeCurrency(newCurrency);
    setCurrencySwitcherOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const closeMenu = () => {
      if (window.innerWidth > 992) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  return (
    <header className="navbar">
      <nav className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        {categories.map((cat) => (
          <NavLink
            key={cat}
            to={`/category/${cat}`}
            className={({ isActive }) =>
              isActive ? "navbar-link navbar-link-active" : "navbar-link"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            {cat.toUpperCase()}
          </NavLink>
        ))}
      </nav>
      <div className="navbar-logo-container">
        <Link to="/">
          <img src={logo} alt="Shop Logo" />
        </Link>
      </div>
      <div className="navbar-actions">
        <div className="navbar-currency-switcher">
          <button
            onClick={() => setCurrencySwitcherOpen(!isCurrencySwitcherOpen)}
            className="navbar-currency-button"
          >
            {currency.symbol}
          </button>
          {isCurrencySwitcherOpen && (
            <ul className="navbar-currency-dropdown">
              <li onClick={() => handleCurrencyChange("USD")}>$ USD</li>
              <li onClick={() => handleCurrencyChange("EUR")}>€ EUR</li>
              <li onClick={() => handleCurrencyChange("JPY")}>¥ JPY</li>
            </ul>
          )}
        </div>
        <div
          className="navbar-cart-container"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <img src={cartIcon} alt="Cart" />
          {getCartItemCount() > 0 && (
            <span className="navbar-cart-badge">{getCartItemCount()}</span>
          )}
        </div>
      </div>
      <div className="navbar-hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
};

export default Navbar;
