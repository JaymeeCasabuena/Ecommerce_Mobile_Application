import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSingleProduct } from "../services/ProductService";

const initialState = {
  cart: [],
  totalAmount: 0,
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    increment: (state) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrement: (state) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removeItem;
    },
  },
});

export const { addToCart, increment, decrement, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
