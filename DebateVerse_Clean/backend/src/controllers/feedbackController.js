import { Feedback } from '../models/Feedback.js';

export const submitFeedback = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All feedback fields are required.' });
    }
    const feedback = await Feedback.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim()
    });
    res.status(201).json({
      success: true,
      message: 'Thank you for your valuable feedback! Your message has been received.',
      feedbackId: feedback._id
    });
  } catch (error) {
    next(error);
  }
};

export const getAllFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: feedback.length, feedback });
  } catch (error) {
    next(error);
  }
};