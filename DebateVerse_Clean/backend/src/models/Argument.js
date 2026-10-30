import mongoose from 'mongoose';

const argumentSchema = new mongoose.Schema(
  {
    debateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Debate', required: true, index: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    side: { type: String, enum: ['support', 'oppose'], required: true },
    content: { type: String, required: true, trim: true, minlength: 10 },
    sourceLinks: [{ type: String, trim: true }],
    votesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

argumentSchema.index({ debateId: 1, side: 1 });

export const Argument = mongoose.model('Argument', argumentSchema);
