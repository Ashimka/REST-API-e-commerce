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

export const userOrders = createAsyncThunk(
  "order/userOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get("/users/orderlist");

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const orderDetails = createAsyncThunk(
  "order/orderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get(`/users/orderdetails/${id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: false,
  orderList: [],
  detailsOrder: [],
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
        state.orderList.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      })
      // userOrder
      .addCase(userOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload;
      })
      .addCase(userOrders.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      })
      // orderDetails
      .addCase(orderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detailsOrder = action.payload;
      })
      .addCase(orderDetails.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default orderSlice.reducer;
