import { useState, useEffect } from "react";
import { Alert } from "react-native";
const url = "https://fakestoreapi.com/products/category";

export default function getProductsByCategory(category) {
  const [productsByCategory, getProductsByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchProductsByCategory = async () => {
      setTimeout(async () => {
        try {
          const encodedCategory = encodeURIComponent(category);
          const str = await fetch(`${url}/${encodedCategory}`);
          const data = await str.json();
          setIsLoading(false);
          getProductsByCategory(data);
        } catch (e) {
          console.error("error fetching products", e);
          Alert.alert("ERROR", e?.message ?? "unknown error"), [{ text: "OK" }];
          setIsLoading(false);
        }
      }, 2000)
    };
    fetchProductsByCategory();

    return () => {
      isMounted = false;
      setIsLoading(true);
    };
  }, [category]);
  return { isLoading, productsByCategory };
}
