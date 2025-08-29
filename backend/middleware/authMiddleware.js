const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user info to request
    req.user = decoded;

    next(); // ✅ go to next controller
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
