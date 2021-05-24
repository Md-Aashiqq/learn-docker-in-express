const protect = (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    res.status(401).json({ status: "fails", msg: "unathrouzied" });
  }
  next();
};

module.exports = protect;
