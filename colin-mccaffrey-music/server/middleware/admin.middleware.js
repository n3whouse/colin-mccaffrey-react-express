const adminCheck = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).send({ message: "You are not an admin" });
  }
};

module.exports = adminCheck;
