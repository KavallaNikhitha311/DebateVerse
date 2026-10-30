import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
  {
    debateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Debate', required: true, unique: true },
    supportVotes: { type: Number, default: 0 },
    opposeVotes: { type: Number, default: 0 },
    winner: { type: String, enum: ['support', 'oppose', 'tie'], default: 'tie' },
    completedAt: { type: Date, default: Date.now }
  }
);

export const Result = mongoose.model('Result', resultSchema);
