import bookModel from "./bookModel.js";

const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

const createNewBook = async (req, res) => {
  try {
    const { title } = req.body;
    const found = await bookModel.findOne({ title });
    if (found) {
      return res.status(300).json({ message: "book Already Exits!" });
    }
    const book = new bookModel(req.body);
    const newBook = await book.save();
    res.status(200).send({ message: "Book added succesfully", Book: newBook });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Book Not Aadded ", error: error.message });
  }
};

const addMultipleBooks = async (req, res) => {
  try {
    const arrayOfBooks = req.body;
    if (
      !arrayOfBooks ||
      (Array.isArray(arrayOfBooks) && arrayOfBooks.length === 0) ||
      (typeof arrayOfBooks === "object" &&
        Object.keys(arrayOfBooks).length === 0)
    ) {
      return res
        .status(400)
        .json({ message: "Failed to add: body is null or empty" });
    }
    const promiseForArray = arrayOfBooks.map(async (item) => {
      let { title } = item;
      let found = await bookModel.findOne({ title });
      if (found) {
        return { message: "Book Already exits", title };
      }
      const newBook = new bookModel(item);
      const savedBook = await newBook.save();
      return {
        message: "Book saved successfully",
        book: savedBook,
      };
    });
    let result = await Promise.all(promiseForArray);
    return res.status(200).send(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add multiple books",
      error: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    res.send("");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    res.send(true);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllBooks, createNewBook, addMultipleBooks, deleteBook, updateBook };
