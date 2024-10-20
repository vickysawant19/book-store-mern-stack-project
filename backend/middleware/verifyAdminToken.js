import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }
  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Invalid Credentials" });
    }
    req.user = decoded;
    next();
  });
  // Attach user information to the request object (optional)
};

export default verifyToken;
