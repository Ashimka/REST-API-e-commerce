import axios from "axios";

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
  config.headers.Authorization = `Bearer ${store.getState().auth.token}`;
  return config;
});
