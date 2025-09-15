import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/Axios/axios";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/user/getCart"); // ✅ backend pulls user from token
      return data.cart;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to fetch cart"
      );
    }
  }
);

const initialState = {
  cartItems: [],
  subtotal: 0,
  discount: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  appliedCoupon: null,
  shippingAddress: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
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
      cartSlice.caseReducers.calculateTotals(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.subtotal = 0;
      state.discount = 0;
      state.tax = 0;
      state.shipping = 0;
      state.total = 0;
      state.appliedCoupon = null;
    },
    applyCoupon: (state, action) => {
      if (!action.payload) {
        state.appliedCoupon = null;
        state.discount = 0;
      } else {
        const { code, discount, details } = action.payload;
        state.appliedCoupon = { code, discount, details };
        state.discount = discount || 0;
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    setSelectedAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    calculateTotals: (state) => {
      const subtotal = state.cartItems.reduce((sum, item) => {
        const price = Number(item.price) || 0;
        const qty = Number(item.quantity) || 1;
        return sum + price * qty;
      }, 0);
      const shipping = subtotal > 1000 || subtotal == 200 ? 0 : 99;
      const discountAmount = state.discount || 0;

      state.subtotal = subtotal;
      state.shipping = shipping;
      state.total = subtotal + shipping - discountAmount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload || [];

        // recalc totals after fetching
        cartSlice.caseReducers.calculateTotals(state);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  applyCoupon,
  setSelectedAddress,
  calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
