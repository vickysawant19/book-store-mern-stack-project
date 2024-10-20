import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
} from "./orderControllers.js";

const router = express.Router();

router
  .get("/", getAllOrders)
  .get("/email/:email", getOrdersByEmail)
  .post("/create-order", createOrder);

export default router;
