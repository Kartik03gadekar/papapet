import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  subtotal: 0,
  discount: 0,
  total: 0,
  appliedCoupon: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exists = state.cartItems.find(item => item._id === action.payload._id);
      if (exists) {
        exists.quantity = action.payload.quantity; // Update quantity
      } else {
        state.cartItems.push(action.payload);
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.subtotal = 0;
      state.discount = 0;
      state.total = 0;
      state.appliedCoupon = null;
    },
    applyCoupon: (state, action) => {
      const { code, discount } = action.payload;
      state.appliedCoupon = code;
      state.discount = discount;
      cartSlice.caseReducers.calculateTotals(state);
    },
    calculateTotals: (state) => {
      state.subtotal = state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      state.total = state.subtotal - state.discount;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, applyCoupon } = cartSlice.actions;
export default cartSlice.reducer;