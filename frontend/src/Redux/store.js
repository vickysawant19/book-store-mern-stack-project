import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Redux/counter/counterSlice";
import cartReducer from "../Redux/cart/cartSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
  },
});

export default store;
