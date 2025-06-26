import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductListingPage.css"; 

const ProductListingPage = () => {
  const { categoryName } = useParams();
  const { products, loading, error } = useContext(ShopContext);

  const filteredProducts = products.filter((p) => p.category === categoryName);

  if (loading) return <p className="pdp-message">Loading products...</p>;
  if (error)
    return <p className="pdp-message">Error: Could not fetch products.</p>;

  return (
    <div className="plp-page">
      <h1 className="plp-category-title">{categoryName}</h1>
      <div className="plp-product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;
