import { Request, Response } from 'express';
import Borrow from '../models/Borrow';
import Book from '../models/Book';

export const createBorrow = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId, quantity, dueDate } = req.body;

    if (!bookId || !quantity || !dueDate) {
      res.status(400).json({ message: 'Please provide bookId, quantity, and dueDate' });
      return;
    }

    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    if (!book.available || book.copies === 0) {
      res.status(400).json({ message: 'Book is not available for borrowing' });
      return;
    }

    if (book.copies < quantity) {
      res.status(400).json({ 
        message: `Only ${book.copies} copies available. Cannot borrow ${quantity} copies.` 
      });
      return;
    }

    const selectedDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      res.status(400).json({ message: 'Due date cannot be in the past' });
      return;
    }

    const borrow = await Borrow.create({
      bookId,
      quantity,
      dueDate,
    });

    book.copies -= quantity;

    await book.save();

    res.status(201).json(borrow);
  } catch (error: any) {
    res.status(400).json({ message: 'Failed to create borrow', error: error.message });
  }
};

export const getBorrowSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const summary = await Borrow.aggregate([
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'book',
        },
      },
      {
        $unwind: '$book',
      },
      {
        $group: {
          _id: '$bookId',
          bookTitle: { $first: '$book.title' },
          isbn: { $first: '$book.isbn' },
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $project: {
          _id: 0,
          bookTitle: 1,
          isbn: 1,
          totalQuantity: 1,
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
    ]);

    res.status(200).json(summary);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to get borrow summary', error: error.message });
  }
};

export const getAllBorrows = async (req: Request, res: Response): Promise<void> => {
  try {
    const borrows = await Borrow.find()
      .populate('bookId', 'title author isbn')
      .sort({ createdAt: -1 });
    
    res.status(200).json(borrows);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};