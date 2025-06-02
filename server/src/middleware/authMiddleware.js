const jwt = require("jsonwebtoken");
const config = require("../config");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      const error = new Error("Unauthorized: Missing or invalid token format");
      error.status = 401;
      throw error;
    }

    const token = authHeader.replace("Bearer ", "").trim();

    // Verify token
    const decoded = jwt.verify(token, config.jwt.accessSecret);

    // Attach user ID decoded from accessToken to request
    req.userId = decoded.id;
    next();
  } catch (err) {
    // Handle specific JWT errors
    if (err.name === "JsonWebTokenError") {
      err.message = "Unauthorized: Invalid token";
      err.status = 401;
    } else if (err.name === "TokenExpiredError") {
      err.message = "Unauthorized: Token expired";
      err.status = 401;
    }
    next(err); // Pass to Express error handler
  }
};

module.exports = verifyToken;
