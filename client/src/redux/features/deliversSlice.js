import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axios";

export const allOrders = createAsyncThunk(
  "delivers/allOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get("/delivers");

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
      //  allOrders
      .addCase(allOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(allOrders.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default deliversSlice.reducer;
