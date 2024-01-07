import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axios";

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  const { data } = await axiosPrivate.get("/auth/refresh");

  return data;
});

const initialState = {
  user: null,
  token: null,
  isAuth: false,
  isActivated: null,
  roles: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { phoneNumber, accessToken, isActivated, roles } = action.payload;

      state.user = phoneNumber;
      state.token = accessToken;
      state.isActivated = isActivated;
      state.isAuth = true;
      state.roles = Object.keys(roles);
    },

    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      state.isActivated = null;
      state.roles = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
      state.isAuth = true;
    });
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;
