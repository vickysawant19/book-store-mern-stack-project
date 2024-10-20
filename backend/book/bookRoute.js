import express from "express";
import bookModel from "./bookModel.js";
import {
  addMultipleBooks,
  createNewBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "./bookController.js";
import verifyToken from "../middleware/verifyAdminToken.js";

const router = express.Router();

// Get all books
router
  .get("/", getAllBooks)
  .get("/:id", getBookById)
  .post("/add-multiple-books", addMultipleBooks)
  .post("/create-book", verifyToken, createNewBook)
  .put("/update/:id", updateBook)
  .delete("/remove/:id", deleteBook);

export default router;
