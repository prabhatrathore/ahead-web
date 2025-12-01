
module.exports = (req, res, next) => {
  // console.log(req.user, "www")
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (req?.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' })
  }
  next();
};
