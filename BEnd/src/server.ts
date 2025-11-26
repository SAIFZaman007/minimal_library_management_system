import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import bookRoutes from './routes/bookRoutes';
import borrowRoutes from './routes/borrowRoutes';

dotenv.config();

const app: Application = express();

connectDB();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'MLMS API is running',
    version: '1.0.0',
    endpoints: {
      books: '/api/books',
      borrows: '/api/borrows'
    }
  });
});

app.use('/api/books', bookRoutes);
app.use('/api/borrows', borrowRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`CORS enabled for: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
});