import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultAddress: {},
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setDefaultAddress: (state, action) => {
      state.defaultAddress = action.payload
    },
  },
});

export const { setDefaultAddress } =
  addressSlice.actions;

export default addressSlice.reducer;