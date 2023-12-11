import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  totalPrice: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")).reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0)
    : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      findItem
        ? findItem.count++
        : state.items.push({ ...action.payload, count: 1 });

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem("cartItems");
    },
    removeProduct(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count--;

        if (findItem.count === 0) {
          const product = state.items.filter(
            (obj) => obj.id !== action.payload.id
          );

          state.items = product;
          state.totalPrice = state.items.reduce((sum, obj) => {
            return obj.price * obj.count + sum;
          }, 0);
          return localStorage.setItem("cartItems", JSON.stringify(product));
        }
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});

export const { addProduct, clearCart, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
