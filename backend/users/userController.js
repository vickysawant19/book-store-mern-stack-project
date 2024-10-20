import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "./userModel.js";

const JWT_SECRET = process.env.JWT_SECRET;

const userAuth = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Find the user by username
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: "Invalid username or password" });
    // }

    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Create a payload for JWT token (you can include any data you need)
    const payload = {
      userId: user._id,
      username: user.username,
      role: user.role, // Assume you have user roles
    };

    // Sign the JWT token with a secret key and expiration time
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // Respond with the token
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error: User login failed" });
  }
};

export { userAuth };
