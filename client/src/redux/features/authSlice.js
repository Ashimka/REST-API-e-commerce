import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axios";

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  const { data } = await axiosPrivate.get("/auth/refresh");
  console.log(data);
  return data;
});

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { email, accessToken } = action.payload;

      state.user = email;
      state.token = accessToken;
    },

    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
    });
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;
