import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) return res.status(401).json({ message: 'No Token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userDecoded = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};
