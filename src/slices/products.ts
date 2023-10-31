import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userService from "../Auth/user.service";


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const response = await userService.getAllProducts();
        const data = await response.product;
        console.log(data)
    return data;
  }catch (error: any) {
    console.log(error);
  }});

  const productSlice = createSlice({
    name: 'products',
    initialState: { products: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.status = 'failed';
        //   state.error = action.error.message || null; // Ensure it's either a string or null;
        });
    },
  });
  
  export default productSlice.reducer;