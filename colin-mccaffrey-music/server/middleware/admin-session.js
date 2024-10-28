const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const adminSession = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    } 
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Access Denied: Admins Only" });
    }

    req.user = user;
    next();
    } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


module.exports = adminSession;