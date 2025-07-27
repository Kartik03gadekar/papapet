import { createSlice } from "@reduxjs/toolkit";

const cartSlices = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const exists = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (exists) {
        exists.quantity = action.payload.quantity; // Update quantity
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlices.actions;
export default cartSlices.reducer;
