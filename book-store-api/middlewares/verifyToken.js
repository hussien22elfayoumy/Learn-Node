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

export const authorizeUserAndAdmin = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.userDecoded.id !== req.params.id && !req.userDecoded.isAdmin)
      return res.status(403).json({ message: 'Your are not allowed' }); // 403:forbidden

    next();
  });
};

export const authorizeAdmin = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.userDecoded.isAdmin)
      return res
        .status(403)
        .json({ message: 'Your are not allowed, only admins' });

    next();
  });
};
