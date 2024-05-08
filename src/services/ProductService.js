import { Alert } from "react-native";
const baseUrl = "https://fakestoreapi.com/";

export const fetchProductsByCategory = async (category) => {
      try {
        const encodedCategory = encodeURIComponent(category);
        const str = await fetch(`${baseUrl}products/category/${encodedCategory}`);
        const data = await str.json();
        return data;
      } catch (e) {
        console.error("error fetching products", e);
        Alert.alert("ERROR", e?.message ?? "unknown error"), [{ text: "OK" }];
      }
};

export const fetchSingleProduct = async (id) => {
  try {
    const str = await fetch(`${baseUrl}products/${id}`);
    const data = await str.json();
    return data;
  } catch (e) {
    console.error("error fetching product", e);
    Alert.alert("ERROR", e?.message ?? "unknown error"), [{ text: "OK" }];
  }
};
