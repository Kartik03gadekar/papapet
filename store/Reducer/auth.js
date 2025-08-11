import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false, // ✅ fixed spelling
  loading: false,
  user: null,
  consult: null,
  ofconsult: null,
  network: null,
  message: null,
  error: null,
};

export const auth = createSlice({
  name: "Mediensure",
  initialState,
  reducers: {
    isUserRequest: (state) => {
      state.loading = true;
    },
    isUser: (state, action) => {
      state.isAuthenticated = true; // ✅ fixed spelling
      state.user = action.payload;
      state.loading = false;
    },
    isUserFail: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    getConsultation: (state, action) => {
      state.consult = action.payload.consult;
    },
    getOffConsultation: (state, action) => {
      state.ofconsult = action.payload.consult;
    },
    getNetworkRequest: (state) => {
      state.loading = true;
    },
    getNetworkSuccess: (state, action) => {
      state.loading = false;
      state.network = action.payload.network;
    },
    getNetworkFail: (state) => {
      state.loading = false;
    },
    request: (state) => {
      state.loading = true;
    },
    success: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    fail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    removeMsg: (state) => {
      state.message = null;
    },
    removeErr: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false; // ✅ now matches login
      state.user = null;
      state.loading = false;
      state.consult = null;
      state.ofconsult = null;
      state.network = null;
    },
  },
});

export const {
  fail,
  success,
  request,
  isUser,
  isUserFail,
  isUserRequest,
  getConsultation,
  getNetworkFail,
  getNetworkRequest,
  getNetworkSuccess,
  removeErr,
  removeMsg,
  getOffConsultation,
  logout,
} = auth.actions;

export default auth.reducer;
