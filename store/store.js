import { configureStore } from "@reduxjs/toolkit";
import auth from "./Reducer/auth";
import others from "./Reducer/others";
import cart from "./slices/cartSlices";

export const store = configureStore({
  reducer: {
    auth,
    others,
    cart,
  },
  devTools: process.env.NODE_ENV !== "production",
});
