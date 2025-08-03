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

export const checkUser = () => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    const { data } = await axios.get("/user/user");
    console.log(data);

    dispatch(isUser(data));
  } catch (error) {
    dispatch(isUserFail());
  }
};
export const registerUser = (info) => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    console.log(info);
    const { data } = await axios.post("/user/register", info);
    console.log(data);
  } catch (error) {
    dispatch(isUserFail());
  }
};
export const loginUser = (info) => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    const { data } = await axios.post("/user/login", info);
    console.log(data);

    dispatch(isUser(data));
  } catch (error) {
    dispatch(isUserFail());
  }
};
export const logoutUser = () => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    await axios.post("/user/signout", { withCredentials: true });

    dispatch(logout()); // 👈 clears auth state
    // await persistor.purge(); // 👈 clears localStorage

    window.location.href = "/papapet/auth";
  } catch (error) {
    dispatch(isUserFail());
    console.error("Logout error:", error);
  }
};
// BOOK CONSULTATION

export const bookConsultation = (id, info) => async (dispatch) => {
  dispatch(request());
  try {
    const { data } = await axios.post(`/user/book/consultation/${id}`, info);
    dispatch(success(data));
  } catch (error) {
    dispatch(fail(error.response.data));
  }
};

export const getAllConsultation = () => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    const { data } = await axios.get("/user/get/consultation");
    dispatch(getConsultation(data));
  } catch (error) {
    dispatch(isUserFail());
  }
};
export const getAllOfflineConsultation = () => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    const { data } = await axios.get("/user/get/offline/consultation");
    dispatch(getOffConsultation(data));
  } catch (error) {
    dispatch(isUserFail());
  }
};
export const getNetwork = (pin) => async (dispatch) => {
  dispatch(getNetworkRequest());
  try {
    const { data } = await axios.get(`/network/get/doctors/${pin}`);
    dispatch(getNetworkSuccess(data));
  } catch (error) {
    dispatch(getNetworkFail());
  }
};

export const bookConsultationNetwork = (id, info) => async (dispatch) => {
  dispatch(request());

  try {
    const { data } = await axios.post(`/network/book/consultation/${id}`, info);
    dispatch(success(data));
  } catch (error) {
    dispatch(fail(error.response.data));
  }
};

export const updateDetails = (info) => async (dispatch) => {
  dispatch(isUserRequest());
  console.log(info);
  try {
    const { data } = await axios.post("/user/profile/update", info);
    dispatch(isUser(data));
  } catch (error) {
    dispatch(isUserFail(error.response.data));
  }
};
