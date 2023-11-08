import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axios";

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (name, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.post("/admins/category", name);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const allCategory = createAsyncThunk(
  "category/allCategory",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get("/admins/category");

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.delete(`/admins/category/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (name, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.patch(
        `/admins/category/${name.id}`,
        name
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const oneCategory = createAsyncThunk(
  "category/oneCategory",
  async (cat, thunkAPI) => {
    try {
      const { data } = await axiosPrivate.get(`/admins/category/${cat}`);

      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  name: [],
  message: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  createCategory
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      })
      // allCategory
      .addCase(allCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload;
      })
      .addCase(allCategory.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      })
      // deleteCategory
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id } = action.payload;

        if (id) {
          state.name = state.name.filter((cat) => cat.id !== id);
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      })
      // oneCategory
      .addCase(oneCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(oneCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload;
      })
      .addCase(oneCategory.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      })
      // updateCategory
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = state.name.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default categorySlice.reducer;
