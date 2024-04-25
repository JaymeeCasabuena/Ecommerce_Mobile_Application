import { useState, useEffect } from "react";
import { Alert } from "react-native";
const url = "https://fakestoreapi.com/products/category/electronics";

export default function getAllProducts() {
  const [products, getProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const str = await fetch(url);
        const data = await str.json();
        getProducts(data);
      } catch (e) {
        console.error("error fetching products", e);
        Alert.alert("ERROR", e?.message ?? "unknown error"), [{ text: "OK" }];
      }
    };
    fetchProducts();
  }, []);
  return products;
}
