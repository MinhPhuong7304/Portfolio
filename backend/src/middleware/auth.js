import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  const { JWT_SECRET } = process.env;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: '✗ Unauthorized: Token missing'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET || 'fallback_secret');
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: '✗ Forbidden: Access denied'
      });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: '✗ Unauthorized: Invalid token'
    });
  }
};
export default verifyAdmin;
