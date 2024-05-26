import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newOrders: 0,
};

export const newOrderSlice = createSlice({
  name: "newOrder",
  initialState,
  reducers: {
    setNewOrderNumbers: (state, action) => {
      state.newOrders = action.payload;
    },
    incrementNewOrderNumbers: (state) => {
      state.newOrders++;
    },
    decrementNewOrderNumbers: (state) => {
      state.newOrders--;
    },
  },
});

export const { setNewOrderNumbers, incrementNewOrderNumbers, decrementNewOrderNumbers } =
  newOrderSlice.actions;

export default newOrderSlice.reducer;
