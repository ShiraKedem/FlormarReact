// orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  basket: [],
  orders: {
    orderDate: "",
    dueDate: "",
    address: "",
    isCameOut: false,
    userId: "",
  },
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToOrders: (state, action) => {
      state.orders.push({ ...action.payload });
      state.basket = [];
    },

    EmptyBasket: (state, action) => {
      state.basket = [];
      state.count = 0;
    },
    addToBasket: (state, action) => {
      const existingProductIndex = state.basket.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingProductIndex != -1) {
        state.count++;
        state.basket[existingProductIndex].countProduct += 1;
      } else {
        state.count++;
        state.basket.push({ ...action.payload, countProduct: 1 });
      }
      localStorage.setItem("count", JSON.stringify(state.count));
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    removeFromBasket: (state, action) => {
      const index = state.basket.findIndex(
        (item) => item._id === action.payload
      );

      if (index !== -1) {
        if (state.basket[index].countProduct > 1) {
          state.basket[index].countProduct -= 1;
        } else {
          state.basket.splice(index, 1);
        }
      }
    },
    update: (state, action) => {
      state.basket = state.basket.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
  },
});
export const {
  addToBasket,
  removeFromBasket,
  update,
  setBasket,
  setCount,
  EmptyBasket,
} = orderSlice.actions;
export default orderSlice.reducer;
