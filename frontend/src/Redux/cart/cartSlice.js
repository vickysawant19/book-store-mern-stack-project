import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItems: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let cartItem = action.payload;
      let found = state.cartItems.find((item) => item._id === cartItem._id);
      if (!found) {
        state.cartItems.push(action.payload);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added to cart",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      let total = state.cartItems.reduce(
        (sum, item) => (sum += parseFloat(item.newPrice)),
        0
      );
      state.totalPrice = total;
    },
    removeFromCart: (state, action) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Card item has been removed!",
        showConfirmButton: false,
        timer: 1500,
      });

      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      let total = state.cartItems.reduce(
        (sum, item) => (sum += parseFloat(item.newPrice)),
        0
      );
      state.totalPrice = total;
    },

    clearCart: (state, action) => {
      state.cartItems = [];
    },
  },
});

export const selectCart = (state) => state.cart.cartItems;
export const selectTotalPrice = (state) => state.cart.totalPrice;
export default cartSlice.reducer;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
