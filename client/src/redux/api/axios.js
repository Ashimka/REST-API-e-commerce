import axios from "axios";

import { logOut, refreshToken } from "../features/authSlice";
const BASE_URL = "/api";

let store;

export const injectStore = (_store) => {
  store = _store;
};

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${
    store.getState().persistedReducer.auth.token
  }`;

  return config;
});

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;

    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;

      const newAccessToken = await store.dispatch(refreshToken());
      if (!newAccessToken) {
        await store.dispatch(logOut());
      }

      prevRequest.headers.Authorization = `Bearer ${newAccessToken.payload}`;

      return axiosPrivate(prevRequest);
    }
    return Promise.reject(error);
  }
);
