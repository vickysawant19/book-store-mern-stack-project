import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Redux/cart/cartSlice";
import { bookApi } from "./books/bookApi";
import { orderApi } from "./order/orderApi";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware, orderApi.middleware),
});

export default store;
