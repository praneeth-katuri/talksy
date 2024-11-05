const jwt = require("jsonwebtoken");

const verify = (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = verify;
