import { useState, useEffect } from "react";
import { Alert } from "react-native";
const url = "https://fakestoreapi.com/products/categories";

export default function getCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const str = await fetch(url);
        const data = await str.json();
        setCategories(data);
      } catch (e) {
        console.error("error fetching categories", e);
        Alert.alert("ERROR", e?.message ?? "unknown error"), [{ text: "OK" }];
      }
    };
    fetchCategories();
  }, []);

  return categories;
}
