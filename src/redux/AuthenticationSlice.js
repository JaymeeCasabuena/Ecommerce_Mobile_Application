import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: '',
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUserID: (state, action) => {
        state.userId = action.payload;
      },
  },
});

export const { setUserID } =
authenticationSlice.actions;

export default authenticationSlice.reducer;