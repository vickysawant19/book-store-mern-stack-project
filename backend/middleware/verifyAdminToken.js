import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  try {
    if (!JWT_SECRET) {
      return res
        .status(500)
        .json({ message: "Internal server error. Missing JWT secret." });
    }

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(403)
        .json({ message: "Access denied. No token provided." });
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid credentials." });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default verifyToken;
