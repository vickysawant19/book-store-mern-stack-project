import express from "express";
import mongoose from "mongoose";

import "dotenv/config";
import cors from "cors";
//import routes
import bookRoutes from "./book/bookRoute.js";
import orderRoutes from "./orders/orderRoute.js";
import userRoute from "./users/userRoute.js";
import adminStats from "./stats/admin.stats.js";

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://book-store-mern-stack-project.vercel.app/",
      "https://book-store-mern-stack-project.vercel.app",
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Book Store Mern Project" });
});

//routes
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoute);
app.use("/api/admin", adminStats);

//mangoDb init
async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
}

run()
  .then(() => {
    //server listen
    app.listen(port, () => {
      console.log("server running on port " + port);
    });
  })
  .catch((err) => console.log(err.message));
