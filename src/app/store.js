import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "../features/order/orderSlice";
import userSlice from "../features/user/userSlice"; // תיקון כאן

const store = configureStore({
  reducer: {
    order: orderSlice,
    user: userSlice,
    count:orderSlice,
  },
});

export default store;
