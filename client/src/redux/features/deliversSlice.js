import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axios";

export const newOrders = createAsyncThunk(
  "delivers/newOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get("/delivers");

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const confirmOrders = createAsyncThunk(
  "delivers/confirmOrders",
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
      //  newOrders
      .addCase(newOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(newOrders.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      })
      //  confirmOrders
      .addCase(confirmOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(confirmOrders.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default deliversSlice.reducer;
