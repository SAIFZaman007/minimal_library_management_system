import { Request, Response } from 'express';
import Book from '../models/Book';

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    
    res.status(200).json(book);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, author, genre, isbn, description, copies } = req.body;

    if (!title || !author || !genre || !isbn) {
      res.status(400).json({ message: 'Please provide all required fields' });
      return;
    }

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      res.status(400).json({ message: 'Book with this ISBN already exists' });
      return;
    }

    const book = await Book.create({
      title,
      author,
      genre,
      isbn,
      description,
      copies: copies || 1,
    });

    res.status(201).json(book);
  } catch (error: any) {
    res.status(400).json({ message: 'Failed to create book', error: error.message });
  }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    const { title, author, genre, isbn, description, copies } = req.body;

    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (genre !== undefined) book.genre = genre;
    if (isbn !== undefined) book.isbn = isbn;
    if (description !== undefined) book.description = description;
    if (copies !== undefined) book.copies = copies;

    const updatedBook = await book.save();
    res.status(200).json(updatedBook);
  } catch (error: any) {
    res.status(400).json({ message: 'Failed to update book', error: error.message });
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to delete book', error: error.message });
  }
};