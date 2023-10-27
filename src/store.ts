import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";

const reducer = {
  auth: authReducer,
  message: messageReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export default store;