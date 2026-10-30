import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    college: { type: String, required: true, trim: true },
    interests: [{ type: String }],
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    totalPoints: { type: Number, default: 10 },
  },
  { timestamps: true }
);

export const Student = mongoose.model('Student', studentSchema);
