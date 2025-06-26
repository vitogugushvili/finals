import { products } from "../data/products.js";
export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 200);
  });
};

export const fetchCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["women", "men", "kids"]);
    }, 100);
  });
};
