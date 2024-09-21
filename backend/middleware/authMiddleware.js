const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization header is required",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.userId = decoded.userId;
    next();
  
  } catch(error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}

module.exports = authMiddleware;
