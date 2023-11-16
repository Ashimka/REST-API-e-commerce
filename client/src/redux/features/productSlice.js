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

export const oneProduct = createAsyncThunk(
  "products/oneProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get(`/admins/products/${id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.patch(
        `/admins/products/${product.id}`,
        product
      );

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
        state.products.products.push(action.payload);
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
        state.products = action.payload;
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
          state.products = state.products.filter((cat) => cat.id !== id);
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      })
      // oneProduct
      .addCase(oneProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(oneProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(oneProduct.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      })
      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default productSlice.reducer;
