import mongoose from "mongoose";

import orderModel from "../orders/orderModel.js";

import express from "express";
import bookModel from "../book/bookModel.js";
import verifyToken from "../middleware/verifyAdminToken.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    //count numbers of orders
    const totalOrders = await orderModel.countDocuments();

    //calculate sum of all totalPrice form orders
    const totalSales = await orderModel.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    const trendingBooksCount = await bookModel.aggregate([
      { $match: { trending: true } },
      { $count: "trendingBooksCount" }, //return numbers of trending book count
    ]);

    const trendingBooks =
      trendingBooksCount.length > 0
        ? trendingBooksCount[0].trendingBooksCount
        : 0;

    //count total Books
    const totalBooks = await bookModel.countDocuments();

    const monthlySales = await orderModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalSales: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json({
      totalOrders,
      totalSales: totalSales[0].totalSales || 0,
      trendingBooks,
      totalBooks,
      monthlySales,
    });
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "server errror : Calculating stats" });
  }
});

export default router;
