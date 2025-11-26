import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController';

const router = express.Router();

router.route('/')
  .get(getAllBooks)
  .post(createBook);

router.route('/:id')
  .get(getBookById)
  .put(updateBook)
  .delete(deleteBook);

export default router;