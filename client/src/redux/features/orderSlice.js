import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axios";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (newOrder, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.post("/users/order", newOrder);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const listUserOrders = createAsyncThunk(
  "order/listUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = axiosPrivate.get("/users/orderlist");

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: false,
  orderList: [],
  isError: false,
  message: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  newOrder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default orderSlice.reducer;
