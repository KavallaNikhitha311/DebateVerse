import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Student } from '../models/Student.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'debateverse_super_secret_jwt_key_2026_educational', {
    expiresIn: '7d'
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, college, interests } = req.body;

    if (!name || !email || !password || !college) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const existingStudent = await Student.findOne({ email: email.toLowerCase().trim() });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: 'A student account with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const student = await Student.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      college: college.trim(),
      interests: Array.isArray(interests) ? interests : (interests ? interests.split(',').map(s => s.trim()) : []),
      totalPoints: 20 // Welcome bonus points
    });

    const token = generateToken(student._id);

    res.status(201).json({
      success: true,
      message: 'Student registered successfully!',
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        college: student.college,
        interests: student.interests,
        role: student.role,
        totalPoints: student.totalPoints
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const student = await Student.findOne({ email: email.toLowerCase().trim() });
    if (!student) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, student.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = generateToken(student._id);

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        college: student.college,
        interests: student.interests,
        role: student.role,
        totalPoints: student.totalPoints
      }
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully.' });
};

export const getMe = async (req, res, next) => {
  try {
    const student = await Student.findById(req.user._id).select('-passwordHash');
    res.status(200).json({ success: true, student });
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const { name, college, interests } = req.body;
    const updates = {};
    if (name) updates.name = name.trim();
    if (college) updates.college = college.trim();
    if (interests) updates.interests = Array.isArray(interests) ? interests : interests.split(',').map(s => s.trim());

    const student = await Student.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select('-passwordHash');
    res.status(200).json({ success: true, message: 'Profile updated successfully', student });
  } catch (error) {
    next(error);
  }
};