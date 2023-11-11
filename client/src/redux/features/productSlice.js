import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axios";

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (products, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.post("/admins/products", products);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const allProducts = createAsyncThunk(
  "products/allProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get("/admins/products");

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.delete(`/admins/products/${id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  message: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createProduct
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      })
      // allProducts
      .addCase(allProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload;
      })
      .addCase(allProducts.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      })
      // deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id } = action.payload;

        if (id) {
          state.name = state.name.filter((cat) => cat.id !== id);
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default productSlice.reducer;
