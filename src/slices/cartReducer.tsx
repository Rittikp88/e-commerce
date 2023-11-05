import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import userService from "../Auth/user.service";;

interface CartItem {
  product: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  shippingInfo: any; // Replace 'any' with the actual type for shipping info
}

const initialState: CartState = {
  cartItems: [],
  shippingInfo: {},
};

// Define an async thunk for adding items to the cart
export const addItemsToCart = createAsyncThunk<any, { id: string; quantity: number }>(
  'cart/addItemsToCart',
  async ({ id, quantity }) => {
    console.log({ id, quantity })
    try{
      const response = await userService.getProductDetails(id);
      console.log(response);
      const {product} = await response;
    return {
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0].url,
      stock: product.Stock,
      quantity,
    };
  
  }catch (error) {
    throw error
  }
  }
);

export const removeItemsFromCart = createAsyncThunk<void, string>(
  'cart/removeItemsFromCart',
  async (id, { dispatch, getState }) => {
    // You can perform any asynchronous logic here, e.g., calling an API
    try {
      // If you need to perform an API call, do it here

      // Once the item is successfully removed, you can update the cart state
      // const state = getState() as { cart: CartState }; // Cast state to access the cart slice
      // const updatedCartItems = state.cart.cartItems.filter((item) => item.product !== id);
      console.log("romoved")

      dispatch(cartSlice.actions.removeCartItem(id)); // Dispatch the removeCartItem action

      // You can also update the local storage here if needed

      // Handle any additional logic here

    } catch (error) {
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((item) => item.product !== action.payload);
    },
    saveShippingInfo: (state, action: PayloadAction<any>) => {
      state.shippingInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
      })
      .addCase(addItemsToCart.rejected, (state, action) => {
        // Handle the rejected case if needed
      });
  },
});

export const { removeCartItem, saveShippingInfo } = cartSlice.actions;
export default cartSlice.reducer;
