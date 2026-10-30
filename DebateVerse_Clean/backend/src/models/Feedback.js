import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true, minlength: 10 },
    createdAt: { type: Date, default: Date.now }
  }
);

export const Feedback = mongoose.model('Feedback', feedbackSchema);
