import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPreviewProducts } from "../services/PreviewService";

const initialState = {
  previewProducts: [],
  loading: false,
  error: null,
};

export const loadPreviewProducts = createAsyncThunk(
  "loadPreviewProducts",
  async (thunkAPI) => {
    try {
      const ret = await fetchPreviewProducts();
      return ret;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const previewProductSlice = createSlice({
  name: "previewProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPreviewProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadPreviewProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.previewProducts = action.payload;
      })
      .addCase(loadPreviewProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.previewProducts = [];
      });
  },
});
export const selectPreviewProducts = (state) => state.previewProducts;
export default previewProductSlice.reducer;