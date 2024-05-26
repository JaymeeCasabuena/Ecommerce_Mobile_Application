import { Alert } from "react-native";
const baseUrl = "https://fakestoreapi.com/";

const cachedResponses = {};

export const fetchProductsByCategory = async (category) => {
  try {
    const encodedCategory = encodeURIComponent(category);

    if (cachedResponses[encodedCategory]) {
      return cachedResponses[encodedCategory];
    }

    const response = await fetch(`${baseUrl}products/category/${encodedCategory}`);
    const data = await response.json();

 
    cachedResponses[encodedCategory] = data;

    return data;
  } catch (e) {
    console.error("Error fetching products", e);
    Alert.alert("ERROR", e?.message ?? "Unknown error"), [{ text: "OK" }];
  }
};

export const fetchSingleProduct = async (id) => {
  try {
    if (cachedResponses[id]) {
      return cachedResponses[id];
    }

    const response = await fetch(`${baseUrl}products/${id}`);
    const data = await response.json();

    cachedResponses[id] = data;

    return data;
  } catch (e) {
    console.error("Error fetching product", e);
    Alert.alert("ERROR", e?.message ?? "Unknown error"), [{ text: "OK" }];
  }
};
