import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  side: { type: String, enum: ['support', 'oppose'], required: true },
  joinedAt: { type: Date, default: Date.now }
}, { _id: false });

const debateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    statement: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Education & Schools',
        'Technology & AI',
        'Society & Life',
        'Environment & Nature',
        'Culture & Gaming',
        'General'
      ],
      default: 'General'
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    participants: [participantSchema],
    status: { type: String, enum: ['active', 'completed'], default: 'active' },
    format: { type: String, default: 'timed' },
    startTime: { type: Date, default: Date.now },
    deadline: { type: Date, required: true },
  },
  { timestamps: true }
);

debateSchema.index({ status: 1, category: 1 });
debateSchema.index({ deadline: 1 });

export const Debate = mongoose.model('Debate', debateSchema);
