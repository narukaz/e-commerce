import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: {},
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "shop/fetchAllFilteredProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    axios.defaults.withCredentials = true;
    const { data } = await axios.get(`http://localhost:3000/shop/products/get?${query}`);
    return data;
  }
);

export const fetchProductById = createAsyncThunk(
  "shop/fetchProductById",
  async (id) => {
    axios.defaults.withCredentials = true;
    const { data } = await axios.get(`http://localhost:3000/shop/products/get/${id}`);
    return data;
  }
);

const shopProductSlice = createSlice({
  name: "shopProduct",
  initialState,
  reducers: {
    setProductDetails:(state)=>{
      state.productDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, { payload }) => {
        state.productList = payload?.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, { payload }) => {
        state.productDetails = payload?.data;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = {};
      });
  },
});
export const {setProductDetails} =   shopProductSlice.actions
export default shopProductSlice.reducer;
