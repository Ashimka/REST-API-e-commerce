import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axios";

export const getOrders = createAsyncThunk(
  "delivers/getOrders",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get(`/delivers?order=${query}`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: false,
  orders: [],
  isError: false,
  message: "",
};

export const deliversSlice = createSlice({
  name: "delivers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  getOrders
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default deliversSlice.reducer;
