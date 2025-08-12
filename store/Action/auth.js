import axios from "@/Axios/axios.js";
import {
  fail,
  getConsultation,
  getNetworkFail,
  getNetworkRequest,
  getNetworkSuccess,
  getOffConsultation,
  isUser,
  isUserFail,
  isUserRequest,
  request,
  success,
  logout,
} from "../Reducer/auth";

import { persistor } from "../store";
import { PURGE } from "redux-persist";



// ✅ Check if persisted auth exists before hitting backend
export const checkUser = () => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    const { data } = await axios.get("/user/user");
    dispatch(isUser(data)); // sets isAuthenticated true only here
  } catch {
    dispatch(isUserFail()); // sets false here
  }
};




// ✅ Register new user
export const registerUser = (info) => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    await axios.post("/user/register", info);
    // You might want to auto-login here with dispatch(isUser(data));
  } catch {
    dispatch(isUserFail());
  }
};

// ✅ Login user
export const loginUser = (info) => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    const { data } = await axios.post("/user/login", info);
    dispatch(isUser(data));
  } catch {
    dispatch(isUserFail());
  }
};

// ✅ Logout user
export const logoutUser = () => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    await axios.post("/user/signout");

    dispatch(logout());        // clear Redux in-memory
   
    localStorage.removeItem("persist:auth"); // clear persisted state

    window.location.href = "/papapet/auth";
  } catch (error) {
    dispatch(isUserFail());
    console.error("Logout error:", error);
  }
};



// ✅ Book online consultation
export const bookConsultation = (id, info) => async (dispatch) => {
  dispatch(request());
  try {
    const { data } = await axios.post(`/user/book/consultation/${id}`, info);
    dispatch(success(data));
  } catch (error) {
    dispatch(fail(error?.response?.data || { message: "Booking failed" }));
  }
};

// ✅ Get all online consultations
export const getAllConsultation = () => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    const { data } = await axios.get("/user/get/consultation");
    dispatch(getConsultation(data));
  } catch {
    dispatch(isUserFail());
  }
};

// ✅ Get all offline consultations
export const getAllOfflineConsultation = () => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    const { data } = await axios.get("/user/get/offline/consultation");
    dispatch(getOffConsultation(data));
  } catch {
    dispatch(isUserFail());
  }
};

// ✅ Get doctor network by PIN
export const getNetwork = (pin) => async (dispatch) => {
  dispatch(getNetworkRequest());
  try {
    const { data } = await axios.get(`/network/get/doctors/${pin}`);
    dispatch(getNetworkSuccess(data));
  } catch {
    dispatch(getNetworkFail());
  }
};

// ✅ Book consultation via network
export const bookConsultationNetwork = (id, info) => async (dispatch) => {
  dispatch(request());
  try {
    const { data } = await axios.post(`/network/book/consultation/${id}`, info);
    dispatch(success(data));
  } catch (error) {
    dispatch(fail(error?.response?.data || { message: "Booking failed" }));
  }
};

// ✅ Update user details
export const updateDetails = (info) => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    const { data } = await axios.post("/user/profile/update", info);
    dispatch(isUser(data));
  } catch (error) {
    dispatch(isUserFail(error?.response?.data || { message: "Update failed" }));
  }
};
