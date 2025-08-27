const userOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: req.user });
  }

  if (req.user.role !== "user") {
    return res
      .status(403)
      .json({ message: "Not authorized, only users allowed" });
  }

  next();
};

module.exports = userOnly;
