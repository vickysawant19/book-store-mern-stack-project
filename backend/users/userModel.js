import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async (next) => {
  console.log(this);
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
