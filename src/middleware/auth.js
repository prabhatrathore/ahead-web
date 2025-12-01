const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: 'Authorization header missing' })
    }
    const parts = header.split(' ');
    
    const token = parts.length === 2 ? parts[1] : null;
    // console.log(parts,"ssssssssss")
    
    if (!token) {
      return res.status(401).json({ message: 'Token missing' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    return next();
  } catch (err) {
    return res.status(500).json({ message: err?.message })
  }
};
