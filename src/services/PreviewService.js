import { useState, useEffect } from "react";
import { Alert } from "react-native";
const urls = ["https://fakestoreapi.com/products/category/jewelery?limit=4", 
"https://fakestoreapi.com/products/category/electronics?limit=4", 
"https://fakestoreapi.com/products/category/men's%20clothing?limit=4", 
"https://fakestoreapi.com/products/category/women's%20clothing?limit=4"];

export default function getPreviewProducts() {
  const [previewProducts, setPreviewProducts] = useState([]);

  useEffect(() => {
    const fetchPreviewProducts = async () => {
      try {
        let requests = urls.map(url => fetch(url))
        const responses = await Promise.all(requests);
        const data = await Promise.all(responses.map(response => response.json()));
        const combinedData = data.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
        setPreviewProducts(combinedData);
      } catch (e) {
        console.error("error fetching preview products", e);
        Alert.alert("ERROR", e?.message ?? "unknown error"), [{ text: "OK" }];
      }
    };
    fetchPreviewProducts();
  }, []);

  return previewProducts;
}
