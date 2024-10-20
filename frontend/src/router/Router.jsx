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
import SingleBook from "../pages/Book/SingleBook";
import AuthProvider from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Orders from "../pages/Book/Orders";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public routes */}
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="books/:id" element={<SingleBook />} />
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Route>
  )
);

const Router = ({ childrean }) => {
  return <RouterProvider router={router}>{childrean}</RouterProvider>;
};
export default Router;
