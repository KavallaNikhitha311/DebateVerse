import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    coverImage: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Book = mongoose.model('Book', bookSchema);
