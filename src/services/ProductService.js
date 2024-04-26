import { useState, useEffect } from "react";
import { Alert } from "react-native";
const url = "https://fakestoreapi.com/products/category";

export default function getProductsByCategory(category) {
  const [productsByCategory, getProductsByCategory] = useState([])

  useEffect(() => {
    let isMounted = true;
    const fetchProductsByCategory = async () => {
      try {
        const encodedCategory = encodeURIComponent(category);
        const str = await fetch(`${url}/${encodedCategory}`);
        const data = await str.json();
        getProductsByCategory(data);
      } catch (e) {
        console.error("error fetching products", e);
        Alert.alert("ERROR", e?.message ?? "unknown error"), [{ text: "OK" }];
      }
    };
    fetchProductsByCategory();

    return () => {
      isMounted = false;
    };
  }, [category]);
  return productsByCategory;
}
