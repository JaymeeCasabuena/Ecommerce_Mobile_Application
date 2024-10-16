import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/CartSlice";
import productReducer from "../redux/ProductSlice";
import previewProductsReducer from "../redux/PreviewSlice";
import addressReducer from "./AddressSlice";
import authenticationReducer from "./AuthenticationSlice";
import newOrderReducer from "./NewOrderSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer,
        previewProducts: previewProductsReducer,
        address: addressReducer,
        authentication: authenticationReducer,
        newOrder: newOrderReducer,
    }
})