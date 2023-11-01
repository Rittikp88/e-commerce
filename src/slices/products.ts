import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userService from "../Auth/user.service";
import { setMessage } from "./message";


interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface Product {
  name: string;
  price: number;
  category: string;
  stock: string;
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

  export const createProduct = createAsyncThunk<any, Product>(
    "auth/createProduct",
    async ({ name, price, category, stock }, thunkAPI) => {
      try {
        const response = await userService.createProduct({ name, price, category, stock });
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


  export const deleteProduct = createAsyncThunk<any, string>(
    "products/deleteProduct",
    async (productId, thunkAPI) => {
      try {
        const response = await userService.getProductDetails(productId);
        const data = await response;
        console.log(data)
    return data;
      } catch (error: any) {
        console.log(error)
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


  export const getProductDetails = createAsyncThunk<any, string>(
    "products/getProductDetails",
    async (productId, thunkAPI) => {
      try {
        console.log("dedo",productId)
        const response = await userService.deleteProduct(productId);
        thunkAPI.dispatch(setMessage(response.data.message));
        return response;
      } catch (error: any) {
        console.log(error)
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

  export const updateProduct = createAsyncThunk<any, Product>(
    "auth/createProduct",
    async ({ name, price, category, stock }, thunkAPI) => {
      try {
        const response = await userService.createProduct({ name, price, category, stock });
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
      .addCase(deleteProduct.fulfilled, (state) => {
        state.status = 'deleted';
      })
      .addCase(deleteProduct.rejected, (state) => {
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
        })
        .addCase(getProductDetails.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getProductDetails.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload;
        })
        .addCase(getProductDetails.rejected, (state, action) => {
          state.status = 'failed';
        //   state.error = action.error.message || null; // Ensure it's either a string or null;
        });
    },
  });
  
  export default productSlice.reducer;