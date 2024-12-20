const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Thêm thông tin người dùng vào req
    next();
  } catch (err) {
    res.status(403).json({ message: 'Forbidden' });
  }
};

module.exports = authMiddleware;
