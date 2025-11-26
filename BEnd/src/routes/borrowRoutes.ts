import express from 'express';
import {
  createBorrow,
  getBorrowSummary,
  getAllBorrows,
} from '../controllers/borrowController';

const router = express.Router();

router.post('/', createBorrow);
router.get('/summary', getBorrowSummary);
router.get('/', getAllBorrows);

export default router;