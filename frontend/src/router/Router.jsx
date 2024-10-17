import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/Book/CartPage";
import Checkout from "../pages/Book/Checkout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/checkout" element={<Checkout />}></Route>
    </Route>
  )
);

const Router = ({ childrean }) => {
  return <RouterProvider router={router}>{childrean}</RouterProvider>;
};
export default Router;
