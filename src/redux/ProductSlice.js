import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsByCategory } from "../services/ProductService";

const initialState = {
  productData: {},
  loading: false,
  error: null,
};

export const loadProductData = createAsyncThunk(
  "loadProduct",
  async (category, thunkAPI) => {
    if (!category)
      return thunkAPI.rejectWithValue("Category can't be empty.");
    try {
      const ret = await fetchProductsByCategory(category);
      return ret;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.productData = action.payload;
      })
      .addCase(loadProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.productData = {};
      });
  },
});
export const selectCategory = (state) => state.products;
export default productSlice.reducer;