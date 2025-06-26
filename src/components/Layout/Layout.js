import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import CartOverlay from "../CartOverlay/CartOverlay";
import { ShopContext } from "../../context/ShopContext";
import styles from "./Layout.css";

const Layout = ({ children }) => {
  const { isCartOpen, setIsCartOpen } = useContext(ShopContext);

  return (
    <div className={styles.layout}>
      <Navbar />
      <main>{children}</main>
      {isCartOpen && (
        <div
          className={styles.overlayBackdrop}
          onClick={() => setIsCartOpen(false)}
        />
      )}
      <CartOverlay />
    </div>
  );
};

export default Layout;
