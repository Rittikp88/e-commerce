import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userService from "../Auth/user.service";
import { setMessage } from "./message";


interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const response = await userService.getAllProducts();
        const data = await response.product;
        console.log(data)
    return data;
  }catch (error: any) {
    console.log(error);
    throw error;
  }});
export const getAdminProduct = createAsyncThunk('products/AdminProducts', async () => {
    try {
        const response = await userService.getAdminProducts();
        const data = await response;
        console.log(data)
    return data;
  }catch (error: any) {
    console.log(error);
    throw error;
  }});

  export const createProduct = createAsyncThunk<any, User>(
    "auth/createProduct",
    async ({ name, email, password, confirmPassword }, thunkAPI) => {
      try {
        const response = await userService.createProduct();
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue({ errorMessage: message });
      }
    }
  );
  

  const productSlice = createSlice({
    name: 'products',
    initialState: { products: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(createProduct.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createProduct.rejected, (state) => {
        state.status = 'failed';
      })
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
        })
        .addCase(getAdminProduct.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getAdminProduct.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload;
        })
        .addCase(getAdminProduct.rejected, (state, action) => {
          state.status = 'failed';
        //   state.error = action.error.message || null; // Ensure it's either a string or null;
        });
    },
  });
  
  export default productSlice.reducer;