const jwt = require("jsonwebtoken");
const User = require("../models/User");

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.user = user; // Attach user to the request
    next();
  } catch (error) {
    console.error("Admin auth error:", error.message);
    res.status(401).json({ message: "Unauthorized access." });
  }
};

module.exports = { adminAuth };
