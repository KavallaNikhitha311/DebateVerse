import { Book } from '../models/Book.js';

export const getAllBooks = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    const books = await Book.find(filter).sort({ title: 1 });
    res.status(200).json({ success: true, count: books.length, books });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.status(200).json({ success: true, book });
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const { title, author, category, description, publicationYear, coverImage } = req.body;
    if (!title || !author || !category || !description || !publicationYear) {
      return res.status(400).json({ success: false, message: 'Please provide title, author, category, description, and publication year.' });
    }
    const book = await Book.create({
      title: title.trim(),
      author: author.trim(),
      category: category.trim(),
      description: description.trim(),
      publicationYear: Number(publicationYear),
      coverImage: coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
    });
    res.status(201).json({ success: true, message: 'Resource book added successfully!', book });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.status(200).json({ success: true, message: 'Resource book updated successfully!', book });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.status(200).json({ success: true, message: 'Resource book deleted successfully!' });
  } catch (error) {
    next(error);
  }
};