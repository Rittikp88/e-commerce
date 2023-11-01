import { createSlice, createAsyncThunk, PayloadAction, isRejectedWithValue } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import axios from "axios";

import AuthService from "../Auth/auth.service";

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface lUser {
  password: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: lUser | null;
}

// const user = JSON.parse(localStorage.getItem("user")) as User | null;

const userString = localStorage.getItem("user");
const user = userString ? (JSON.parse(userString) as User) : null;

export const register = createAsyncThunk<any, User>(
  "auth/register",
  async ({ name, email, password, confirmPassword }, thunkAPI) => {
    try {
      const response = await AuthService.register({
        name,
        email,
        password,
        confirmPassword,
      });
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

export const login = createAsyncThunk<{ user: lUser }, lUser>(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login({
        email,
        password,
      });
      return { user: data };
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

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (thunkAPI) => {
    // Define a type for the data you expect to retrieve from localStorage
    interface UserData {
      token: string;
      // Add other properties you expect to retrieve
    }


    try {

    // Retrieve the user data from localStorage
    const userString = localStorage.getItem('user');
    const user: UserData | null = userString ? JSON.parse(userString) : null;

    
    
      
      console.log("function called");
      // if (user) {
        // console.log("user", user.token)

        const { data } = await axios.get('http://localhost:8000/api/v1/users/me', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("loaduser", data.user);
        return { user: data };
      // }
    } catch (error: any) {
      
      // Handle the error as needed
      throw error; 
    }
  }
);

// function add<T, Y>(a: T, b: Y) {
//   return undefined;
// }

// add<number, number>("sdsd", 2);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState: AuthState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      // .addCase(logout.fulfilled, (state) => {
      //   state.isLoggedIn = false;
      //   state.user = null;
      // })
      .addCase(loadUser.fulfilled, (state:any, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state:any, action) => {
        state.isLoggedIn = false;
        state.status = "failed";
        
      });
  },
});

const { reducer } = authSlice;
export default reducer;