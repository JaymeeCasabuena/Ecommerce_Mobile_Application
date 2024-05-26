import { Alert } from "react-native";

const urls = [
  "https://fakestoreapi.com/products/category/jewelery?limit=4",
  "https://fakestoreapi.com/products/category/electronics?limit=4",
  "https://fakestoreapi.com/products/category/men's%20clothing?limit=4",
  "https://fakestoreapi.com/products/category/women's%20clothing?limit=4",
];

let cache = {};

export const fetchPreviewProducts = async () => {
  const cacheKey = "previewProducts";

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    const requests = urls.map((url) => fetch(url));
    const responses = await Promise.all(requests);
    const data = await Promise.all(
      responses.map((response) => response.json())
    );
    const combinedData = data.reduce(
      (accumulator, currentValue) => accumulator.concat(currentValue),
      []
    );

    cache[cacheKey] = combinedData;

    return combinedData;
  } catch (e) {
    console.error("error fetching preview products", e);
    Alert.alert("ERROR", e?.message ?? "unknown error"), [{ text: "OK" }];
  }
};
