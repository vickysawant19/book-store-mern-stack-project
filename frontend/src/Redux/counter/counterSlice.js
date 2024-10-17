import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.value += 1;
    },
    decrement: (state, action) => {
      state.value -= 1;
    },
  },
});
export const { increment, decrement } = counterSlice.actions;
export const selectCounter = (state) => state.counter;

export default counterSlice.reducer;
