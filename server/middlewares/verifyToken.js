import  jwt  from 'jsonwebtoken';
import User from '../models/UserModel.js'


export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

 if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password'); 

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    console.log('User authenticated:', req.user);
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
}