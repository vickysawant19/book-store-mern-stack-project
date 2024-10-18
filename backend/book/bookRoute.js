import express from "express";
import bookModel from "./bookModel.js";
import {
  addMultipleBooks,
  createNewBook,
  deleteBook,
  getAllBooks,
  updateBook,
} from "./bookController.js";

const router = express.Router();

// Get all books
router
  .get("/", getAllBooks)
  .post("/add-multiple-books", addMultipleBooks)
  .post("/create-book", createNewBook)
  .put("/update-book", updateBook)
  .delete("/remove-book", deleteBook);

export default router;
