import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema(
  {
    debateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Debate', required: true, index: true },
    argumentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Argument', required: true },
    voterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    createdAt: { type: Date, default: Date.now }
  }
);

// Enforce one vote per student per debate!
voteSchema.index({ debateId: 1, voterId: 1 }, { unique: true });

export const Vote = mongoose.model('Vote', voteSchema);
