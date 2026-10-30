import jwt from 'jsonwebtoken';
import { Student } from '../models/Student.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authorization token required.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'debateverse_super_secret_jwt_key_2026_educational');
    
    const student = await Student.findById(decoded.id).select('-passwordHash');
    if (!student) {
      return res.status(401).json({ success: false, message: 'Invalid token: student account not found.' });
    }

    req.user = student;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'debateverse_super_secret_jwt_key_2026_educational');
      const student = await Student.findById(decoded.id).select('-passwordHash');
      if (student) req.user = student;
    }
    next();
  } catch (err) {
    next();
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied: Admin privileges required.' });
  }
  next();
};