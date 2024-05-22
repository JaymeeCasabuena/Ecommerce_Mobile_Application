import { createSlice } from "@reduxjs/toolkit";

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
      state.totalAmount = state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.totalItems++;
    },
    increment: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
      state.totalItems++;
      state.totalAmount += item.price;
    },
    decrement: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        item.quantity--;
        state.totalItems--;
        state.totalAmount -= item.price;
        if (item.quantity === 0) {
          state.cart = state.cart.filter((item) => item.id !== action.payload);
        }
      }
    },
    removeItem: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
        state.totalItems -= item.quantity;
        state.totalAmount = state.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },
    cleanCart: (state) => {
      state.cart = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
  },
});

export const { addToCart, increment, decrement, removeItem, cleanCart } =
  cartSlice.actions;

export default cartSlice.reducer;
