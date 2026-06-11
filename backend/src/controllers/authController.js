import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { username, password } = req.body;
  const { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET } = process.env;

  try {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create JWT Token
      const token = jwt.sign(
        { role: 'admin', username },
        JWT_SECRET || 'fallback_secret',
        { expiresIn: '24h' }
      );
      
      return res.status(200).json({
        success: true,
        message: '✓ Login successful',
        token
      });
    } else {
      return res.status(401).json({
        success: false,
        message: '✗ Invalid username or password'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: '✗ Server error during login',
      error: error.message
    });
  }
};
