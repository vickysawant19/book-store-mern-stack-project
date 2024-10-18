import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    trending: { type: Boolean, default: false },
    coverImage: { type: String, required: true },
    oldPrice: { type: Number, required: true },
    newPrice: { type: Number, required: true },
    createdAt: { type: Date, required: false },
  },
  { timestamps: true }
);

const bookModel = mongoose.model("Book", bookSchema); //Book make it plurel
export default bookModel;
